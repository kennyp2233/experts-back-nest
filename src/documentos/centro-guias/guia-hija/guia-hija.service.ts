// src/documentos/centro-guias/guia-hija/guia-hija.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GuiaHijaService {
    constructor(private prisma: PrismaService) { }

    /**
     * Formatea el número de la guía hija en formato "AAAANNNN".
     */
    private formatearNumeroGuiaHija(anio: number, secuencial: number): string {
        return `${anio}${secuencial.toString().padStart(4, '0')}`;
    }

    async getLastGuiaHijaByYear(anio: number) {
        return this.prisma.guiaHija.findFirst({
            where: { anio },
            orderBy: { secuencial: 'desc' },
        });
    }

    async findByFincaAndGuiaMadre(id_finca: number, id_guia_madre: number) {
        return this.prisma.guiaHija.findFirst({
            where: { id_finca, id_guia_madre },
        });
    }

    async obtenerGuiaHijaPorFincaYGuiaMadre(id_finca: number, id_guia_madre: number) {
        const guiaHija = await this.findByFincaAndGuiaMadre(id_finca, id_guia_madre);
        return guiaHija || null;
    }

    async asignarGuiaHija(id_documento_coordinacion: number, id_finca: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Obtener documento coordinación
            const docCoordinacion = await prisma.documentoCoordinacion.findUnique({
                where: { id: id_documento_coordinacion },
            });

            if (!docCoordinacion) {
                throw new Error('Documento de coordinación no encontrado');
            }

            const id_guia_madre = docCoordinacion.id_guia_madre;

            // Verificar existencia previa
            const guiaHijaExistente = await this.findByFincaAndGuiaMadre(id_finca, id_guia_madre);

            if (guiaHijaExistente) {
                if (guiaHijaExistente.id_documento_coordinacion !== id_documento_coordinacion) {
                    await prisma.guiaHija.update({
                        where: { id: guiaHijaExistente.id },
                        data: { id_documento_coordinacion },
                    });
                }
                return guiaHijaExistente;
            }

            // src/documentos/centro-guias/guia-hija/guia-hija.service.ts (continuación)
            // Crear nueva guía hija
            const anioActual = new Date().getFullYear();
            const ultimaGuia = await this.getLastGuiaHijaByYear(anioActual);
            const nuevoSecuencial = ultimaGuia ? ultimaGuia.secuencial + 1 : 1;
            const numeroGuiaHija = this.formatearNumeroGuiaHija(anioActual, nuevoSecuencial);

            const nuevaGuiaHija = await prisma.guiaHija.create({
                data: {
                    id_documento_coordinacion,
                    id_guia_madre,
                    id_finca,
                    numero_guia_hija: numeroGuiaHija,
                    anio: anioActual,
                    secuencial: nuevoSecuencial,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            return nuevaGuiaHija;
        });
    }

    async getGuiasHijas(page: number = 1, pageSize: number = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const [rows, count] = await Promise.all([
            this.prisma.guiaHija.findMany({
                skip: offset,
                take: limit,
                include: {
                    finca: true,
                    guia_madre: true,
                    documento_coordinacion: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.guiaHija.count(),
        ]);

        return {
            data: rows,
            total: count,
        };
    }

    async getGuiaHija(id: number) {
        const guiaHija = await this.prisma.guiaHija.findUnique({
            where: { id },
            include: {
                finca: true,
                guia_madre: true,
                documento_coordinacion: true,
            },
        });

        if (!guiaHija) {
            throw new NotFoundException(`Guía hija con ID ${id} no encontrada`);
        }

        return guiaHija;
    }

    async getGuiasHijasPorGuiaMadre(id_guia_madre: number) {
        return this.prisma.guiaHija.findMany({
            where: { id_guia_madre },
            include: { finca: true },
            orderBy: { createdAt: 'asc' },
        });
    }

    async getGuiasHijasPorFinca(id_finca: number) {
        return this.prisma.guiaHija.findMany({
            where: { id_finca },
            include: {
                guia_madre: true,
                documento_coordinacion: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async prevalidarAsignacionGuiasHijas(asignaciones: { id_documento_coordinacion: number; id_finca: number }[]) {
        const anioActual = new Date().getFullYear();
        const ultimaGuia = await this.getLastGuiaHijaByYear(anioActual);
        const secuencialActual = ultimaGuia ? ultimaGuia.secuencial : 0;
        let proximoSecuencial = secuencialActual + 1;

        const asignacionesExistentes = [];
        const nuevasAsignaciones = [];

        for (const asignacion of asignaciones) {
            // Obtener documento coordinación
            const docCoordinacion = await this.prisma.documentoCoordinacion.findUnique({
                where: { id: asignacion.id_documento_coordinacion },
            });

            if (!docCoordinacion) {
                throw new Error(`Documento de coordinación ${asignacion.id_documento_coordinacion} no encontrado`);
            }

            const id_guia_madre = docCoordinacion.id_guia_madre;

            // Verificar existencia previa
            const guiaExistente = await this.findByFincaAndGuiaMadre(asignacion.id_finca, id_guia_madre);

            if (guiaExistente) {
                asignacionesExistentes.push({
                    ...asignacion,
                    id_guia_madre,
                    guia_hija: guiaExistente,
                    accion: 'EXISTENTE',
                });
            } else {
                const numeroGuiaHija = this.formatearNumeroGuiaHija(anioActual, proximoSecuencial);
                const finca = await this.prisma.finca.findUnique({
                    where: { id_finca: asignacion.id_finca },
                });

                nuevasAsignaciones.push({
                    ...asignacion,
                    id_guia_madre,
                    numero_guia_hija: numeroGuiaHija,
                    secuencial: proximoSecuencial,
                    anio: anioActual,
                    finca: finca || null,
                    accion: 'NUEVA',
                });

                proximoSecuencial++;
            }
        }

        return {
            asignacionesExistentes,
            nuevasAsignaciones,
            secuencialActual,
            proximo: proximoSecuencial - 1,
        };
    }

    async confirmarAsignacionGuiasHijas(asignaciones: any[]) {
        return this.prisma.$transaction(async (prisma) => {
            const resultados = [];

            for (const asignacion of asignaciones) {
                if (asignacion.accion === 'EXISTENTE') {
                    if (asignacion.guia_hija.id_documento_coordinacion !== asignacion.id_documento_coordinacion) {
                        await prisma.guiaHija.update({
                            where: { id: asignacion.guia_hija.id },
                            data: { id_documento_coordinacion: asignacion.id_documento_coordinacion },
                        });
                    }
                    resultados.push(asignacion.guia_hija);
                } else {
                    const nuevaGuiaHija = await prisma.guiaHija.create({
                        data: {
                            id_documento_coordinacion: asignacion.id_documento_coordinacion,
                            id_guia_madre: asignacion.id_guia_madre,
                            id_finca: asignacion.id_finca,
                            numero_guia_hija: asignacion.numero_guia_hija,
                            anio: asignacion.anio,
                            secuencial: asignacion.secuencial,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    });
                    resultados.push(nuevaGuiaHija);
                }
            }

            return resultados;
        });
    }
}
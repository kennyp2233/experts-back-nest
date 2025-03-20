// src/documentos/centro-guias/guia-hija/guia-hija.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AsignarGuiaHijaDto } from './dto/asignar-guia-hija.dto';
import { UpdateGuiaHijaDto } from './dto/update-guia-hija.dto';

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

    async asignarGuiaHija(id_documento_coordinacion: number, id_finca: number, asignarGuiaHijaDto?: AsignarGuiaHijaDto) {
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

            // Si existe una guía hija para esta combinación, actualizar si es necesario
            if (guiaHijaExistente) {
                // Si el documento de coordinación es diferente, actualizar
                const dataToUpdate: any = {};

                if (guiaHijaExistente.id_documento_coordinacion !== id_documento_coordinacion) {
                    dataToUpdate.id_documento_coordinacion = id_documento_coordinacion;
                }

                // Actualizar campos adicionales si se proporcionan
                if (asignarGuiaHijaDto?.id_producto) dataToUpdate.id_producto = asignarGuiaHijaDto.id_producto;
                if (asignarGuiaHijaDto?.fulls !== undefined) dataToUpdate.fulls = asignarGuiaHijaDto.fulls;
                if (asignarGuiaHijaDto?.pcs !== undefined) dataToUpdate.pcs = asignarGuiaHijaDto.pcs;
                if (asignarGuiaHijaDto?.kgs !== undefined) dataToUpdate.kgs = asignarGuiaHijaDto.kgs;
                if (asignarGuiaHijaDto?.stems !== undefined) dataToUpdate.stems = asignarGuiaHijaDto.stems;

                // Solo actualizar si hay cambios
                if (Object.keys(dataToUpdate).length > 0) {
                    dataToUpdate.updatedAt = new Date();
                    await prisma.guiaHija.update({
                        where: { id: guiaHijaExistente.id },
                        data: dataToUpdate,
                    });
                }

                return prisma.guiaHija.findUnique({
                    where: { id: guiaHijaExistente.id },
                    include: {
                        producto: true,
                        finca: true
                    }
                });
            }

            // Crear nueva guía hija
            const anioActual = new Date().getFullYear();
            const ultimaGuia = await this.getLastGuiaHijaByYear(anioActual);
            const nuevoSecuencial = ultimaGuia ? ultimaGuia.secuencial + 1 : 1;
            const numeroGuiaHija = this.formatearNumeroGuiaHija(anioActual, nuevoSecuencial);

            // Preparar datos para creación
            const createData: any = {
                id_documento_coordinacion,
                id_guia_madre,
                id_finca,
                numero_guia_hija: numeroGuiaHija,
                anio: anioActual,
                secuencial: nuevoSecuencial,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Añadir campos adicionales si se proporcionan
            if (asignarGuiaHijaDto?.id_producto) createData.id_producto = asignarGuiaHijaDto.id_producto;
            if (asignarGuiaHijaDto?.fulls !== undefined) createData.fulls = asignarGuiaHijaDto.fulls;
            if (asignarGuiaHijaDto?.pcs !== undefined) createData.pcs = asignarGuiaHijaDto.pcs;
            if (asignarGuiaHijaDto?.kgs !== undefined) createData.kgs = asignarGuiaHijaDto.kgs;
            if (asignarGuiaHijaDto?.stems !== undefined) createData.stems = asignarGuiaHijaDto.stems;

            const nuevaGuiaHija = await prisma.guiaHija.create({
                data: createData,
                include: {
                    producto: true,
                    finca: true
                }
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
                    producto: true,
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
                producto: true,
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
            include: {
                finca: true,
                producto: true
            },
            orderBy: { createdAt: 'asc' },
        });
    }

    async getGuiasHijasPorFinca(id_finca: number) {
        return this.prisma.guiaHija.findMany({
            where: { id_finca },
            include: {
                guia_madre: true,
                documento_coordinacion: true,
                producto: true
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateGuiaHija(id: number, updateGuiaHijaDto: UpdateGuiaHijaDto) {
        const guiaHija = await this.prisma.guiaHija.findUnique({
            where: { id },
        });

        if (!guiaHija) {
            throw new NotFoundException(`Guía hija con ID ${id} no encontrada`);
        }

        return this.prisma.guiaHija.update({
            where: { id },
            data: {
                ...updateGuiaHijaDto,
                updatedAt: new Date(),
            },
            include: {
                producto: true,
                finca: true,
                guia_madre: true
            }
        });
    }

    async prevalidarAsignacionGuiasHijas(asignaciones: AsignarGuiaHijaDto[]) {
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
                include: {
                    producto: true // Incluir el producto del documento de coordinación
                }
            });

            if (!docCoordinacion) {
                throw new Error(`Documento de coordinación ${asignacion.id_documento_coordinacion} no encontrado`);
            }

            const id_guia_madre = docCoordinacion.id_guia_madre;

            // Verificar existencia previa
            const guiaExistente = await this.findByFincaAndGuiaMadre(asignacion.id_finca, id_guia_madre);

            if (guiaExistente) {
                // Si ya existe una guía, incluir los datos actuales
                const guiaConDetalles = await this.prisma.guiaHija.findUnique({
                    where: { id: guiaExistente.id },
                    include: {
                        producto: true,
                        finca: true
                    }
                });

                asignacionesExistentes.push({
                    ...asignacion,
                    id_guia_madre,
                    guia_hija: guiaConDetalles,
                    accion: 'EXISTENTE',
                });
            } else {
                const numeroGuiaHija = this.formatearNumeroGuiaHija(anioActual, proximoSecuencial);
                const finca = await this.prisma.finca.findUnique({
                    where: { id_finca: asignacion.id_finca },
                });

                // Usar el producto de la asignación o del documento de coordinación
                const id_producto = asignacion.id_producto || docCoordinacion.id_producto;
                let producto = null;
                if (id_producto) {
                    producto = await this.prisma.producto.findUnique({
                        where: { id_producto: id_producto }
                    });
                }

                nuevasAsignaciones.push({
                    ...asignacion,
                    id_guia_madre,
                    id_producto,
                    numero_guia_hija: numeroGuiaHija,
                    secuencial: proximoSecuencial,
                    anio: anioActual,
                    finca: finca || null,
                    producto: producto || null,
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
                    // Si hay una guía existente, actualizar si es necesario
                    const dataToUpdate: any = {};

                    if (asignacion.guia_hija.id_documento_coordinacion !== asignacion.id_documento_coordinacion) {
                        dataToUpdate.id_documento_coordinacion = asignacion.id_documento_coordinacion;
                    }

                    // Actualizar campos adicionales si se proporcionan
                    if (asignacion.id_producto) dataToUpdate.id_producto = asignacion.id_producto;
                    if (asignacion.fulls !== undefined) dataToUpdate.fulls = asignacion.fulls;
                    if (asignacion.pcs !== undefined) dataToUpdate.pcs = asignacion.pcs;
                    if (asignacion.kgs !== undefined) dataToUpdate.kgs = asignacion.kgs;
                    if (asignacion.stems !== undefined) dataToUpdate.stems = asignacion.stems;

                    // Solo actualizar si hay cambios
                    if (Object.keys(dataToUpdate).length > 0) {
                        dataToUpdate.updatedAt = new Date();
                        await prisma.guiaHija.update({
                            where: { id: asignacion.guia_hija.id },
                            data: dataToUpdate,
                        });
                    }

                    const guiaActualizada = await prisma.guiaHija.findUnique({
                        where: { id: asignacion.guia_hija.id },
                        include: {
                            producto: true,
                            finca: true
                        }
                    });
                    resultados.push(guiaActualizada);
                } else {
                    // Crear nueva guía hija
                    const createData: any = {
                        id_documento_coordinacion: asignacion.id_documento_coordinacion,
                        id_guia_madre: asignacion.id_guia_madre,
                        id_finca: asignacion.id_finca,
                        numero_guia_hija: asignacion.numero_guia_hija,
                        anio: asignacion.anio,
                        secuencial: asignacion.secuencial,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };

                    // Añadir campos adicionales si se proporcionan
                    if (asignacion.id_producto) createData.id_producto = asignacion.id_producto;
                    if (asignacion.fulls !== undefined) createData.fulls = asignacion.fulls;
                    if (asignacion.pcs !== undefined) createData.pcs = asignacion.pcs;
                    if (asignacion.kgs !== undefined) createData.kgs = asignacion.kgs;
                    if (asignacion.stems !== undefined) createData.stems = asignacion.stems;

                    const nuevaGuiaHija = await prisma.guiaHija.create({
                        data: createData,
                        include: {
                            producto: true,
                            finca: true
                        }
                    });
                    resultados.push(nuevaGuiaHija);
                }
            }

            return resultados;
        });
    }
}
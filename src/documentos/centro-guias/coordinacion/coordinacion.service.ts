// src/documentos/centro-guias/coordinacion/coordinacion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDocumentoCoordinacionDto } from './dto/create-documento-coordinacion.dto';

@Injectable()
export class CoordinacionService {
    constructor(private prisma: PrismaService) { }

    async getDocumentosCoordinacion(page: number = 1, pageSize: number = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const [rows, count] = await Promise.all([
            this.prisma.documentoCoordinacion.findMany({
                skip: offset,
                take: limit,
                include: {
                    aerolinea_by1: true,
                    aerolinea_by2: true,
                    aerolinea_by3: true,
                    agencia_iata: true,
                    origen_from1: true,
                    destino_to1: true,
                    destino_to2: true,
                    destino_to3: true,
                    destino_awb: true,
                    destino_final_docs: true,
                    producto: true,
                    consignatario: true,
                    coordinacion_clientes: true,
                },
            }),
            this.prisma.documentoCoordinacion.count(),
        ]);

        // Procesar los resultados para incluir información completa de los participantes
        const documentosConParticipantes = await Promise.all(rows.map(async (doc) => {
            const participantes = await this.getParticipantesByDocumento(doc.id);
            return {
                ...doc,
                participantes
            };
        }));

        return {
            data: documentosConParticipantes,
            total: count,
        };
    }

    async getParticipantesByDocumento(id_coordinacion: number) {
        const participantes = await this.prisma.coordinacionClientes.findMany({
            where: { id_coordinacion }
        });

        const resultado = [];

        for (const p of participantes) {
            if (p.tipo === 'CLIENTE') {
                const cliente = await this.prisma.cliente.findUnique({
                    where: { id_clientes: p.id_entidad }
                });

                if (cliente) {
                    resultado.push({
                        tipo: p.tipo,
                        id: p.id_entidad,
                        nombre: cliente.nombre,
                        detalles: cliente
                    });
                }
            } else if (p.tipo === 'CONSIGNATARIO') {
                const consignatario = await this.prisma.consignatario.findUnique({
                    where: { id_consignatario: p.id_entidad }
                });

                if (consignatario) {
                    resultado.push({
                        tipo: p.tipo,
                        id: p.id_entidad,
                        nombre: consignatario.nombre_consignatario,
                        detalles: consignatario
                    });
                }
            }
        }

        return resultado;
    }

    async createDocumentoCoordinacion(documentoCoordinacion: CreateDocumentoCoordinacionDto) {
        const { id_guia_madre, id_clientes = [] } = documentoCoordinacion;

        return this.prisma.$transaction(async (prisma) => {
            // Verificar guía madre
            const guiaMadre = await prisma.guiaMadre.findUnique({
                where: { id: id_guia_madre },
                include: {
                    documento_coordinacion: true,
                },
            });

            if (!guiaMadre) {
                throw new Error('La Guía Madre especificada no existe.');
            }

            if (guiaMadre.documento_coordinacion) {
                throw new Error('Esta Guía Madre ya tiene un Documento de Coordinación asignado.');
            }

            if (guiaMadre.prestamo || guiaMadre.devolucion) {
                throw new Error('No se puede asignar un Documento de Coordinación a una Guía Madre con préstamo o devolución activa.');
            }

            // Verificar consignatario
            const consignatario = await prisma.consignatario.findUnique({
                where: { id_consignatario: documentoCoordinacion.id_consignatario },
            });

            if (!consignatario) {
                throw new Error('El consignatario asociado a la Guía Madre no existe.');
            }

            // Crear documento de coordinación
            const documento = await prisma.documentoCoordinacion.create({
                data: {
                    ...documentoCoordinacion,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            // Crear relaciones - Incluir consignatario automáticamente
            const relacionesParticipantes = [
                // Agregar el consignatario
                {
                    id_coordinacion: documento.id,
                    tipo: "CONSIGNATARIO",
                    id_entidad: documentoCoordinacion.id_consignatario
                },
                // Agregar los clientes
                ...id_clientes.map(id_cliente => ({
                    id_coordinacion: documento.id,
                    tipo: "CLIENTE",
                    id_entidad: Number(id_cliente)
                }))
            ];

            await prisma.coordinacionClientes.createMany({
                data: relacionesParticipantes
            });

            return documento;
        });
    }

    async updateDocumentoCoordinacion(id: number, documentoCoordinacion: any) {
        const { id_guia_madre, id_clientes = [] } = documentoCoordinacion;

        return this.prisma.$transaction(async (prisma) => {
            // Verificar existencia del documento
            const documento = await prisma.documentoCoordinacion.findUnique({
                where: { id },
            });

            if (!documento) {
                throw new NotFoundException('Documento de coordinación no encontrado.');
            }

            // Verificar guía madre
            const guiaMadre = await prisma.guiaMadre.findUnique({
                where: { id: id_guia_madre },
                include: {
                    documento_coordinacion: true,
                },
            });

            if (!guiaMadre) {
                throw new Error('La Guía Madre especificada no existe.');
            }

            if (guiaMadre.documento_coordinacion && guiaMadre.documento_coordinacion.id !== id) {
                throw new Error('Esta Guía Madre ya tiene un Documento de Coordinación asignado.');
            }

            if (guiaMadre.prestamo || guiaMadre.devolucion) {
                throw new Error('No se puede asignar un Documento de Coordinación a una Guía Madre con préstamo o devolución activa.');
            }

            // Actualizar documento
            await prisma.documentoCoordinacion.update({
                where: { id },
                data: {
                    ...documentoCoordinacion,
                    updatedAt: new Date(),
                }
            });

            // Verificar consignatario
            const consignatario = await prisma.consignatario.findUnique({
                where: { id_consignatario: documentoCoordinacion.id_consignatario },
            });

            if (!consignatario) {
                throw new Error('El consignatario asociado a la Guía Madre no existe.');
            }

            // Eliminar todas las relaciones existentes
            await prisma.coordinacionClientes.deleteMany({
                where: { id_coordinacion: id }
            });

            // Crear nuevas relaciones - incluir consignatario
            const relacionesParticipantes = [
                // Agregar el consignatario
                {
                    id_coordinacion: id,
                    tipo: "CONSIGNATARIO",
                    id_entidad: documentoCoordinacion.id_consignatario
                },
                // Agregar los clientes
                ...id_clientes.map(id_cliente => ({
                    id_coordinacion: id,
                    tipo: "CLIENTE",
                    id_entidad: Number(id_cliente)
                }))
            ];

            await prisma.coordinacionClientes.createMany({
                data: relacionesParticipantes
            });

            return documento;
        });
    }

    async deleteDocumentoCoordinacion(id: number) {
        const documento = await this.prisma.documentoCoordinacion.findUnique({
            where: { id },
        });

        if (!documento) {
            throw new NotFoundException('Documento de coordinación no encontrado');
        }

        await this.prisma.documentoCoordinacion.delete({
            where: { id },
        });

        return documento;
    }

    async getAvailableAerolineas() {
        return this.prisma.aerolinea.findMany({
            where: {
                documentos_base: {
                    some: {
                        guias_madre: {
                            some: {
                                prestamo: false,
                                devolucion: false,
                            },
                        },
                    },
                },
            },
        });
    }
}
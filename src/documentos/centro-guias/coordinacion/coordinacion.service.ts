// src/documentos/centro-guias/coordinacion/coordinacion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

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

        return {
            data: rows,
            total: count,
        };
    }

    async createDocumentoCoordinacion(documentoCoordinacion: any) {
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

            // Asegurar inclusión del consignatario en clientes
            const clientesUnicos = new Set([...id_clientes, consignatario.id_consignatario]);

            // Crear relaciones con clientes
            const clientesPromises = Array.from(clientesUnicos).map(id_cliente =>
                prisma.coordinacionClientes.create({
                    data: {
                        id_coordinacion: documento.id,
                        id_cliente: Number(id_cliente),
                    },
                })
            );

            await Promise.all(clientesPromises);
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
                    createdAt: new Date(),
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

            // Obtener clientes actuales
            const clientesActuales = await prisma.coordinacionClientes.findMany({
                where: { id_coordinacion: id },
            });

            const clientesActualesIds = clientesActuales.map(c => c.id_cliente);

            // Actualizar clientes
            const nuevosClientes = new Set([...id_clientes, consignatario.id_consignatario]);
            const clientesAEliminar = clientesActualesIds.filter(id_cliente =>
                !nuevosClientes.has(id_cliente));
            const clientesAAgregar = Array.from(nuevosClientes).filter(id_cliente =>
                !clientesActualesIds.includes(Number(id_cliente)));

            // Eliminar relaciones obsoletas
            if (clientesAEliminar.length > 0) {
                await prisma.coordinacionClientes.deleteMany({
                    where: {
                        id_coordinacion: id,
                        id_cliente: { in: clientesAEliminar },
                    },
                });
            }

            // Crear nuevas relaciones
            if (clientesAAgregar.length > 0) {
                const clientesToAdd = clientesAAgregar.map(id_cliente => ({
                    id_coordinacion: id,
                    id_cliente: Number(id_cliente),
                }));

                await prisma.coordinacionClientes.createMany({
                    data: clientesToAdd,
                });
            }

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
            include: {
                documentos_base: {
                    include: {
                        guias_madre: {
                            where: {
                                prestamo: false,
                                devolucion: false,
                            },
                        },
                    },
                    where: {
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
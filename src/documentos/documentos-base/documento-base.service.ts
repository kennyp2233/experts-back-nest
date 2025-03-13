// src/documentos/documentos-base/documento-base.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentoBaseService {
    constructor(private prisma: PrismaService) { }

    async getDocumentosBase(page: number = 1, pageSize: number = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const [rows, count] = await Promise.all([
            this.prisma.documentoBase.findMany({
                skip: offset,
                take: limit,
            }),
            this.prisma.documentoBase.count(),
        ]);

        return {
            data: rows,
            total: count,
        };
    }

    async getDocumentoBase(id: number) {
        const documentoBase = await this.prisma.documentoBase.findUnique({
            where: { id },
        });

        if (!documentoBase) {
            throw new NotFoundException(`Documento base con ID ${id} no encontrado`);
        }

        return documentoBase;
    }

    async createDocumentoBase(documentoBase: any) {
        return this.prisma.documentoBase.create({
            data: {
                ...documentoBase,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }

    async updateDocumentoBase(documentoBase: any) {
        const { id } = documentoBase;
        const documentoToUpdate = await this.prisma.documentoBase.findUnique({
            where: { id },
        });

        if (!documentoToUpdate) {
            throw new NotFoundException(`Documento base con ID ${id} no encontrado`);
        }

        const { createdAt, ...updateData } = documentoBase;

        return this.prisma.documentoBase.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        });
    }

    async deleteDocumentosBase(ids: number[]) {
        return this.prisma.documentoBase.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    /**
     * Genera secuenciales siguiendo la lógica específica:
     * - Suma 11 en cada incremento.
     * - Si el último dígito es 6, suma 4 en lugar de 11.
     */
    generarSecuenciales(inicial: number, cantidad: number): number[] {
        const secuenciales: number[] = [];
        let actual = inicial;

        for (let i = 0; i < cantidad; i++) {
            secuenciales.push(actual);
            const ultimoDigito = actual % 10;

            if (ultimoDigito === 6) {
                actual += 4;
            } else {
                actual += 11;
            }
        }

        return secuenciales;
    }

    async crearDocumentoYGuias(
        documentoBase: any,
        nGuias: number,
        secuencialInicial: number,
        prefijo: number,
    ) {
        return this.prisma.$transaction(async (prisma) => {
            // Crear el documento base
            const documentoCreado = await prisma.documentoBase.create({
                data: {
                    ...documentoBase,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            // Generar secuenciales
            const secuenciales = this.generarSecuenciales(secuencialInicial, nGuias);

            // Crear guías madre
            const guiasPromises = secuenciales.map((secuencial) =>
                prisma.guiaMadre.create({
                    data: {
                        id_documento_base: documentoCreado.id,
                        prefijo,
                        secuencial,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                })
            );

            await Promise.all(guiasPromises);
            return documentoCreado;
        });
    }

    async previewDocumentoBaseYGuias(
        documentoBase: any,
        nGuias: number,
        secuencialInicial: number,
        prefijo: number,
    ) {
        const documentoCreado = {
            ...documentoBase,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Obtener último documento para simular ID
        const lastDocumento = await this.prisma.documentoBase.findFirst({
            orderBy: { id: 'desc' },
        });

        documentoCreado.id = lastDocumento ? lastDocumento.id + 1 : 1;

        // Generar secuenciales
        const secuenciales = this.generarSecuenciales(secuencialInicial, nGuias);

        // Simular guías madre
        const guias = secuenciales.map((secuencial) => ({
            id_documento_base: documentoCreado.id,
            prefijo,
            secuencial,
        }));

        return { ...documentoCreado, guias_madre: guias };
    }

    async getGuiasBase(page: number = 1, pageSize: number = 10) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const [rows, count] = await Promise.all([
            this.prisma.documentoBase.findMany({
                skip: offset,
                take: limit,
                include: {
                    guias_madre: true,
                    aerolinea: true,
                    referencia: true,
                    stock: true,
                },
            }),
            this.prisma.documentoBase.count(),
        ]);

        return {
            data: rows,
            total: count,
        };
    }
}
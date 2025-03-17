// src/documentos/documentos-base/documento-base.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentoBaseDto } from './dto/create-documento-base.dto';
import { UpdateDocumentoBaseDto } from './dto/update-documento-base.dto';
import { DocumentoBaseResponseDto } from './dto/documento-base-response.dto';
import { PreviewDocumentoGuiasResponseDto } from './dto/preview-documento-guias.dto';

@Injectable()
export class DocumentoBaseService {
    constructor(private prisma: PrismaService) { }

    async getDocumentosBase(page: number = 1, pageSize: number = 10): Promise<{ data: DocumentoBaseResponseDto[], total: number }> {
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
            data: rows as DocumentoBaseResponseDto[],
            total: count,
        };
    }

    async getDocumentoBase(id: number): Promise<DocumentoBaseResponseDto> {
        const documentoBase = await this.prisma.documentoBase.findUnique({
            where: { id },
        });

        if (!documentoBase) {
            throw new NotFoundException(`Documento base con ID ${id} no encontrado`);
        }

        return documentoBase as DocumentoBaseResponseDto;
    }

    async createDocumentoBase(createDocumentoBaseDto: CreateDocumentoBaseDto): Promise<DocumentoBaseResponseDto> {
        console.log(createDocumentoBaseDto);
        return this.prisma.documentoBase.create({
            data: {
                ...createDocumentoBaseDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        }) as Promise<DocumentoBaseResponseDto>;
    }

    async updateDocumentoBase(updateDocumentoBaseDto: UpdateDocumentoBaseDto): Promise<DocumentoBaseResponseDto> {
        const { id } = updateDocumentoBaseDto;
        const documentoToUpdate = await this.prisma.documentoBase.findUnique({
            where: { id },
        });

        if (!documentoToUpdate) {
            throw new NotFoundException(`Documento base con ID ${id} no encontrado`);
        }

        // Excluir campos que no deberían actualizarse directamente
        const { ...updateData } = updateDocumentoBaseDto;

        return this.prisma.documentoBase.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        }) as Promise<DocumentoBaseResponseDto>;
    }

    async deleteDocumentosBase(ids: number[]): Promise<{ count: number }> {
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
        documentoBaseDto: CreateDocumentoBaseDto,
        nGuias: number,
        secuencialInicial: number,
        prefijo: number,
    ): Promise<DocumentoBaseResponseDto> {
        return this.prisma.$transaction(async (prisma) => {
            // Crear el documento base
            const documentoCreado = await prisma.documentoBase.create({
                data: {
                    ...documentoBaseDto,
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
            return documentoCreado as DocumentoBaseResponseDto;
        });
    }

    async previewDocumentoBaseYGuias(
        documentoBaseDto: CreateDocumentoBaseDto,
        nGuias: number,
        secuencialInicial: number,
        prefijo: number,
    ): Promise<PreviewDocumentoGuiasResponseDto> {
        // Obtener último documento para simular ID
        const lastDocumento = await this.prisma.documentoBase.findFirst({
            orderBy: { id: 'desc' },
        });

        const simulatedId = lastDocumento ? lastDocumento.id + 1 : 1;

        // Generar secuenciales
        const secuenciales = this.generarSecuenciales(secuencialInicial, nGuias);

        // Simular documento base
        const documentoCreado = {
            ...documentoBaseDto,
            id: simulatedId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Simular guías madre
        const guias = secuenciales.map((secuencial) => ({
            id_documento_base: simulatedId,
            prefijo,
            secuencial,
        }));

        return {
            ...documentoCreado,
            guias_madre: guias,
        } as PreviewDocumentoGuiasResponseDto;
    }

    async getGuiasBase(page: number = 1, pageSize: number = 10): Promise<{ data: DocumentoBaseResponseDto[], total: number }> {
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
            data: rows as DocumentoBaseResponseDto[],
            total: count,
        };
    }
}
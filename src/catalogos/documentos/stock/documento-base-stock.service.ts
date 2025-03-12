import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDocumentoBaseStockDto } from './dto/create-documento-base-stock.dto';
import { UpdateDocumentoBaseStockDto } from './dto/update-documento-base-stock.dto';

@Injectable()
export class DocumentoBaseStockService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.documentoBaseStock.findMany();
    }

    async findOne(id: number) {
        const documentoBaseStock = await this.prisma.documentoBaseStock.findUnique({
            where: { id },
        });

        if (!documentoBaseStock) {
            throw new NotFoundException(`Documento Base Stock con ID ${id} no encontrado`);
        }

        return documentoBaseStock;
    }

    async create(createDocumentoBaseStockDto: CreateDocumentoBaseStockDto) {
        return this.prisma.documentoBaseStock.create({
            data: createDocumentoBaseStockDto,
        });
    }

    async update(id: number, updateDocumentoBaseStockDto: UpdateDocumentoBaseStockDto) {
        const documentoBaseStock = await this.prisma.documentoBaseStock.findUnique({
            where: { id },
        });

        if (!documentoBaseStock) {
            throw new NotFoundException(`Documento Base Stock con ID ${id} no encontrado`);
        }

        return this.prisma.documentoBaseStock.update({
            where: { id },
            data: updateDocumentoBaseStockDto,
        });
    }

    async remove(id: number) {
        const documentoBaseStock = await this.prisma.documentoBaseStock.findUnique({
            where: { id },
        });

        if (!documentoBaseStock) {
            throw new NotFoundException(`Documento Base Stock con ID ${id} no encontrado`);
        }

        return this.prisma.documentoBaseStock.delete({
            where: { id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.documentoBaseStock.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
}
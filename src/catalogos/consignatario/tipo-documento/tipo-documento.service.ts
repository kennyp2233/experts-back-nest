import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';

@Injectable()
export class TipoDocumentoService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.tipoDocumento.findMany({
            orderBy: {
                nombre: 'asc',
            },
        });
    }

    async findOne(id: number) {
        const tipoDocumento = await this.prisma.tipoDocumento.findUnique({
            where: { id_tipo_documento: id },
        });

        if (!tipoDocumento) {
            throw new NotFoundException(`Tipo Documento con ID ${id} no encontrado`);
        }

        return tipoDocumento;
    }

    async create(createTipoDocumentoDto: CreateTipoDocumentoDto) {
        return this.prisma.tipoDocumento.create({
            data: createTipoDocumentoDto,
        });
    }

    async update(id: number, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
        const tipoDocumento = await this.prisma.tipoDocumento.findUnique({
            where: { id_tipo_documento: id },
        });

        if (!tipoDocumento) {
            throw new NotFoundException(`Tipo Documento con ID ${id} no encontrado`);
        }

        return this.prisma.tipoDocumento.update({
            where: { id_tipo_documento: id },
            data: updateTipoDocumentoDto,
        });
    }

    async remove(id: number) {
        const tipoDocumento = await this.prisma.tipoDocumento.findUnique({
            where: { id_tipo_documento: id },
        });

        if (!tipoDocumento) {
            throw new NotFoundException(`Tipo Documento con ID ${id} no encontrado`);
        }

        return this.prisma.tipoDocumento.delete({
            where: { id_tipo_documento: id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.tipoDocumento.deleteMany({
            where: {
                id_tipo_documento: {
                    in: ids,
                },
            },
        });
    }
}
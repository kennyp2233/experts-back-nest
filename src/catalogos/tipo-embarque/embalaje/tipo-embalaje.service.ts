import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTipoEmbalajeDto } from './dto/create-tipo-embalaje.dto';
import { UpdateTipoEmbalajeDto } from './dto/update-tipo-embalaje.dto';

@Injectable()
export class TipoEmbalajeService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.tipoEmbalaje.findMany({
            orderBy: {
                nombre: 'asc',
            },
        });
    }

    async findOne(id: number) {
        const tipoEmbalaje = await this.prisma.tipoEmbalaje.findUnique({
            where: { id_tipo_embalaje: id },
        });

        if (!tipoEmbalaje) {
            throw new NotFoundException(`Tipo Embalaje con ID ${id} no encontrado`);
        }

        return tipoEmbalaje;
    }

    async create(createTipoEmbalajeDto: CreateTipoEmbalajeDto) {
        return this.prisma.tipoEmbalaje.create({
            data: createTipoEmbalajeDto,
        });
    }

    async update(id: number, updateTipoEmbalajeDto: UpdateTipoEmbalajeDto) {
        const tipoEmbalaje = await this.prisma.tipoEmbalaje.findUnique({
            where: { id_tipo_embalaje: id },
        });

        if (!tipoEmbalaje) {
            throw new NotFoundException(`Tipo Embalaje con ID ${id} no encontrado`);
        }

        return this.prisma.tipoEmbalaje.update({
            where: { id_tipo_embalaje: id },
            data: updateTipoEmbalajeDto,
        });
    }

    async remove(id: number) {
        const tipoEmbalaje = await this.prisma.tipoEmbalaje.findUnique({
            where: { id_tipo_embalaje: id },
        });

        if (!tipoEmbalaje) {
            throw new NotFoundException(`Tipo Embalaje con ID ${id} no encontrado`);
        }

        return this.prisma.tipoEmbalaje.delete({
            where: { id_tipo_embalaje: id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.tipoEmbalaje.deleteMany({
            where: {
                id_tipo_embalaje: {
                    in: ids,
                },
            },
        });
    }
}
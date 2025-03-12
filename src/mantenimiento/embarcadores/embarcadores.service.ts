// src/mantenimiento/embarcadores/embarcadores.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmbarcadorDto } from './dto/create-embarcador.dto';
import { UpdateEmbarcadorDto } from './dto/update-embarcador.dto';

@Injectable()
export class EmbarcadoresService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.embarcador.findMany();
    }

    async findOne(id: number) {
        const embarcador = await this.prisma.embarcador.findUnique({
            where: { id_embarcador: id },
        });

        if (!embarcador) {
            throw new NotFoundException(`Embarcador con ID ${id} no encontrado`);
        }

        return embarcador;
    }

    async create(createEmbarcadorDto: CreateEmbarcadorDto) {
        return this.prisma.embarcador.create({
            data: createEmbarcadorDto,
        });
    }

    async update(id: number, updateEmbarcadorDto: UpdateEmbarcadorDto) {
        const embarcador = await this.prisma.embarcador.findUnique({
            where: { id_embarcador: id },
        });

        if (!embarcador) {
            throw new NotFoundException(`Embarcador con ID ${id} no encontrado`);
        }

        return this.prisma.embarcador.update({
            where: { id_embarcador: id },
            data: updateEmbarcadorDto,
        });
    }

    async remove(id: number) {
        const embarcador = await this.prisma.embarcador.findUnique({
            where: { id_embarcador: id },
        });

        if (!embarcador) {
            throw new NotFoundException(`Embarcador con ID ${id} no encontrado`);
        }

        return this.prisma.embarcador.delete({
            where: { id_embarcador: id },
        });
    }

    async removeMany(ids: number[]) {
        const existingEmbarcadores = await this.prisma.embarcador.findMany({
            where: {
                id_embarcador: {
                    in: ids,
                },
            },
            select: {
                id_embarcador: true,
            },
        });

        if (existingEmbarcadores.length === 0) {
            throw new NotFoundException('No se encontraron embarcadores para eliminar');
        }

        const existingIds = existingEmbarcadores.map(embarcador => embarcador.id_embarcador);

        return this.prisma.embarcador.deleteMany({
            where: {
                id_embarcador: {
                    in: existingIds,
                },
            },
        });
    }
}
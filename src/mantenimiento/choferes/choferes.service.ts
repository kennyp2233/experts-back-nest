// src/mantenimiento/choferes/choferes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChoferDto } from './dto/create-chofer.dto';
import { UpdateChoferDto } from './dto/update-chofer.dto';

@Injectable()
export class ChoferesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.chofer.findMany();
    }

    async findOne(id: number) {
        const chofer = await this.prisma.chofer.findUnique({
            where: { id_chofer: id },
        });

        if (!chofer) {
            throw new NotFoundException(`Chofer con ID ${id} no encontrado`);
        }

        return chofer;
    }

    async create(createChoferDto: CreateChoferDto) {
        return this.prisma.chofer.create({
            data: createChoferDto,
        });
    }

    async update(id: number, updateChoferDto: UpdateChoferDto) {
        const chofer = await this.prisma.chofer.findUnique({
            where: { id_chofer: id },
        });

        if (!chofer) {
            throw new NotFoundException(`Chofer con ID ${id} no encontrado`);
        }

        return this.prisma.chofer.update({
            where: { id_chofer: id },
            data: updateChoferDto,
        });
    }

    async removeMany(ids: number[]) {
        const existingChoferes = await this.prisma.chofer.findMany({
            where: {
                id_chofer: {
                    in: ids,
                },
            },
            select: {
                id_chofer: true,
            },
        });

        if (existingChoferes.length === 0) {
            throw new NotFoundException('No se encontraron choferes para eliminar');
        }

        const existingIds = existingChoferes.map(chofer => chofer.id_chofer);

        return this.prisma.chofer.deleteMany({
            where: {
                id_chofer: {
                    in: existingIds,
                },
            },
        });
    }
}
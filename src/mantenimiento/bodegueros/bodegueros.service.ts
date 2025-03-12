// src/mantenimiento/bodegueros/bodegueros.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBodegueroDto } from './dto/create-bodeguero.dto';
import { UpdateBodegueroDto } from './dto/update-bodeguero.dto';

@Injectable()
export class BodeguerosService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.bodeguero.findMany();
    }

    async findOne(id: number) {
        const bodeguero = await this.prisma.bodeguero.findUnique({
            where: { id_bodeguero: id },
        });

        if (!bodeguero) {
            throw new NotFoundException(`Bodeguero con ID ${id} no encontrado`);
        }

        return bodeguero;
    }

    async create(createBodegueroDto: CreateBodegueroDto) {
        return this.prisma.bodeguero.create({
            data: createBodegueroDto,
        });
    }

    async update(id: number, updateBodegueroDto: UpdateBodegueroDto) {
        const bodeguero = await this.prisma.bodeguero.findUnique({
            where: { id_bodeguero: id },
        });

        if (!bodeguero) {
            throw new NotFoundException(`Bodeguero con ID ${id} no encontrado`);
        }

        return this.prisma.bodeguero.update({
            where: { id_bodeguero: id },
            data: updateBodegueroDto,
        });
    }

    async removeMany(ids: any[]) {
        return this.prisma.bodeguero.deleteMany({
            where: {
                id_bodeguero: {
                    in: ids.map(id => Number(id)),
                },
            },
        });
    }
}
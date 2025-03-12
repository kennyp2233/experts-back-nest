// src/mantenimiento/cae-aduanas/cae-aduanas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCaeAduanaDto } from './dto/create-cae-aduana.dto';
import { UpdateCaeAduanaDto } from './dto/update-cae-aduana.dto';

@Injectable()
export class CaeAduanasService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.caeAduana.findMany();
    }

    async findOne(id: number) {
        const aduana = await this.prisma.caeAduana.findUnique({
            where: { id_cae_aduana: id },
        });

        if (!aduana) {
            throw new NotFoundException(`Aduana con ID ${id} no encontrada`);
        }

        return aduana;
    }

    async create(createCaeAduanaDto: CreateCaeAduanaDto) {
        return this.prisma.caeAduana.create({
            data: createCaeAduanaDto,
        });
    }

    async update(id: number, updateCaeAduanaDto: UpdateCaeAduanaDto) {
        const aduana = await this.prisma.caeAduana.findUnique({
            where: { id_cae_aduana: id },
        });

        if (!aduana) {
            throw new NotFoundException(`Aduana con ID ${id} no encontrada`);
        }

        return this.prisma.caeAduana.update({
            where: { id_cae_aduana: id },
            data: updateCaeAduanaDto,
        });
    }

    async remove(id: number) {
        const aduana = await this.prisma.caeAduana.findUnique({
            where: { id_cae_aduana: id },
        });

        if (!aduana) {
            throw new NotFoundException(`Aduana con ID ${id} no encontrada`);
        }

        return this.prisma.caeAduana.delete({
            where: { id_cae_aduana: id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.caeAduana.deleteMany({
            where: {
                id_cae_aduana: {
                    in: ids,
                },
            },
        });
    }
}
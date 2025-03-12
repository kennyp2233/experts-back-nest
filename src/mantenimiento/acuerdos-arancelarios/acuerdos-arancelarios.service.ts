// src/mantenimiento/acuerdos-arancelarios/acuerdos-arancelarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAcuerdoArancelarioDto } from './dto/create-acuerdo-arancelario.dto';
import { UpdateAcuerdoArancelarioDto } from './dto/update-acuerdo-arancelario.dto';

@Injectable()
export class AcuerdosArancelariosService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.acuerdoArancelario.findMany();
    }

    async findOne(id: number) {
        const acuerdoArancelario = await this.prisma.acuerdoArancelario.findUnique({
            where: { id_acuerdo: id },
        });

        if (!acuerdoArancelario) {
            throw new NotFoundException(`Acuerdo Arancelario con ID ${id} no encontrado`);
        }

        return acuerdoArancelario;
    }

    async create(createAcuerdoArancelarioDto: CreateAcuerdoArancelarioDto) {
        return this.prisma.acuerdoArancelario.create({
            data: createAcuerdoArancelarioDto,
        });
    }

    async update(id: number, updateAcuerdoArancelarioDto: UpdateAcuerdoArancelarioDto) {
        const acuerdoArancelario = await this.prisma.acuerdoArancelario.findUnique({
            where: { id_acuerdo: id },
        });

        if (!acuerdoArancelario) {
            throw new NotFoundException(`Acuerdo Arancelario con ID ${id} no encontrado`);
        }

        return this.prisma.acuerdoArancelario.update({
            where: { id_acuerdo: id },
            data: updateAcuerdoArancelarioDto,
        });
    }

    async remove(id: number) {
        const acuerdoArancelario = await this.prisma.acuerdoArancelario.findUnique({
            where: { id_acuerdo: id },
        });

        if (!acuerdoArancelario) {
            throw new NotFoundException(`Acuerdo Arancelario con ID ${id} no encontrado`);
        }

        return this.prisma.acuerdoArancelario.delete({
            where: { id_acuerdo: id },
        });
    }
}
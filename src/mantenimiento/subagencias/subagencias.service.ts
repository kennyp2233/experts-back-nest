// src/mantenimiento/subagencias/subagencias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubAgenciaDto } from './dto/create-subagencia.dto';
import { UpdateSubAgenciaDto } from './dto/update-subagencia.dto';

@Injectable()
export class SubAgenciasService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.subAgencia.findMany({
            orderBy: {
                nombre: 'asc'
            }
        });
    }

    async findOne(id: number) {
        const subAgencia = await this.prisma.subAgencia.findUnique({
            where: { id_subagencia: id },
        });

        if (!subAgencia) {
            throw new NotFoundException(`SubAgencia con ID ${id} no encontrada`);
        }

        return subAgencia;
    }

    async create(createSubAgenciaDto: CreateSubAgenciaDto) {
        return this.prisma.subAgencia.create({
            data: createSubAgenciaDto,
        });
    }

    async update(id: number, updateSubAgenciaDto: UpdateSubAgenciaDto) {
        const subAgencia = await this.prisma.subAgencia.findUnique({
            where: { id_subagencia: id },
        });

        if (!subAgencia) {
            throw new NotFoundException(`SubAgencia con ID ${id} no encontrada`);
        }

        return this.prisma.subAgencia.update({
            where: { id_subagencia: id },
            data: updateSubAgenciaDto,
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.subAgencia.deleteMany({
            where: {
                id_subagencia: {
                    in: ids,
                },
            },
        });
    }
}
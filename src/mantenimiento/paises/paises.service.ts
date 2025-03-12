// src/mantenimiento/paises/paises.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaisDto, PaisRelacionado } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';

@Injectable()
export class PaisesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.pais.findMany();
    }

    async findOne(id: number) {
        const pais = await this.prisma.pais.findUnique({
            where: { id_pais: id },
        });

        if (!pais) {
            throw new NotFoundException(`País con ID ${id} no encontrado`);
        }

        return pais;
    }

    async create(createPaisDto: CreatePaisDto | PaisRelacionado) {
        const paisData = this.extraerPaisDeData(createPaisDto);
        return this.prisma.pais.create({
            data: paisData,
        });
    }

    async update(id: number, updatePaisDto: UpdatePaisDto | PaisRelacionado) {
        const pais = await this.prisma.pais.findUnique({
            where: { id_pais: id },
        });

        if (!pais) {
            throw new NotFoundException(`País con ID ${id} no encontrado`);
        }

        const paisData = this.extraerPaisDeData(updatePaisDto);
        return this.prisma.pais.update({
            where: { id_pais: id },
            data: paisData,
        });
    }

    async removeMany(ids: number[]) {
        const existingPaises = await this.prisma.pais.findMany({
            where: {
                id_pais: {
                    in: ids,
                },
            },
            select: {
                id_pais: true,
            },
        });

        if (existingPaises.length === 0) {
            throw new NotFoundException('No se encontraron países para eliminar');
        }

        const existingIds = existingPaises.map(pais => pais.id_pais);

        return this.prisma.pais.deleteMany({
            where: {
                id_pais: {
                    in: existingIds,
                },
            },
        });
    }

    async paisesJoinAcuerdos() {
        return this.prisma.pais.findMany({
            include: {
                acuerdo: true,
            },
        });
    }

    private extraerPaisDeData(pais: any) {
        return {
            nombre: pais?.nombre,
            siglas_pais: pais?.siglas_pais,
            pais_id: pais?.pais_id,
            id_acuerdo: pais?.id_acuerdo || pais?.acuerdos_arancelario?.id_acuerdo
        };
    }
}
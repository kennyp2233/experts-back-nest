// src/mantenimiento/origenes/origenes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrigenDto } from './dto/create-origen.dto';
import { UpdateOrigenDto, OrigenRelacionado } from './dto/update-origen.dto';

@Injectable()
export class OrigenesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.origen.findMany();
    }

    async findOne(id: number) {
        const origen = await this.prisma.origen.findUnique({
            where: { id_origen: id },
        });

        if (!origen) {
            throw new NotFoundException(`Origen con ID ${id} no encontrado`);
        }

        return origen;
    }

    async create(createOrigenDto: CreateOrigenDto | OrigenRelacionado) {
        const data = this.extractOrigenData(createOrigenDto);
        return this.prisma.origen.create({
            data,
        });
    }

    async update(id: number, updateOrigenDto: UpdateOrigenDto | OrigenRelacionado) {
        const origen = await this.prisma.origen.findUnique({
            where: { id_origen: id },
        });

        if (!origen) {
            throw new NotFoundException(`Origen con ID ${id} no encontrado`);
        }

        const data = this.extractOrigenData(updateOrigenDto);
        return this.prisma.origen.update({
            where: { id_origen: id },
            data,
        });
    }

    async remove(id: number) {
        const origen = await this.prisma.origen.findUnique({
            where: { id_origen: id },
        });

        if (!origen) {
            throw new NotFoundException(`Origen con ID ${id} no encontrado`);
        }

        return this.prisma.origen.delete({
            where: { id_origen: id },
        });
    }

    async removeMany(ids: number[]) {
        const existingOrigenes = await this.prisma.origen.findMany({
            where: {
                id_origen: {
                    in: ids,
                },
            },
            select: {
                id_origen: true,
            },
        });

        if (existingOrigenes.length === 0) {
            throw new NotFoundException('No se encontraron orígenes para eliminar');
        }

        const existingIds = existingOrigenes.map(origen => origen.id_origen);

        return this.prisma.origen.deleteMany({
            where: {
                id_origen: {
                    in: existingIds,
                },
            },
        });
    }

    async origenJoinPaisesAduanas() {
        return this.prisma.origen.findMany({
            include: {
                pais: true,
                cae_aduana: true,
            },
        });
    }

    private extractOrigenData(data: any) {
        return {
            codigo_origen: data?.codigo_origen,
            nombre: data?.nombre,
            aeropuerto: data?.aeropuerto,
            id_pais: data?.id_pais || data?.paise?.id_pais,
            id_cae_aduana: data?.id_cae_aduana || data?.cae_aduana?.id_cae_aduana,
        };
    }
}
// src/mantenimiento/destinos/destinos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto, DestinoRelacionado } from './dto/update-destino.dto';

@Injectable()
export class DestinosService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.destino.findMany({
            orderBy: {
                codigo_destino: 'asc',
            },
        });
    }

    async findOne(id: number) {
        const destino = await this.prisma.destino.findUnique({
            where: { id_destino: id },
        });

        if (!destino) {
            throw new NotFoundException(`Destino con ID ${id} no encontrado`);
        }

        return destino;
    }

    async create(createDestinoDto: CreateDestinoDto | DestinoRelacionado) {
        const data = this.extractDestinoData(createDestinoDto);
        return this.prisma.destino.create({
            data,
        });
    }

    async update(id: number, updateDestinoDto: UpdateDestinoDto | DestinoRelacionado) {
        const destino = await this.prisma.destino.findUnique({
            where: { id_destino: id },
        });

        if (!destino) {
            throw new NotFoundException(`Destino con ID ${id} no encontrado`);
        }

        const data = this.extractDestinoData(updateDestinoDto);
        return this.prisma.destino.update({
            where: { id_destino: id },
            data,
        });
    }

    async remove(id: number) {
        const destino = await this.prisma.destino.findUnique({
            where: { id_destino: id },
        });

        if (!destino) {
            throw new NotFoundException(`Destino con ID ${id} no encontrado`);
        }

        return this.prisma.destino.delete({
            where: { id_destino: id },
        });
    }

    async removeMany(ids: number[]) {
        const existingDestinos = await this.prisma.destino.findMany({
            where: {
                id_destino: {
                    in: ids,
                },
            },
            select: {
                id_destino: true,
            },
        });

        if (existingDestinos.length === 0) {
            throw new NotFoundException('No se encontraron destinos para eliminar');
        }

        const existingIds = existingDestinos.map(destino => destino.id_destino);

        return this.prisma.destino.deleteMany({
            where: {
                id_destino: {
                    in: existingIds,
                },
            },
        });
    }

    async getDestinosJoinPais() {
        return this.prisma.destino.findMany({
            include: {
                pais: true,
            },
            orderBy: {
                codigo_destino: 'asc',
            },
        });
    }

    private extractDestinoData(data: any) {
        return {
            codigo_destino: data?.codigo_destino,
            nombre: data?.nombre,
            aeropuerto: data?.aeropuerto,
            id_pais: data?.id_pais || data?.pais?.id_pais,
            sesa_id: data?.sesa_id,
            leyenda_fito: data?.leyenda_fito,
            cobro_fitos: data?.cobro_fitos !== undefined ? data.cobro_fitos : false,
        };
    }
}
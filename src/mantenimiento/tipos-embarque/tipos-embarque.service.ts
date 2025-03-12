// src/mantenimiento/tipos-embarque/tipos-embarque.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTipoEmbarqueDto, TipoEmbarqueRelacionado } from './dto/create-tipo-embarque.dto';
import { UpdateTipoEmbarqueDto } from './dto/update-tipo-embarque.dto';

@Injectable()
export class TiposEmbarqueService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.tipoEmbarque.findMany();
    }

    async findOne(id: number) {
        const tipoEmbarque = await this.prisma.tipoEmbarque.findUnique({
            where: { id_tipo_embarque: id },
        });

        if (!tipoEmbarque) {
            throw new NotFoundException(`Tipo de embarque con ID ${id} no encontrado`);
        }

        return tipoEmbarque;
    }

    async create(createTipoEmbarqueDto: CreateTipoEmbarqueDto | TipoEmbarqueRelacionado) {
        const data = this.extractDataToTipoEmbarque(createTipoEmbarqueDto);
        return this.prisma.tipoEmbarque.create({
            data,
        });
    }

    async update(id: number, updateTipoEmbarqueDto: UpdateTipoEmbarqueDto | TipoEmbarqueRelacionado) {
        const tipoEmbarque = await this.prisma.tipoEmbarque.findUnique({
            where: { id_tipo_embarque: id },
        });

        if (!tipoEmbarque) {
            throw new NotFoundException(`Tipo de embarque con ID ${id} no encontrado`);
        }

        const data = this.extractDataToTipoEmbarque(updateTipoEmbarqueDto);
        return this.prisma.tipoEmbarque.update({
            where: { id_tipo_embarque: id },
            data,
        });
    }

    async remove(id: number) {
        const tipoEmbarque = await this.prisma.tipoEmbarque.findUnique({
            where: { id_tipo_embarque: id },
        });

        if (!tipoEmbarque) {
            throw new NotFoundException(`Tipo de embarque con ID ${id} no encontrado`);
        }

        return this.prisma.tipoEmbarque.delete({
            where: { id_tipo_embarque: id },
        });
    }

    async removeMany(ids: number[]) {
        const existingTiposEmbarque = await this.prisma.tipoEmbarque.findMany({
            where: {
                id_tipo_embarque: {
                    in: ids,
                },
            },
            select: {
                id_tipo_embarque: true,
            },
        });

        if (existingTiposEmbarque.length === 0) {
            throw new NotFoundException('No se encontraron tipos de embarque para eliminar');
        }

        const existingIds = existingTiposEmbarque.map(tipo => tipo.id_tipo_embarque);

        return this.prisma.tipoEmbarque.deleteMany({
            where: {
                id_tipo_embarque: {
                    in: existingIds,
                },
            },
        });
    }

    async getTiposEmbarqueJoinAll() {
        return this.prisma.tipoEmbarque.findMany({
            include: {
                carga: true,
                embalaje: true,
            },
        });
    }

    private extractDataToTipoEmbarque(data: any) {
        return {
            codigo_embarque: data?.codigo_embarque,
            nombre: data?.nombre,
            id_tipo_carga: data?.id_tipo_carga || data?.carga?.id_tipo_carga,
            id_tipo_embalaje: data?.id_tipo_embalaje || data?.embalaje?.id_tipo_embalaje,
            regimen: data?.regimen,
            mercancia: data?.mercancia,
            harmonised_comidity: data?.harmonised_comidity,
        };
    }
}
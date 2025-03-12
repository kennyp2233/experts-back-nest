import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTipoCargaDto } from './dto/create-tipo-carga.dto';
import { UpdateTipoCargaDto } from './dto/update-tipo-carga.dto';

@Injectable()
export class TipoCargaService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.tipoCarga.findMany({
            orderBy: {
                nombre: 'asc',
            },
        });
    }

    async findOne(id: number) {
        const tipoCarga = await this.prisma.tipoCarga.findUnique({
            where: { id_tipo_carga: id },
        });

        if (!tipoCarga) {
            throw new NotFoundException(`Tipo Carga con ID ${id} no encontrado`);
        }

        return tipoCarga;
    }

    async create(createTipoCargaDto: CreateTipoCargaDto) {
        return this.prisma.tipoCarga.create({
            data: createTipoCargaDto,
        });
    }

    async update(id: number, updateTipoCargaDto: UpdateTipoCargaDto) {
        const tipoCarga = await this.prisma.tipoCarga.findUnique({
            where: { id_tipo_carga: id },
        });

        if (!tipoCarga) {
            throw new NotFoundException(`Tipo Carga con ID ${id} no encontrado`);
        }

        return this.prisma.tipoCarga.update({
            where: { id_tipo_carga: id },
            data: updateTipoCargaDto,
        });
    }

    async remove(id: number) {
        const tipoCarga = await this.prisma.tipoCarga.findUnique({
            where: { id_tipo_carga: id },
        });

        if (!tipoCarga) {
            throw new NotFoundException(`Tipo Carga con ID ${id} no encontrado`);
        }

        return this.prisma.tipoCarga.delete({
            where: { id_tipo_carga: id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.tipoCarga.deleteMany({
            where: {
                id_tipo_carga: {
                    in: ids,
                },
            },
        });
    }
}
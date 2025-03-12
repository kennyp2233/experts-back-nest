// src/mantenimiento/agencias-iata/agencias-iata.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAgenciaIataDto } from './dto/create-agencia-iata.dto';
import { UpdateAgenciaIataDto } from './dto/update-agencia-iata.dto';

@Injectable()
export class AgenciasIataService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.agenciaIata.findMany();
    }

    async findOne(id: number) {
        const agenciaIata = await this.prisma.agenciaIata.findUnique({
            where: { id_agencia_iata: id },
        });

        if (!agenciaIata) {
            throw new NotFoundException(`Agencia IATA con ID ${id} no encontrada`);
        }

        return agenciaIata;
    }

    async create(createAgenciaIataDto: CreateAgenciaIataDto) {
        return this.prisma.agenciaIata.create({
            data: createAgenciaIataDto,
        });
    }

    async update(id: number, updateAgenciaIataDto: UpdateAgenciaIataDto) {
        const agenciaIata = await this.prisma.agenciaIata.findUnique({
            where: { id_agencia_iata: id },
        });

        if (!agenciaIata) {
            throw new NotFoundException(`Agencia IATA con ID ${id} no encontrada`);
        }

        return this.prisma.agenciaIata.update({
            where: { id_agencia_iata: id },
            data: updateAgenciaIataDto,
        });
    }

    async removeMany(ids: any[]) {
        return this.prisma.agenciaIata.deleteMany({
            where: {
                id_agencia_iata: {
                    in: ids,
                },
            },
        });
    }
}
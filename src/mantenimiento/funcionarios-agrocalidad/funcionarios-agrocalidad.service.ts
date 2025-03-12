// src/mantenimiento/funcionarios-agrocalidad/funcionarios-agrocalidad.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFuncionarioAgrocalidadDto } from './dto/create-funcionario-agrocalidad.dto';
import { UpdateFuncionarioAgrocalidadDto } from './dto/update-funcionario-agrocalidad.dto';

@Injectable()
export class FuncionariosAgrocalidadService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.funcionarioAgrocalidad.findMany();
    }

    async findOne(id: number) {
        const funcionario = await this.prisma.funcionarioAgrocalidad.findUnique({
            where: { id_funcionario_agrocalidad: id },
        });

        if (!funcionario) {
            throw new NotFoundException(`Funcionario de Agrocalidad con ID ${id} no encontrado`);
        }

        return funcionario;
    }

    async create(createFuncionarioAgrocalidadDto: CreateFuncionarioAgrocalidadDto) {
        return this.prisma.funcionarioAgrocalidad.create({
            data: createFuncionarioAgrocalidadDto,
        });
    }

    async update(id: number, updateFuncionarioAgrocalidadDto: UpdateFuncionarioAgrocalidadDto) {
        const funcionario = await this.prisma.funcionarioAgrocalidad.findUnique({
            where: { id_funcionario_agrocalidad: id },
        });

        if (!funcionario) {
            throw new NotFoundException(`Funcionario de Agrocalidad con ID ${id} no encontrado`);
        }

        return this.prisma.funcionarioAgrocalidad.update({
            where: { id_funcionario_agrocalidad: id },
            data: updateFuncionarioAgrocalidadDto,
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.funcionarioAgrocalidad.deleteMany({
            where: {
                id_funcionario_agrocalidad: {
                    in: ids,
                },
            },
        });
    }
}
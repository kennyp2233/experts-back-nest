import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.cliente.findMany();
    }

    async findOne(id: number) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id_clientes: id },
        });

        if (!cliente) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }

        return cliente;
    }

    async create(createClienteDto: CreateClienteDto) {
        return this.prisma.cliente.create({
            data: createClienteDto,
        });
    }

    async update(id: number, updateClienteDto: UpdateClienteDto) {
        // Verificar si existe el cliente
        const { id_clientes, ...rest } = updateClienteDto;
        await this.findOne(id);

        return this.prisma.cliente.update({
            where: { id_clientes: id },
            data: rest,
        });
    }

    async remove(id: number) {
        // Verificar si existe el cliente
        await this.findOne(id);

        return this.prisma.cliente.delete({
            where: { id_clientes: id },
        });
    }

    async removeMany(ids: number[]) {
        // Verificar qué clientes existen
        const existingClientes = await this.prisma.cliente.findMany({
            where: {
                id_clientes: {
                    in: ids,
                },
            },
            select: {
                id_clientes: true,
            },
        });

        if (existingClientes.length === 0) {
            throw new NotFoundException('No se encontraron clientes para eliminar');
        }

        const existingIds = existingClientes.map(cliente => cliente.id_clientes);

        // Eliminar los clientes que existan
        return this.prisma.cliente.deleteMany({
            where: {
                id_clientes: {
                    in: existingIds,
                },
            },
        });
    }
}
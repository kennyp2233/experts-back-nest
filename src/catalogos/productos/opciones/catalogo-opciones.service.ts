import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCatalogoProductoOpcionesDto } from './dto/create-catalogo-opciones.dto';
import { UpdateCatalogoProductoOpcionesDto } from './dto/update-catalogo-opciones.dto';

@Injectable()
export class CatalogoProductoOpcionesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.catalogoProductoOpciones.findMany();
    }

    async findOne(id: number) {
        const catalogoProductoOpciones = await this.prisma.catalogoProductoOpciones.findUnique({
            where: { id_opcion: id },
        });

        if (!catalogoProductoOpciones) {
            throw new NotFoundException(`Catálogo Producto Opciones con ID ${id} no encontrado`);
        }

        return catalogoProductoOpciones;
    }

    async create(createCatalogoProductoOpcionesDto: CreateCatalogoProductoOpcionesDto) {
        return this.prisma.catalogoProductoOpciones.create({
            data: createCatalogoProductoOpcionesDto,
        });
    }

    async update(id: number, updateCatalogoProductoOpcionesDto: UpdateCatalogoProductoOpcionesDto) {
        const catalogoProductoOpciones = await this.prisma.catalogoProductoOpciones.findUnique({
            where: { id_opcion: id },
        });

        if (!catalogoProductoOpciones) {
            throw new NotFoundException(`Catálogo Producto Opciones con ID ${id} no encontrado`);
        }

        return this.prisma.catalogoProductoOpciones.update({
            where: { id_opcion: id },
            data: updateCatalogoProductoOpcionesDto,
        });
    }

    async remove(id: number) {
        const catalogoProductoOpciones = await this.prisma.catalogoProductoOpciones.findUnique({
            where: { id_opcion: id },
        });

        if (!catalogoProductoOpciones) {
            throw new NotFoundException(`Catálogo Producto Opciones con ID ${id} no encontrado`);
        }

        return this.prisma.catalogoProductoOpciones.delete({
            where: { id_opcion: id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.catalogoProductoOpciones.deleteMany({
            where: {
                id_opcion: {
                    in: ids,
                },
            },
        });
    }
}
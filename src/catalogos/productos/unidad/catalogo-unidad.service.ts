import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCatalogoProductoUnidadDto } from './dto/create-catalogo-unidad.dto';
import { UpdateCatalogoProductoUnidadDto } from './dto/update-catalogo-unidad.dto';

@Injectable()
export class CatalogoProductoUnidadService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.catalogoProductosUnidad.findMany();
    }

    async findOne(id: number) {
        const catalogoProductoUnidad = await this.prisma.catalogoProductosUnidad.findUnique({
            where: { id_medida: id },
        });

        if (!catalogoProductoUnidad) {
            throw new NotFoundException(`Catálogo Producto Unidad con ID ${id} no encontrado`);
        }

        return catalogoProductoUnidad;
    }

    async create(createCatalogoProductoUnidadDto: CreateCatalogoProductoUnidadDto) {
        return this.prisma.catalogoProductosUnidad.create({
            data: createCatalogoProductoUnidadDto,
        });
    }

    async update(id: number, updateCatalogoProductoUnidadDto: UpdateCatalogoProductoUnidadDto) {
        const catalogoProductoUnidad = await this.prisma.catalogoProductosUnidad.findUnique({
            where: { id_medida: id },
        });

        if (!catalogoProductoUnidad) {
            throw new NotFoundException(`Catálogo Producto Unidad con ID ${id} no encontrado`);
        }

        return this.prisma.catalogoProductosUnidad.update({
            where: { id_medida: id },
            data: updateCatalogoProductoUnidadDto,
        });
    }

    async remove(id: number) {
        const catalogoProductoUnidad = await this.prisma.catalogoProductosUnidad.findUnique({
            where: { id_medida: id },
        });

        if (!catalogoProductoUnidad) {
            throw new NotFoundException(`Catálogo Producto Unidad con ID ${id} no encontrado`);
        }

        return this.prisma.catalogoProductosUnidad.delete({
            where: { id_medida: id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.catalogoProductosUnidad.deleteMany({
            where: {
                id_medida: {
                    in: ids,
                },
            },
        });
    }
}
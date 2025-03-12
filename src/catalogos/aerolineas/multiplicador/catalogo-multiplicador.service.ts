import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCatalogoMultiplicadorDto } from './dto/create-catalogo-multiplicador.dto';
import { UpdateCatalogoMultiplicadorDto } from './dto/update-catalogo-multiplicador.dto';

@Injectable()
export class CatalogoMultiplicadorService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.catalogoMultiplicadorAerolinea.findMany();
    }

    async findOne(id: number) {
        const catalogoMultiplicador = await this.prisma.catalogoMultiplicadorAerolinea.findUnique({
            where: { id_multiplicador: id },
        });

        if (!catalogoMultiplicador) {
            throw new NotFoundException(`Catálogo Multiplicador con ID ${id} no encontrado`);
        }

        return catalogoMultiplicador;
    }

    async create(createCatalogoMultiplicadorDto: CreateCatalogoMultiplicadorDto) {
        return this.prisma.catalogoMultiplicadorAerolinea.create({
            data: createCatalogoMultiplicadorDto,
        });
    }

    async update(id: number, updateCatalogoMultiplicadorDto: UpdateCatalogoMultiplicadorDto) {
        const catalogoMultiplicador = await this.prisma.catalogoMultiplicadorAerolinea.findUnique({
            where: { id_multiplicador: id },
        });

        if (!catalogoMultiplicador) {
            throw new NotFoundException(`Catálogo Multiplicador con ID ${id} no encontrado`);
        }

        return this.prisma.catalogoMultiplicadorAerolinea.update({
            where: { id_multiplicador: id },
            data: updateCatalogoMultiplicadorDto,
        });
    }

    async remove(id: number) {
        const catalogoMultiplicador = await this.prisma.catalogoMultiplicadorAerolinea.findUnique({
            where: { id_multiplicador: id },
        });

        if (!catalogoMultiplicador) {
            throw new NotFoundException(`Catálogo Multiplicador con ID ${id} no encontrado`);
        }

        return this.prisma.catalogoMultiplicadorAerolinea.delete({
            where: { id_multiplicador: id },
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.catalogoMultiplicadorAerolinea.deleteMany({
            where: {
                id_multiplicador: {
                    in: ids,
                },
            },
        });
    }
}
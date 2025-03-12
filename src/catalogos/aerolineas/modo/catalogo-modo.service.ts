import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCatalogoModoDto } from './dto/create-catalogo-modo.dto';
import { UpdateCatalogoModoDto } from './dto/update-catalogo-modo.dto';

@Injectable()
export class CatalogoModoService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.catalogoModoAerolinea.findMany();
  }

  async findOne(id: number) {
    const catalogoModo = await this.prisma.catalogoModoAerolinea.findUnique({
      where: { id_modo: id },
    });

    if (!catalogoModo) {
      throw new NotFoundException(`Catálogo Modo con ID ${id} no encontrado`);
    }

    return catalogoModo;
  }

  async create(createCatalogoModoDto: CreateCatalogoModoDto) {
    return this.prisma.catalogoModoAerolinea.create({
      data: createCatalogoModoDto,
    });
  }

  async update(id: number, updateCatalogoModoDto: UpdateCatalogoModoDto) {
    const catalogoModo = await this.prisma.catalogoModoAerolinea.findUnique({
      where: { id_modo: id },
    });

    if (!catalogoModo) {
      throw new NotFoundException(`Catálogo Modo con ID ${id} no encontrado`);
    }

    return this.prisma.catalogoModoAerolinea.update({
      where: { id_modo: id },
      data: updateCatalogoModoDto,
    });
  }

  async remove(id: number) {
    const catalogoModo = await this.prisma.catalogoModoAerolinea.findUnique({
      where: { id_modo: id },
    });

    if (!catalogoModo) {
      throw new NotFoundException(`Catálogo Modo con ID ${id} no encontrado`);
    }

    return this.prisma.catalogoModoAerolinea.delete({
      where: { id_modo: id },
    });
  }

  async removeMany(ids: number[]) {
    return this.prisma.catalogoModoAerolinea.deleteMany({
      where: {
        id_modo: {
          in: ids,
        },
      },
    });
  }
}

// src/documentos/guia-madre/guia-madre.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateGuiaMadreDto } from './dto/create-guia-madre.dto';
import { UpdateGuiaMadreDto } from './dto/update-guia-madre.dto';
import { GuiaMadreDto } from './dto/guia-madre.dto';
import { PrestarGuiaMadreDto } from './dto/prestar-guia-madre.dto';

@Injectable()
export class GuiaMadreService {
    constructor(private prisma: PrismaService) { }

    async getGuiasMadre(): Promise<GuiaMadreDto[]> {
        return this.prisma.guiaMadre.findMany();
    }

    async getGuiaMadre(id: number): Promise<GuiaMadreDto> {
        const guiaMadre = await this.prisma.guiaMadre.findUnique({
            where: { id },
        });

        if (!guiaMadre) {
            throw new NotFoundException(`Guía madre con ID ${id} no encontrada`);
        }

        return guiaMadre;
    }

    async getGuiaMadreByAirlineId(id: number): Promise<any> {
        // Esta consulta es más compleja y requiere raw SQL en Prisma
        const rawQuery = Prisma.sql`
      SELECT gm.* FROM "GuiaMadre" gm
      JOIN "DocumentoBase" db ON gm.id_documento_base = db.id
      WHERE db.id_aerolinea = ${id}
      AND gm.prestamo = false
      AND gm.devolucion = false
      AND gm.id NOT IN (
        SELECT id_guia_madre FROM "DocumentoCoordinacion" WHERE id_guia_madre IS NOT NULL
      )
    `;

        return this.prisma.$queryRaw(rawQuery);
    }

    async createGuiaMadre(createGuiaMadreDto: CreateGuiaMadreDto): Promise<GuiaMadreDto> {
        return this.prisma.guiaMadre.create({
            data: {
                ...createGuiaMadreDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }

    async updateGuiaMadre(updateGuiaMadreDto: UpdateGuiaMadreDto): Promise<GuiaMadreDto> {
        const { id } = updateGuiaMadreDto;
        const guiaToUpdate = await this.prisma.guiaMadre.findUnique({
            where: { id },
        });

        if (!guiaToUpdate) {
            throw new NotFoundException(`Guía madre con ID ${id} no encontrada`);
        }

        return this.prisma.guiaMadre.update({
            where: { id },
            data: {
                ...updateGuiaMadreDto,
                updatedAt: new Date(),
            },
        });
    }

    async marcarComoPrestada(id: number, prestadaDto?: PrestarGuiaMadreDto): Promise<GuiaMadreDto> {
        const guiaMadre = await this.prisma.guiaMadre.findUnique({
            where: { id },
        });

        if (!guiaMadre) {
            throw new NotFoundException(`Guía madre con ID ${id} no encontrada`);
        }

        if (guiaMadre.prestamo) {
            throw new Error('La guía ya está marcada como prestada');
        }

        await this.prisma.guiaMadre.update({
            where: { id },
            data: {
                prestamo: true,
                observaciones: prestadaDto?.observaciones || '',
                fecha_prestamo: new Date().toISOString(),
            },
        });

        return this.prisma.guiaMadre.findUnique({
            where: { id },
        });
    }

    async marcarComoDevuelta(id: number): Promise<GuiaMadreDto> {
        const guiaMadre = await this.prisma.guiaMadre.findUnique({
            where: { id },
        });

        if (!guiaMadre) {
            throw new NotFoundException(`Guía madre con ID ${id} no encontrada`);
        }

        if (!guiaMadre.prestamo) {
            throw new Error('La guía no estaba prestada');
        }

        await this.prisma.guiaMadre.update({
            where: { id },
            data: {
                devolucion: true,
                fecha_devolucion: new Date().toISOString(),
            },
        });

        return this.prisma.guiaMadre.findUnique({
            where: { id },
        });
    }
}
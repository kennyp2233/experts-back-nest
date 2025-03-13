// src/documentos/documentos-base/guia-madre/guia-madre.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GuiaMadreService {
    constructor(private prisma: PrismaService) { }

    async getGuiasMadre() {
        return this.prisma.guiaMadre.findMany();
    }

    async getGuiaMadre(id: number) {
        const guiaMadre = await this.prisma.guiaMadre.findUnique({
            where: { id },
        });

        if (!guiaMadre) {
            throw new NotFoundException(`Guía madre con ID ${id} no encontrada`);
        }

        return guiaMadre;
    }

    async getGuiaMadreByAirlineId(id: number) {
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

    async createGuiaMadre(guiaMadre: any) {
        return this.prisma.guiaMadre.create({
            data: {
                ...guiaMadre,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }

    async updateGuiaMadre(guiaMadre: any) {
        const { id } = guiaMadre;
        const guiaToUpdate = await this.prisma.guiaMadre.findUnique({
            where: { id },
        });

        if (!guiaToUpdate) {
            throw new NotFoundException(`Guía madre con ID ${id} no encontrada`);
        }

        return this.prisma.guiaMadre.update({
            where: { id },
            data: {
                ...guiaMadre,
                updatedAt: new Date(),
            },
        });
    }

    async marcarComoPrestada(id: number, observaciones?: string) {
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
                observaciones: observaciones || '',
                fecha_prestamo: new Date().toISOString(),
            },
        });

        return this.prisma.guiaMadre.findUnique({
            where: { id },
        });
    }

    async marcarComoDevuelta(id: number) {
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
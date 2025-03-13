// src/documentos/documentos-base/guia-madre/guia-madre.controller.ts
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GuiaMadreService } from './guia-madre.service';

@Controller('guia_madre')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GuiaMadreController {
    constructor(private readonly guiaMadreService: GuiaMadreService) { }

    @Get()
    async findAll() {
        return this.guiaMadreService.getGuiasMadre();
    }

    @Get('aerolinea/:id')
    async findByAirlineId(@Param('id') id: string, @Query('id') queryId: string) {
        const idAerolinea = id || queryId;

        if (!idAerolinea) {
            return { message: 'Debe proporcionar un ID de aerolínea válido' };
        }

        const guiaMadre = await this.guiaMadreService.getGuiaMadreByAirlineId(Number(idAerolinea));

        if (guiaMadre) {
            return guiaMadre;
        } else {
            return { message: 'Guía Madre no encontrada' };
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.guiaMadreService.getGuiaMadre(Number(id));
    }

    @Post()
    @Roles('admin')
    async create(@Body() guiaMadre: any) {
        return this.guiaMadreService.createGuiaMadre(guiaMadre);
    }

    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() guiaMadre: any) {
        const updated = await this.guiaMadreService.updateGuiaMadre({
            id: Number(id),
            ...guiaMadre,
        });

        if (updated) {
            return updated;
        } else {
            return { message: 'Guía Madre no encontrada' };
        }
    }

    @Post(':id/prestar')
    @Roles('admin')
    async prestar(@Param('id') id: string, @Body('observaciones') observaciones?: string) {
        return this.guiaMadreService.marcarComoPrestada(Number(id), observaciones);
    }

    @Post(':id/devolver')
    @Roles('admin')
    async devolver(@Param('id') id: string) {
        return this.guiaMadreService.marcarComoDevuelta(Number(id));
    }
}
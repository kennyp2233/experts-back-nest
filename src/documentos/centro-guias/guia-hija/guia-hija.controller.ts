// src/documentos/centro-guias/guia-hija/guia-hija.controller.ts
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { GuiaHijaService } from './guia-hija.service';

@Controller('guia_hija')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GuiaHijaController {
    constructor(private readonly guiaHijaService: GuiaHijaService) { }

    @Get()
    async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
        const pageNum = page ? Number(page) : 1;
        const limitNum = limit ? Number(limit) : 10;

        const response = await this.guiaHijaService.getGuiasHijas(pageNum, limitNum);
        return response;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const guiaHija = await this.guiaHijaService.getGuiaHija(Number(id));

        if (!guiaHija) {
            return { message: 'Guía hija no encontrada' };
        }

        return guiaHija;
    }

    @Get('guia-madre/:id')
    async findByGuiaMadre(@Param('id') id: string) {
        const guiasHijas = await this.guiaHijaService.getGuiasHijasPorGuiaMadre(Number(id));
        return guiasHijas;
    }

    @Get('finca/:id')
    async findByFinca(@Param('id') id: string) {
        const guiasHijas = await this.guiaHijaService.getGuiasHijasPorFinca(Number(id));
        return guiasHijas;
    }

    @Get('verificar/:id_finca/:id_guia_madre')
    async verificar(
        @Param('id_finca') id_finca: string,
        @Param('id_guia_madre') id_guia_madre: string,
    ) {
        const guiaHija = await this.guiaHijaService.obtenerGuiaHijaPorFincaYGuiaMadre(
            Number(id_finca),
            Number(id_guia_madre),
        );

        if (!guiaHija) {
            return {
                exists: false,
                message: 'No existe guía hija para esta combinación',
            };
        }

        return { exists: true, guiaHija };
    }

    @Post('asignar')
    @Roles('admin')
    async asignar(@Body() data: { id_documento_coordinacion: number; id_finca: number }) {
        const { id_documento_coordinacion, id_finca } = data;
        const guiaHija = await this.guiaHijaService.asignarGuiaHija(id_documento_coordinacion, id_finca);
        return guiaHija;
    }

    @Post('prevalidar')
    @Roles('admin')
    async prevalidar(@Body() asignaciones: { id_documento_coordinacion: number; id_finca: number }[]) {
        return this.guiaHijaService.prevalidarAsignacionGuiasHijas(asignaciones);
    }

    @Post('confirmar')
    @Roles('admin')
    async confirmar(@Body() asignaciones: any[]) {
        return this.guiaHijaService.confirmarAsignacionGuiasHijas(asignaciones);
    }
}
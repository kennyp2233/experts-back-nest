// src/documentos/centro-guias/coordinacion/coordinacion.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CoordinacionService } from './coordinacion.service';

@Controller('asignacion')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoordinacionController {
    constructor(private readonly coordinacionService: CoordinacionService) { }

    @Get()
    async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
        const pageNum = page ? Number(page) : 1;
        const limitNum = limit ? Number(limit) : 10;

        return this.coordinacionService.getDocumentosCoordinacion(pageNum, limitNum);
    }

    @Post()
    @Roles('admin')
    async create(@Body() documentoCoordinacion: any) {
        const documento = await this.coordinacionService.createDocumentoCoordinacion(documentoCoordinacion);
        return documento;
    }

    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() documentoCoordinacion: any) {
        const documento = await this.coordinacionService.updateDocumentoCoordinacion(
            Number(id),
            documentoCoordinacion,
        );
        return documento;
    }

    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id') id: string) {
        const documento = await this.coordinacionService.deleteDocumentoCoordinacion(Number(id));
        return { message: 'Documento de coordinación eliminado', documento };
    }

    @Get('aerolineas')
    async getAerolineas() {
        const aerolineas = await this.coordinacionService.getAvailableAerolineas();
        return aerolineas;
    }
}
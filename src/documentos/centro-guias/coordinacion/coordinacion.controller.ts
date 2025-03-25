// src/documentos/centro-guias/coordinacion/coordinacion.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CoordinacionService } from './coordinacion.service';
import { DocumentoCoordinacionDto } from './dto/documento-coordinacion.dto';
import { CreateDocumentoCoordinacionDto } from './dto/create-documento-coordinacion.dto';
import { UpdateDocumentoCoordinacionDto } from './dto/update-documento-coordinacion.dto';

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

    @Get('aerolineas')
    async getAerolineas() {
        const aerolineas = await this.coordinacionService.getAvailableAerolineas();
        return aerolineas;
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        const documento = await this.coordinacionService.getDocumentoCoordinacion(+id);
        return documento;
    }

    @Post()
    @Roles('admin')
    async create(@Body() documentoCoordinacion: CreateDocumentoCoordinacionDto) {
        const documento = await this.coordinacionService.createDocumentoCoordinacion(documentoCoordinacion);
        return documento;
    }

    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() documentoCoordinacion: UpdateDocumentoCoordinacionDto) {
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


}
// src/documentos/documentos-base/documento-base.controller.ts
import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DocumentoBaseService } from './documento-base.service';

@Controller('documentos_base')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentoBaseController {
    constructor(private readonly documentoBaseService: DocumentoBaseService) { }

    @Get()
    async findAll(
        @Query('id') id?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        if (id) {
            return this.documentoBaseService.getDocumentoBase(Number(id));
        }

        const pageNum = page ? Number(page) : undefined;
        const limitNum = limit ? Number(limit) : undefined;

        return this.documentoBaseService.getGuiasBase(pageNum, limitNum);
    }

    @Post()
    @Roles('admin')
    async create(@Body() data: any) {
        await this.documentoBaseService.crearDocumentoYGuias(
            data.documento_base,
            data.n_guias,
            data.secuencial_inicial,
            data.prefijo,
        );

        return { ok: true, msg: 'Creando documento base' };
    }

    @Post('preview')
    @Roles('admin')
    async preview(@Body() data: any) {
        const response = await this.documentoBaseService.previewDocumentoBaseYGuias(
            data.documento_base,
            data.n_guias,
            data.secuencial_inicial,
            data.prefijo,
        );

        return response;
    }

    @Put()
    @Roles('admin')
    async update(@Body() documentoBase: any) {
        const documento = await this.documentoBaseService.updateDocumentoBase(documentoBase);

        if (documento) {
            return documento;
        } else {
            return { ok: false, msg: 'No se encontró el documento base' };
        }
    }
}
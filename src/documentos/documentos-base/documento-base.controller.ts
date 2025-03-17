// src/documentos/documentos-base/documento-base.controller.ts
import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
    ParseIntPipe,
    Param
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { DocumentoBaseService } from './documento-base.service';
import { CreateDocumentoGuiasDto } from './dto/create-documento-guias.dto';
import { UpdateDocumentoBaseDto } from './dto/update-documento-base.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { DocumentoBaseResponseDto } from './dto/documento-base-response.dto';
import { PreviewDocumentoGuiasResponseDto } from './dto/preview-documento-guias.dto';

@Controller('documentos_base')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentoBaseController {
    constructor(private readonly documentoBaseService: DocumentoBaseService) { }

    @Get()
    async findAll(
        @Query('id') id?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ): Promise<DocumentoBaseResponseDto | { data: DocumentoBaseResponseDto[], total: number }> {
        if (id) {
            return this.documentoBaseService.getDocumentoBase(Number(id));
        }

        const pageNum = page ? Number(page) : undefined;
        const limitNum = limit ? Number(limit) : undefined;

        return this.documentoBaseService.getGuiasBase(pageNum, limitNum);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<DocumentoBaseResponseDto> {
        return this.documentoBaseService.getDocumentoBase(id);
    }

    @Post()
    @Roles('admin')
    async create(
        @Body(ValidationPipe) createDocumentoDto: CreateDocumentoGuiasDto
    ): Promise<ApiResponse> {
        const result = await this.documentoBaseService.crearDocumentoYGuias(
            createDocumentoDto.documento_base,
            createDocumentoDto.n_guias,
            createDocumentoDto.secuencial_inicial,
            createDocumentoDto.prefijo,
        );

        return {
            ok: true,
            msg: 'Documento base y guías creados exitosamente',
            data: result
        };
    }

    @Post('preview')
    @Roles('admin')
    async preview(
        @Body(ValidationPipe) createDocumentoDto: CreateDocumentoGuiasDto
    ): Promise<PreviewDocumentoGuiasResponseDto> {
        return this.documentoBaseService.previewDocumentoBaseYGuias(
            createDocumentoDto.documento_base,
            createDocumentoDto.n_guias,
            createDocumentoDto.secuencial_inicial,
            createDocumentoDto.prefijo,
        );
    }

    @Put()
    @Roles('admin')
    async update(
        @Body(ValidationPipe) updateDocumentoBaseDto: UpdateDocumentoBaseDto
    ): Promise<ApiResponse> {
        try {
            const documento = await this.documentoBaseService.updateDocumentoBase(updateDocumentoBaseDto);
            return {
                ok: true,
                msg: 'Documento base actualizado exitosamente',
                data: documento
            };
        } catch (error) {
            return {
                ok: false,
                msg: error.message || 'Error al actualizar el documento base',
                error: error.message
            };
        }
    }

    @Post('delete')
    @Roles('admin')
    async delete(@Body() ids: number[]): Promise<ApiResponse> {
        try {
            const result = await this.documentoBaseService.deleteDocumentosBase(ids);
            return {
                ok: true,
                msg: `Se eliminaron ${result.count} documentos base exitosamente`,
                data: { count: result.count }
            };
        } catch (error) {
            return {
                ok: false,
                msg: error.message || 'Error al eliminar los documentos base',
                error: error.message
            };
        }
    }
}
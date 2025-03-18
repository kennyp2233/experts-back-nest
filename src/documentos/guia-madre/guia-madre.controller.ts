// src/documentos/guia-madre/guia-madre.controller.ts
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GuiaMadreService } from './guia-madre.service';
import { CreateGuiaMadreDto } from './dto/create-guia-madre.dto';
import { UpdateGuiaMadreDto } from './dto/update-guia-madre.dto';
import { PrestarGuiaMadreDto } from './dto/prestar-guia-madre.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

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
    async create(@Body() createGuiaMadreDto: CreateGuiaMadreDto): Promise<ApiResponse> {
        const result = await this.guiaMadreService.createGuiaMadre(createGuiaMadreDto);
        return {
            ok: true,
            msg: 'Guía madre creada exitosamente',
            data: result
        };
    }

    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() updateData: UpdateGuiaMadreDto): Promise<ApiResponse> {
        const updateGuiaMadreDto: UpdateGuiaMadreDto = {
            id: Number(id),
            ...updateData
        };

        const updated = await this.guiaMadreService.updateGuiaMadre(updateGuiaMadreDto);

        if (updated) {
            return {
                ok: true,
                msg: 'Guía madre actualizada exitosamente',
                data: updated
            };
        } else {
            return {
                ok: false,
                msg: 'Guía Madre no encontrada',
                error: 'Not found'
            };
        }
    }

    @Post(':id/prestar')
    @Roles('admin')
    async prestar(
        @Param('id') id: string,
        @Body() prestarDto: PrestarGuiaMadreDto
    ): Promise<ApiResponse> {
        try {
            const result = await this.guiaMadreService.marcarComoPrestada(Number(id), prestarDto);
            return {
                ok: true,
                msg: 'Guía madre marcada como prestada',
                data: result
            };
        } catch (error) {
            return {
                ok: false,
                msg: 'Error al marcar la guía como prestada',
                error: error.message
            };
        }
    }

    @Post(':id/devolver')
    @Roles('admin')
    async devolver(@Param('id') id: string): Promise<ApiResponse> {
        try {
            const result = await this.guiaMadreService.marcarComoDevuelta(Number(id));
            return {
                ok: true,
                msg: 'Guía madre marcada como devuelta',
                data: result
            };
        } catch (error) {
            return {
                ok: false,
                msg: 'Error al marcar la guía como devuelta',
                error: error.message
            };
        }
    }
}
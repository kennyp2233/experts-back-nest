// src/mantenimiento/aerolineas/aerolineas.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AerolineasService } from './aerolineas.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { CreateAerolineaDto } from './dto/create-aerolinea.dto';
import { UpdateAerolineaDto } from './dto/update-aerolinea.dto';
import { CreateAerolineaCompletaDto } from './dto/create-aerolinea-completa.dto';
import { UpdateAerolineaCompletaDto } from './dto/update-aerolinea-completa.dto';

@Controller('aerolineas')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AerolineasController {
    constructor(private readonly aerolineasService: AerolineasService) { }

    @Get()
    async findAll() {
        const data = await this.aerolineasService.findAll();
        return data;
    }



    @Get('joinAll')
    async findAllComplete() {
        const data = await this.aerolineasService.findAllComplete();
        return data;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.aerolineasService.findOne(+id);
        return data;
    }


    @Get('joinAll/:id')
    async findOneComplete(@Param('id') id: string) {
        const data = await this.aerolineasService.findOneComplete(+id);
        return data;
    }

    @Post()
    async create(@Body() createAerolineaDto: CreateAerolineaDto): Promise<ApiResponse> {
        const data = await this.aerolineasService.create(createAerolineaDto);
        return {
            ok: true,
            msg: 'Aerolínea creada exitosamente',
            data
        };
    }

    @Post('joinAll')
    async createCompleta(@Body() data: CreateAerolineaCompletaDto): Promise<ApiResponse> {
        const result = await this.aerolineasService.createCompleta(data);
        return {
            ok: true,
            msg: 'Aerolínea completa creada exitosamente',
            data: result
        };
    }

    @Patch()
    async update(@Body() updateAerolineaDto: UpdateAerolineaDto): Promise<ApiResponse> {
        const data = await this.aerolineasService.update(
            updateAerolineaDto.id_aerolinea,
            updateAerolineaDto
        );
        return {
            ok: true,
            msg: 'Aerolínea actualizada exitosamente',
            data
        };
    }

    @Patch('joinAll')
    async updateCompleta(@Body() data: UpdateAerolineaCompletaDto): Promise<ApiResponse> {
        const result = await this.aerolineasService.updateCompleta(data);
        return {
            ok: true,
            msg: 'Aerolínea completa actualizada exitosamente',
            data: result
        };
    }

    @Delete()
    async remove(@Body() ids: number[]): Promise<ApiResponse> {
        await this.aerolineasService.removeMany(ids);
        return {
            ok: true,
            msg: 'Aerolíneas eliminadas exitosamente',
            data: { ids }
        };
    }

    @Delete('joinAll')
    async removeCompleta(@Body() ids: number[]): Promise<ApiResponse> {
        await this.aerolineasService.removeCompleta(ids);
        return {
            ok: true,
            msg: 'Aerolíneas completas eliminadas exitosamente',
            data: { ids }
        };
    }
}
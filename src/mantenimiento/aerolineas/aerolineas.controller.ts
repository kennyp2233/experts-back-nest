// src/mantenimiento/aerolineas/aerolineas.controller.ts (parcial)
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AerolineasService } from './aerolineas.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('aerolineas')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AerolineasController {
    constructor(private readonly aerolineasService: AerolineasService) { }

    @Get()
    async findAll() {
        return this.aerolineasService.findAll();
    }

    @Get('joinAll')
    async findAllComplete() {
        return this.aerolineasService.findAllComplete();
    }

    // Otros métodos GET estándar...

    @Post()
    async create(@Body() createAerolineaDto: any) {
        return this.aerolineasService.create(createAerolineaDto);
    }

    @Post('joinAll')
    async createCompleta(@Body() data: any) {
        return this.aerolineasService.createCompleta(data);
    }

    @Patch()
    async update(@Body() updateAerolineaDto: any) {
        return this.aerolineasService.update(
            updateAerolineaDto.id_aerolinea,
            updateAerolineaDto
        );
    }

    @Patch('joinAll')
    async updateCompleta(@Body() data: any) {
        return this.aerolineasService.updateCompleta(data);
    }

    @Delete()
    async remove(@Body() ids: number[]) {
        return this.aerolineasService.removeMany(ids);
    }

    @Delete('joinAll')
    async removeCompleta(@Body() ids: number[]) {
        return this.aerolineasService.removeCompleta(ids);
    }
}
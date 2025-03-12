// src/mantenimiento/agencias-iata/agencias-iata.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    ParseIntPipe,
    Query
} from '@nestjs/common';
import { AgenciasIataService } from './agencias-iata.service';
import { CreateAgenciaIataDto } from './dto/create-agencia-iata.dto';
import { UpdateAgenciaIataDto } from './dto/update-agencia-iata.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('agencias_iata')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AgenciasIataController {
    constructor(private readonly agenciasIataService: AgenciasIataService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.agenciasIataService.findOne(+id);
        }
        return this.agenciasIataService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.agenciasIataService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createAgenciaIataDto: CreateAgenciaIataDto) {
        await this.agenciasIataService.create(createAgenciaIataDto);
        return {
            ok: true,
            msg: 'Creando agencia IATA'
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateAgenciaIataDto: UpdateAgenciaIataDto) {
        await this.agenciasIataService.update(updateAgenciaIataDto.id_agencia_iata, updateAgenciaIataDto);
        return {
            ok: true,
            msg: 'Actualizando agencia IATA'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: any[]) {
        await this.agenciasIataService.removeMany(ids);
        return {
            ok: true,
            msg: 'Eliminando agencias IATA'
        };
    }
}
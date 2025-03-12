// src/mantenimiento/subagencias/subagencias.controller.ts
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
import { SubAgenciasService } from './subagencias.service';
import { CreateSubAgenciaDto } from './dto/create-subagencia.dto';
import { UpdateSubAgenciaDto } from './dto/update-subagencia.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('subagencias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubAgenciasController {
    constructor(private readonly subAgenciasService: SubAgenciasService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.subAgenciasService.findOne(+id);
        }
        return this.subAgenciasService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.subAgenciasService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createSubAgenciaDto: CreateSubAgenciaDto) {
        await this.subAgenciasService.create(createSubAgenciaDto);
        return {
            ok: true,
            msg: 'Creando subagencia'
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateSubAgenciaDto: UpdateSubAgenciaDto) {
        await this.subAgenciasService.update(updateSubAgenciaDto.id_subagencia, updateSubAgenciaDto);
        return {
            ok: true,
            msg: 'Actualizando subagencia'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.subAgenciasService.removeMany(ids);
        return {
            ok: true,
            msg: 'Eliminando subagencias'
        };
    }
}
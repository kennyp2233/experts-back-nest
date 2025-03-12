// src/mantenimiento/funcionarios-agrocalidad/funcionarios-agrocalidad.controller.ts
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
import { FuncionariosAgrocalidadService } from './funcionarios-agrocalidad.service';
import { CreateFuncionarioAgrocalidadDto } from './dto/create-funcionario-agrocalidad.dto';
import { UpdateFuncionarioAgrocalidadDto } from './dto/update-funcionario-agrocalidad.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('funcionarios_agrocalidad')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FuncionariosAgrocalidadController {
    constructor(private readonly funcionariosAgrocalidadService: FuncionariosAgrocalidadService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.funcionariosAgrocalidadService.findOne(+id);
        }
        return this.funcionariosAgrocalidadService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.funcionariosAgrocalidadService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createFuncionarioAgrocalidadDto: CreateFuncionarioAgrocalidadDto) {
        await this.funcionariosAgrocalidadService.create(createFuncionarioAgrocalidadDto);
        return {
            ok: true,
            msg: 'Creando funcionario de Agrocalidad'
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateFuncionarioAgrocalidadDto: UpdateFuncionarioAgrocalidadDto) {
        await this.funcionariosAgrocalidadService.update(
            updateFuncionarioAgrocalidadDto.id_funcionario_agrocalidad,
            updateFuncionarioAgrocalidadDto
        );
        return {
            ok: true,
            msg: 'Actualizando funcionario de Agrocalidad'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.funcionariosAgrocalidadService.removeMany(ids);
        return {
            ok: true,
            msg: 'Eliminando funcionarios de Agrocalidad'
        };
    }
}
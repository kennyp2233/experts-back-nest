// src/mantenimiento/paises/paises.controller.ts
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
import { PaisesService } from './paises.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('paises')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaisesController {
    constructor(private readonly paisesService: PaisesService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.paisesService.findOne(+id);
        }
        return this.paisesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.paisesService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createPaisDto: CreatePaisDto) {
        const pais = await this.paisesService.create(createPaisDto);
        return {
            ok: true,
            msg: 'Pais creado',
            pais
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updatePaisDto: UpdatePaisDto) {
        await this.paisesService.update(updatePaisDto.id_pais, updatePaisDto);
        return {
            ok: true,
            msg: 'Pais actualizado'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.paisesService.removeMany(ids);
        return {
            ok: true,
            msg: 'Pais eliminado'
        };
    }
}
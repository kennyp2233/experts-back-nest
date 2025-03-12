// src/mantenimiento/bodegueros/bodegueros.controller.ts
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
import { BodeguerosService } from './bodegueros.service';
import { CreateBodegueroDto } from './dto/create-bodeguero.dto';
import { UpdateBodegueroDto } from './dto/update-bodeguero.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('bodeguero')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BodeguerosController {
    constructor(private readonly bodeguerosService: BodeguerosService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.bodeguerosService.findOne(+id);
        }
        return this.bodeguerosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bodeguerosService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createBodegueroDto: CreateBodegueroDto) {
        await this.bodeguerosService.create(createBodegueroDto);
        return {
            ok: true,
            msg: 'Creando bodeguero'
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateBodegueroDto: UpdateBodegueroDto) {
        await this.bodeguerosService.update(updateBodegueroDto.id_bodeguero, updateBodegueroDto);
        return {
            ok: true,
            msg: 'Actualizando bodeguero'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: any[]) {
        await this.bodeguerosService.removeMany(ids);
        return {
            ok: true,
            msg: 'Eliminando bodegueros'
        };
    }
}
// src/mantenimiento/origenes/origenes.controller.ts
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
import { OrigenesService } from './origenes.service';
import { CreateOrigenDto } from './dto/create-origen.dto';
import { UpdateOrigenDto } from './dto/update-origen.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('origenes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrigenesController {
    constructor(private readonly origenesService: OrigenesService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.origenesService.findOne(+id);
        }
        return this.origenesService.findAll();
    }

    @Get('paises-aduanas')
    async getPaisesAduanas() {
        return this.origenesService.origenJoinPaisesAduanas();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.origenesService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createOrigenDto: CreateOrigenDto) {
        await this.origenesService.create(createOrigenDto);
        return { ok: true, msg: 'Origen creado' };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateOrigenDto: UpdateOrigenDto) {
        await this.origenesService.update(updateOrigenDto.id_origen, updateOrigenDto);
        return { ok: true, msg: 'Origen actualizado' };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.origenesService.removeMany(ids);
        return { ok: true, msg: 'Orígenes eliminados' };
    }
}
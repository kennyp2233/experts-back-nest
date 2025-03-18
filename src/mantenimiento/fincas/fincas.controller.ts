import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FincasService } from './fincas.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';

@Controller('fincas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FincasController {
    constructor(private readonly fincasService: FincasService) { }

    @Get()
    findAll() {
        return this.fincasService.findAll();
    }

    @Get('fincasJoinAll')
    findAllWithRelations() {
        return this.fincasService.findAllWithRelations();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.fincasService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createFincaDto: CreateFincaDto) {
        const finca = await this.fincasService.create(createFincaDto);
        return {
            ok: true,
            msg: 'Finca creada',
            finca
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateFincaDto: UpdateFincaDto) {
        const finca = await this.fincasService.update(updateFincaDto);
        return {
            ok: true,
            msg: 'Finca actualizada',
            finca
        };
    }

    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.fincasService.remove(id);
        return {
            ok: true,
            msg: 'Finca eliminada'
        };
    }

    @Delete()
    @Roles('admin')
    async removeMany(@Body() ids: number[]) {
        await this.fincasService.removeMany(ids);
        return {
            ok: true,
            msg: 'Fincas eliminadas'
        };
    }
}
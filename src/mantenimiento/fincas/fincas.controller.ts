import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FincasService } from './fincas.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

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
    create(@Body() fincaData: any) {
        const finca = this.fincasService.create(fincaData);
        return {
            ok: true,
            msg: 'Finca creada',
            finca
        };
    }

    @Put()
    @Roles('admin')
    update(@Body() fincaData: any) {
        const finca = this.fincasService.update(fincaData);
        return {
            ok: true,
            msg: 'Finca actualizada',
            finca
        };

    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number) {
        const finca = this.fincasService.remove(id);
        return {
            ok: true,
            msg: 'Finca eliminada',
            finca
        };
    }

    @Delete()
    @Roles('admin')
    removeMany(@Body() ids: number[]) {
        const finca = this.fincasService.removeMany(ids);
        return {
            ok: true,
            msg: 'Fincas eliminadas',
            finca
        };
    }
}
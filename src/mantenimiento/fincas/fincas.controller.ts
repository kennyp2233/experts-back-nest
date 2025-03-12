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
        return this.fincasService.create(fincaData);
    }

    @Put()
    @Roles('admin')
    update(@Body() fincaData: any) {
        return this.fincasService.update(fincaData);
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.fincasService.remove(id);
    }

    @Delete()
    @Roles('admin')
    removeMany(@Body() ids: number[]) {
        return this.fincasService.removeMany(ids);
    }
}
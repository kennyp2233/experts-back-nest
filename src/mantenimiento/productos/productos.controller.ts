import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    @Post()
    @Roles('admin')
    create(@Body() producto: any) {
        return this.productosService.create(producto);
    }

    @Get()
    findAll(@Query('id') id?: string) {
        if (id) {
            return this.productosService.findOne(+id);
        }
        return this.productosService.findAll();
    }

    @Get('productosJoinAll')
    findAllCompleto() {
        return this.productosService.findAllCompleto();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productosService.findOne(id);
    }

    @Put()
    @Roles('admin')
    update(@Body() producto: any) {
        return this.productosService.update(producto);
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productosService.remove(id);
    }

    @Delete()
    @Roles('admin')
    removeMany(@Body() ids: number[]) {
        return this.productosService.removeMany(ids);
    }
}
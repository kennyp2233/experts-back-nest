import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    @Post()
    @Roles('admin')
    async create(@Body() producto: CreateProductoDto) {
        const data = await this.productosService.create(producto);
        return {
            ok: true,
            msg: 'Producto creado exitosamente',
            data
        };
    }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            const data = await this.productosService.findOne(+id);
            return data;
        }
        const data = await this.productosService.findAll();
        return data;
    }

    @Get('productosJoinAll')
    async findAllCompleto() {
        const data = await this.productosService.findAllCompleto();
        return data;
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.productosService.findOne(id);
        return {
            ok: true,
            data
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() producto: UpdateProductoDto) {
        const data = await this.productosService.update(producto);
        return {
            ok: true,
            msg: 'Producto actualizado exitosamente',
            data
        };
    }

    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return {
            ok: true,
            msg: 'Producto eliminado exitosamente'
        };
    }

    @Delete()
    @Roles('admin')
    async removeMany(@Body() ids: number[]) {
        await this.productosService.removeMany(ids);
        return {
            ok: true,
            msg: 'Productos eliminados exitosamente'
        };
    }
}
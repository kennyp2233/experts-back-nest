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
    Query,
} from '@nestjs/common';
import { CatalogoProductoUnidadService } from './catalogo-unidad.service';
import { CreateCatalogoProductoUnidadDto } from './dto/create-catalogo-unidad.dto';
import { UpdateCatalogoProductoUnidadDto } from './dto/update-catalogo-unidad.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/productos/unidad')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CatalogoUnidadController {
    constructor(private readonly catalogoUnidadService: CatalogoProductoUnidadService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.catalogoUnidadService.findOne(+id);
        }
        return this.catalogoUnidadService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catalogoUnidadService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createCatalogoUnidadDto: CreateCatalogoProductoUnidadDto) {
        await this.catalogoUnidadService.create(createCatalogoUnidadDto);
        return {
            ok: true,
            msg: 'Catálogo Unidad de Producto creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateCatalogoUnidadDto: UpdateCatalogoProductoUnidadDto) {
        await this.catalogoUnidadService.update(
            updateCatalogoUnidadDto.id_medida,
            updateCatalogoUnidadDto,
        );
        return {
            ok: true,
            msg: 'Catálogo Unidad de Producto actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.catalogoUnidadService.removeMany(ids);
        return {
            ok: true,
            msg: 'Catálogos Unidad de Producto eliminados',
        };
    }
}
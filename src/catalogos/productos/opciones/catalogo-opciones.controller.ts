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
import { CatalogoProductoOpcionesService } from './catalogo-opciones.service';
import { CreateCatalogoProductoOpcionesDto } from './dto/create-catalogo-opciones.dto';
import { UpdateCatalogoProductoOpcionesDto } from './dto/update-catalogo-opciones.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/productos/opciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CatalogoOpcionesController {
    constructor(private readonly catalogoOpcionesService: CatalogoProductoOpcionesService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.catalogoOpcionesService.findOne(+id);
        }
        return this.catalogoOpcionesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catalogoOpcionesService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createCatalogoOpcionesDto: CreateCatalogoProductoOpcionesDto) {
        await this.catalogoOpcionesService.create(createCatalogoOpcionesDto);
        return {
            ok: true,
            msg: 'Catálogo Opciones de Producto creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateCatalogoOpcionesDto: UpdateCatalogoProductoOpcionesDto) {
        await this.catalogoOpcionesService.update(
            updateCatalogoOpcionesDto.id_opcion,
            updateCatalogoOpcionesDto,
        );
        return {
            ok: true,
            msg: 'Catálogo Opciones de Producto actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.catalogoOpcionesService.removeMany(ids);
        return {
            ok: true,
            msg: 'Catálogos Opciones de Producto eliminados',
        };
    }
}
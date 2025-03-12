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
import { CatalogoMultiplicadorService } from './catalogo-multiplicador.service';
import { CreateCatalogoMultiplicadorDto } from './dto/create-catalogo-multiplicador.dto';
import { UpdateCatalogoMultiplicadorDto } from './dto/update-catalogo-multiplicador.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/aerolineas/multiplicador')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CatalogoMultiplicadorController {
    constructor(private readonly catalogoMultiplicadorService: CatalogoMultiplicadorService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.catalogoMultiplicadorService.findOne(+id);
        }
        return this.catalogoMultiplicadorService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catalogoMultiplicadorService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createCatalogoMultiplicadorDto: CreateCatalogoMultiplicadorDto) {
        await this.catalogoMultiplicadorService.create(createCatalogoMultiplicadorDto);
        return {
            ok: true,
            msg: 'Catálogo Multiplicador creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateCatalogoMultiplicadorDto: UpdateCatalogoMultiplicadorDto) {
        await this.catalogoMultiplicadorService.update(
            updateCatalogoMultiplicadorDto.id_multiplicador,
            updateCatalogoMultiplicadorDto,
        );
        return {
            ok: true,
            msg: 'Catálogo Multiplicador actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.catalogoMultiplicadorService.removeMany(ids);
        return {
            ok: true,
            msg: 'Catálogos Multiplicador eliminados',
        };
    }
}
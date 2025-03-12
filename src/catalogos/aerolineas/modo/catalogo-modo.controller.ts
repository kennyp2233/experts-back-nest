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
import { CatalogoModoService } from './catalogo-modo.service';
import { CreateCatalogoModoDto } from './dto/create-catalogo-modo.dto';
import { UpdateCatalogoModoDto } from './dto/update-catalogo-modo.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/aerolineas/modo')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CatalogoModoController {
    constructor(private readonly catalogoModoService: CatalogoModoService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.catalogoModoService.findOne(+id);
        }
        return this.catalogoModoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catalogoModoService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createCatalogoModoDto: CreateCatalogoModoDto) {
        await this.catalogoModoService.create(createCatalogoModoDto);
        return {
            ok: true,
            msg: 'Catálogo Modo creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateCatalogoModoDto: UpdateCatalogoModoDto) {
        await this.catalogoModoService.update(
            updateCatalogoModoDto.id_modo,
            updateCatalogoModoDto,
        );
        return {
            ok: true,
            msg: 'Catálogo Modo actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.catalogoModoService.removeMany(ids);
        return {
            ok: true,
            msg: 'Catálogos Modo eliminados',
        };
    }
}
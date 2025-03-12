// src/mantenimiento/embarcadores/embarcadores.controller.ts
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
import { EmbarcadoresService } from './embarcadores.service';
import { CreateEmbarcadorDto } from './dto/create-embarcador.dto';
import { UpdateEmbarcadorDto } from './dto/update-embarcador.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('embarcadores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmbarcadoresController {
    constructor(private readonly embarcadoresService: EmbarcadoresService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.embarcadoresService.findOne(+id);
        }
        return this.embarcadoresService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.embarcadoresService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createEmbarcadorDto: CreateEmbarcadorDto) {
        const embarcador = await this.embarcadoresService.create(createEmbarcadorDto);
        return {
            ok: true,
            msg: 'Embarcador creado',
            embarcador
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateEmbarcadorDto: UpdateEmbarcadorDto) {
        await this.embarcadoresService.update(updateEmbarcadorDto.id_embarcador, updateEmbarcadorDto);
        return { ok: true, msg: 'Embarcador actualizado' };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.embarcadoresService.removeMany(ids);
        return { ok: true, msg: 'Embarcador eliminado' };
    }
}
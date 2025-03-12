// src/mantenimiento/tipos-embarque/tipos-embarque.controller.ts
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
import { TiposEmbarqueService } from './tipos-embarque.service';
import { CreateTipoEmbarqueDto } from './dto/create-tipo-embarque.dto';
import { UpdateTipoEmbarqueDto } from './dto/update-tipo-embarque.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('tipos_embarque')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TiposEmbarqueController {
    constructor(private readonly tiposEmbarqueService: TiposEmbarqueService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.tiposEmbarqueService.findOne(+id);
        }
        return this.tiposEmbarqueService.getTiposEmbarqueJoinAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tiposEmbarqueService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createTipoEmbarqueDto: CreateTipoEmbarqueDto) {
        const tipoEmbarque = await this.tiposEmbarqueService.create(createTipoEmbarqueDto);
        return {
            ok: true,
            msg: 'Tipo de embarque creado',
            tipoEmbarque
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateTipoEmbarqueDto: UpdateTipoEmbarqueDto) {
        await this.tiposEmbarqueService.update(updateTipoEmbarqueDto.id_tipo_embarque, updateTipoEmbarqueDto);
        return {
            ok: true,
            msg: 'Tipo de embarque actualizado'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.tiposEmbarqueService.removeMany(ids);
        return {
            ok: true,
            msg: 'Tipo de embarque eliminado'
        };
    }

    @Delete(':id')
    @Roles('admin')
    async removeOne(@Param('id', ParseIntPipe) id: number) {
        await this.tiposEmbarqueService.remove(id);
        return {
            ok: true,
            msg: 'Tipo de embarque eliminado'
        };
    }
}
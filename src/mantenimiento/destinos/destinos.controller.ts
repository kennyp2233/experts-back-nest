// src/mantenimiento/destinos/destinos.controller.ts
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
import { DestinosService } from './destinos.service';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('destinos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DestinosController {
    constructor(private readonly destinosService: DestinosService) { }

    @Get()
    async findAll(@Query('id_destino') id?: string) {
        if (id) {
            return this.destinosService.findOne(+id);
        }
        return this.destinosService.findAll();
    }

    @Get('paises')
    async getPaises() {
        return this.destinosService.getDestinosJoinPais();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.destinosService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createDestinoDto: CreateDestinoDto) {
        await this.destinosService.create(createDestinoDto);
        return { ok: true, msg: 'Destino creado' };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateDestinoDto: UpdateDestinoDto) {
        await this.destinosService.update(updateDestinoDto.id_destino, updateDestinoDto);
        return { ok: true, msg: 'Destino actualizado' };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.destinosService.removeMany(ids);
        return { ok: true, msg: 'Destinos eliminados' };
    }
}
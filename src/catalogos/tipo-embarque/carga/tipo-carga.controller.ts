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
import { TipoCargaService } from './tipo-carga.service';
import { CreateTipoCargaDto } from './dto/create-tipo-carga.dto';
import { UpdateTipoCargaDto } from './dto/update-tipo-carga.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/tipos-embarque/carga')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TipoCargaController {
    constructor(private readonly tipoCargaService: TipoCargaService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.tipoCargaService.findOne(+id);
        }
        return this.tipoCargaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tipoCargaService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createTipoCargaDto: CreateTipoCargaDto) {
        await this.tipoCargaService.create(createTipoCargaDto);
        return {
            ok: true,
            msg: 'Tipo Carga creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateTipoCargaDto: UpdateTipoCargaDto) {
        await this.tipoCargaService.update(
            updateTipoCargaDto.id_tipo_carga,
            updateTipoCargaDto,
        );
        return {
            ok: true,
            msg: 'Tipo Carga actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.tipoCargaService.removeMany(ids);
        return {
            ok: true,
            msg: 'Tipos Carga eliminados',
        };
    }
}
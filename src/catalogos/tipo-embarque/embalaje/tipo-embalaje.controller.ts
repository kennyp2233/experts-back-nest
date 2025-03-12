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
import { TipoEmbalajeService } from './tipo-embalaje.service';
import { CreateTipoEmbalajeDto } from './dto/create-tipo-embalaje.dto';
import { UpdateTipoEmbalajeDto } from './dto/update-tipo-embalaje.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/tipos-embarque/embalaje')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TipoEmbalajeController {
    constructor(private readonly tipoEmbalajeService: TipoEmbalajeService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.tipoEmbalajeService.findOne(+id);
        }
        return this.tipoEmbalajeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tipoEmbalajeService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createTipoEmbalajeDto: CreateTipoEmbalajeDto) {
        await this.tipoEmbalajeService.create(createTipoEmbalajeDto);
        return {
            ok: true,
            msg: 'Tipo Embalaje creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateTipoEmbalajeDto: UpdateTipoEmbalajeDto) {
        await this.tipoEmbalajeService.update(
            updateTipoEmbalajeDto.id_tipo_embalaje,
            updateTipoEmbalajeDto,
        );
        return {
            ok: true,
            msg: 'Tipo Embalaje actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.tipoEmbalajeService.removeMany(ids);
        return {
            ok: true,
            msg: 'Tipos Embalaje eliminados',
        };
    }
}
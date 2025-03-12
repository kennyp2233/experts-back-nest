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
import { TipoDocumentoService } from './tipo-documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/tipo-documento')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TipoDocumentoController {
    constructor(private readonly tipoDocumentoService: TipoDocumentoService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.tipoDocumentoService.findOne(+id);
        }
        return this.tipoDocumentoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tipoDocumentoService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createTipoDocumentoDto: CreateTipoDocumentoDto) {
        await this.tipoDocumentoService.create(createTipoDocumentoDto);
        return {
            ok: true,
            msg: 'Tipo Documento creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
        await this.tipoDocumentoService.update(
            updateTipoDocumentoDto.id_tipo_documento,
            updateTipoDocumentoDto,
        );
        return {
            ok: true,
            msg: 'Tipo Documento actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.tipoDocumentoService.removeMany(ids);
        return {
            ok: true,
            msg: 'Tipos Documento eliminados',
        };
    }
}
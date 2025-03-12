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
import { DocumentoBaseStockService } from './documento-base-stock.service';
import { CreateDocumentoBaseStockDto } from './dto/create-documento-base-stock.dto';
import { UpdateDocumentoBaseStockDto } from './dto/update-documento-base-stock.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('catalogos/documento-base/stock')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentoBaseStockController {
    constructor(private readonly documentoBaseStockService: DocumentoBaseStockService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.documentoBaseStockService.findOne(+id);
        }
        return this.documentoBaseStockService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.documentoBaseStockService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createDocumentoBaseStockDto: CreateDocumentoBaseStockDto) {
        await this.documentoBaseStockService.create(createDocumentoBaseStockDto);
        return {
            ok: true,
            msg: 'Documento Base Stock creado',
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateDocumentoBaseStockDto: UpdateDocumentoBaseStockDto) {
        await this.documentoBaseStockService.update(
            updateDocumentoBaseStockDto.id,
            updateDocumentoBaseStockDto,
        );
        return {
            ok: true,
            msg: 'Documento Base Stock actualizado',
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.documentoBaseStockService.removeMany(ids);
        return {
            ok: true,
            msg: 'Documentos Base Stock eliminados',
        };
    }
}
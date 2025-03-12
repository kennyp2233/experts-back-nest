// src/mantenimiento/acuerdos-arancelarios/acuerdos-arancelarios.controller.ts
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
import { AcuerdosArancelariosService } from './acuerdos-arancelarios.service';
import { CreateAcuerdoArancelarioDto } from './dto/create-acuerdo-arancelario.dto';
import { UpdateAcuerdoArancelarioDto } from './dto/update-acuerdo-arancelario.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('acuerdos_arancelarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AcuerdosArancelariosController {
    constructor(private readonly acuerdosArancelariosService: AcuerdosArancelariosService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.acuerdosArancelariosService.findOne(+id);
        }
        return this.acuerdosArancelariosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.acuerdosArancelariosService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createAcuerdoArancelarioDto: CreateAcuerdoArancelarioDto) {
        await this.acuerdosArancelariosService.create(createAcuerdoArancelarioDto);
        return {
            message: 'Acuerdo arancelario creado con éxito'
        };
    }
}
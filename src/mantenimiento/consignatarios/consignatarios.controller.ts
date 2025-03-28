// src/mantenimiento/consignatarios/consignatarios.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    ParseIntPipe
} from '@nestjs/common';
import { ConsignatariosService } from './consignatarios.service';
import { CreateConsignatarioDto } from './dto/create-consignatario.dto';
import { UpdateConsignatarioDto } from './dto/update-consignatario.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('consignatarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConsignatariosController {
    constructor(private readonly consignatariosService: ConsignatariosService) { }

    @Get()
    findAll() {
        return this.consignatariosService.findAll();
    }


    @Post()
    @Roles('admin')
    async create(@Body() createConsignatarioDto: CreateConsignatarioDto) {
        await this.consignatariosService.create(createConsignatarioDto);
        return { ok: true, message: 'Consignatario creado' };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateConsignatarioDto: UpdateConsignatarioDto) {
        const id = updateConsignatarioDto.id_consignatario;
        await this.consignatariosService.update(id, updateConsignatarioDto);
        return { ok: true, message: 'Consignatario actualizado' };
    }

    @Delete()
    @Roles('admin')
    remove(@Body() ids: number[]) {
        return this.consignatariosService.removeMany(ids);
    }
}
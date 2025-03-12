// src/mantenimiento/choferes/choferes.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    ParseIntPipe
} from '@nestjs/common';
import { ChoferesService } from './choferes.service';
import { CreateChoferDto } from './dto/create-chofer.dto';
import { UpdateChoferDto } from './dto/update-chofer.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('choferes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChoferesController {
    constructor(private readonly choferesService: ChoferesService) { }

    @Get()
    async findAll() {
        return this.choferesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.choferesService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createChoferDto: CreateChoferDto) {
        await this.choferesService.create(createChoferDto);
        return {
            ok: true,
            msg: 'Chofer creado'
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateChoferDto: UpdateChoferDto) {
        await this.choferesService.update(updateChoferDto.id_chofer, updateChoferDto);
        return {
            ok: true,
            msg: 'Chofer actualizado'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.choferesService.removeMany(ids);
        return {
            ok: true,
            msg: 'Choferes eliminados'
        };
    }
}
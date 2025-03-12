// src/mantenimiento/cae-aduanas/cae-aduanas.controller.ts
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
import { CaeAduanasService } from './cae-aduanas.service';
import { CreateCaeAduanaDto } from './dto/create-cae-aduana.dto';
import { UpdateCaeAduanaDto } from './dto/update-cae-aduana.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('aduanas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CaeAduanasController {
    constructor(private readonly caeAduanasService: CaeAduanasService) { }

    @Get()
    async findAll(@Query('id') id?: string) {
        if (id) {
            return this.caeAduanasService.findOne(+id);
        }
        return this.caeAduanasService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.caeAduanasService.findOne(id);
    }

    @Post()
    @Roles('admin')
    async create(@Body() createCaeAduanaDto: CreateCaeAduanaDto) {
        const resultado = await this.caeAduanasService.create(createCaeAduanaDto);
        return {
            ok: true,
            msg: 'Aduana creada',
            resultado
        };
    }

    @Put()
    @Roles('admin')
    async update(@Body() updateCaeAduanaDto: UpdateCaeAduanaDto) {
        await this.caeAduanasService.update(updateCaeAduanaDto.id_cae_aduana, updateCaeAduanaDto);
        return {
            ok: true,
            msg: 'Aduana actualizada'
        };
    }

    @Delete()
    @Roles('admin')
    async remove(@Body() ids: number[]) {
        await this.caeAduanasService.removeMany(ids);
        return {
            ok: true,
            msg: 'Aduanas eliminadas'
        };
    }
}
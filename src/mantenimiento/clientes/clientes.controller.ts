import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    @Post()
    @Roles('admin')
    async create(@Body() createClienteDto: CreateClienteDto) {
        await this.clientesService.create(createClienteDto);
        return {
            ok: true,
            msg: 'Cliente creado con éxito',
        };
    }

    @Get()
    findAll(@Query('id_clientes') id?: string) {
        if (id) {
            return this.clientesService.findOne(+id);
        }
        return this.clientesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clientesService.findOne(id);
    }

    @Patch()
    @Roles('admin')
    async update(
        @Body() updateClienteDto: UpdateClienteDto,
    ) {
        if (!updateClienteDto.id_clientes) {
            throw new BadRequestException('El ID del cliente es requerido en el body.');
        }

        await this.clientesService.update(updateClienteDto.id_clientes, updateClienteDto);
        return {
            ok: true,
            msg: 'Cliente actualizado con éxito',
        };
    }


    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.clientesService.remove(id);
        return {
            ok: true,
            msg: 'Cliente eliminado con éxito',
        };
    }

    @Delete()
    @Roles('admin')
    async removeMany(@Body() ids: number[]) {
        await this.clientesService.removeMany(ids);
        return {
            ok: true,
            msg: 'Clientes eliminados con éxito',
        };
    }
}
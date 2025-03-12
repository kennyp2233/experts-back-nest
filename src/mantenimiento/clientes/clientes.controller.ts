import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
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
    create(@Body() createClienteDto: CreateClienteDto) {
        return this.clientesService.create(createClienteDto);
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

    @Patch(':id')
    @Roles('admin')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateClienteDto: UpdateClienteDto,
    ) {
        return this.clientesService.update(id, updateClienteDto);
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.clientesService.remove(id);
    }

    @Delete()
    @Roles('admin')
    removeMany(@Body() ids: number[]) {
        return this.clientesService.removeMany(ids);
    }
}
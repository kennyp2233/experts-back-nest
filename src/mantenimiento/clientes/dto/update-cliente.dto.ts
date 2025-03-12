import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsInt } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    @IsInt()
    id_clientes: number;
}
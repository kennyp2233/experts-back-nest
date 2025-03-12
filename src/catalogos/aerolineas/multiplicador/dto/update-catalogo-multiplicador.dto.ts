import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoMultiplicadorDto } from './create-catalogo-multiplicador.dto';
import { IsInt } from 'class-validator';

export class UpdateCatalogoMultiplicadorDto extends PartialType(CreateCatalogoMultiplicadorDto) {
    @IsInt()
    id_multiplicador: number;
}
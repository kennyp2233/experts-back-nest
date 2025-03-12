import { IsString } from 'class-validator';

export class CreateCatalogoMultiplicadorDto {
    @IsString()
    nombre: string;
}
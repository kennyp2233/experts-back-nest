import { IsString } from 'class-validator';

export class CreateTipoDocumentoDto {
    @IsString()
    nombre: string;
}
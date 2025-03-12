import { IsString, IsOptional } from 'class-validator';

export class CreateDocumentoBaseStockDto {
    @IsString()
    @IsOptional()
    nombre?: string;
}
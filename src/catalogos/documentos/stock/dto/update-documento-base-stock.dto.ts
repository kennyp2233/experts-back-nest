import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoBaseStockDto } from './create-documento-base-stock.dto';
import { IsInt } from 'class-validator';

export class UpdateDocumentoBaseStockDto extends PartialType(CreateDocumentoBaseStockDto) {
    @IsInt()
    id: number;
}
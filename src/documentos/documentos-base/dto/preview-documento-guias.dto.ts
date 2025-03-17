// src/documentos/documentos-base/dto/preview-documento-guias.dto.ts
export class PreviewDocumentoGuiasResponseDto {
    id: number;
    fecha: Date;
    id_aerolinea?: number;
    id_referencia?: number;
    id_stock?: number;
    createdAt: Date;
    updatedAt: Date;
    
    guias_madre: Array<{
        id_documento_base: number;
        prefijo: number;
        secuencial: number;
    }>;
}
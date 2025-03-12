// src/usuarios/dto/assign-role.dto.ts
import { IsString, IsUUID, IsIn } from 'class-validator';

export class AssignRoleDto {
    @IsUUID()
    id_usuario: string;

    @IsString()
    @IsIn(['admin', 'cliente', 'finca', 'pendiente'])
    role: string;
}
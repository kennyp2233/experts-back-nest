// src/usuarios/roles.controller.ts
import { Controller, Post, Body, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post('assign')
    @Roles('admin')
    assignRole(@Body() assignRoleDto: AssignRoleDto) {
        return this.rolesService.assignRole(
            assignRoleDto.id_usuario,
            assignRoleDto.role
        );
    }

    @Delete(':userId/:role')
    @Roles('admin')
    removeRole(
        @Param('userId') userId: string,
        @Param('role') role: string
    ) {
        return this.rolesService.removeRole(userId, role);
    }

    @Get(':userId')
    getUserRoles(@Param('userId') userId: string) {
        return this.rolesService.getUserRoles(userId);
    }
}
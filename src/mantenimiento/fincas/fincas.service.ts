import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';
import { FincaDto } from './dto/finca.dto';

@Injectable()
export class FincasService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.finca.findMany();
    }

    async findAllWithRelations() {
        return this.prisma.finca.findMany({
            include: {
                tipo_documento: true,
                fincas_choferes: {
                    include: {
                        chofer: true,
                    },
                },
                fincas_productos: {
                    include: {
                        producto: true,
                    },
                },
            },
            orderBy: {
                nombre_finca: 'asc',
            },
        });
    }

    async findOne(id: number) {
        const finca = await this.prisma.finca.findUnique({
            where: { id_finca: id },
            include: {
                tipo_documento: true,
                fincas_choferes: {
                    include: {
                        chofer: true,
                    },
                },
                fincas_productos: {
                    include: {
                        producto: true,
                    },
                },
            },
        });

        if (!finca) {
            throw new NotFoundException(`Finca con ID ${id} no encontrada`);
        }

        return finca;
    }

    async create(createFincaDto: CreateFincaDto) {
        return this.prisma.$transaction(async (prisma) => {
            try {
                const fincaBase = this.extraerFincaData(createFincaDto);
                const choferesData = createFincaDto.fincas_choferes || [];
                const productosData = createFincaDto.fincas_productos || [];

                // Crear la finca principal
                const newFinca = await prisma.finca.create({
                    data: fincaBase,
                });

                // Crear relaciones con choferes
                if (choferesData.length > 0) {
                    await prisma.fincaChofer.createMany({
                        data: choferesData.map(chofer => ({
                            id_finca: newFinca.id_finca,
                            id_chofer: chofer.id_chofer,
                        })),
                    });
                }

                // Crear relaciones con productos
                if (productosData.length > 0) {
                    await prisma.fincaProducto.createMany({
                        data: productosData.map(producto => ({
                            id_finca: newFinca.id_finca,
                            id_producto: producto.id_producto,
                        })),
                    });
                }

                return newFinca;
            } catch (error) {
                throw error;
            }
        });
    }

    async update(updateFincaDto: UpdateFincaDto) {
        const id = updateFincaDto.id_finca;
        if (!id) {
            throw new NotFoundException('ID de finca no proporcionado');
        }

        return this.prisma.$transaction(async (prisma) => {
            try {
                // Verificar que existe la finca
                const existingFinca = await prisma.finca.findUnique({
                    where: { id_finca: id },
                });

                if (!existingFinca) {
                    throw new NotFoundException(`Finca con ID ${id} no encontrada`);
                }

                const fincaBase = this.extraerFincaData(updateFincaDto);
                const choferesData = updateFincaDto.fincas_choferes || [];
                const productosData = updateFincaDto.fincas_productos || [];

                // Actualizar la finca principal
                await prisma.finca.update({
                    where: { id_finca: id },
                    data: fincaBase,
                });

                // Eliminar relaciones existentes
                await prisma.fincaChofer.deleteMany({
                    where: { id_finca: id },
                });

                await prisma.fincaProducto.deleteMany({
                    where: { id_finca: id },
                });

                // Crear nuevas relaciones con choferes
                if (choferesData.length > 0) {
                    await prisma.fincaChofer.createMany({
                        data: choferesData.map(chofer => ({
                            id_finca: id,
                            id_chofer: chofer.id_chofer,
                        })),
                    });
                }

                // Crear nuevas relaciones con productos
                if (productosData.length > 0) {
                    await prisma.fincaProducto.createMany({
                        data: productosData.map(producto => ({
                            id_finca: id,
                            id_producto: producto.id_producto,
                        })),
                    });
                }

                return this.findOne(id);
            } catch (error) {
                throw error;
            }
        });
    }

    async remove(id: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Verificar que existe la finca
            const existingFinca = await prisma.finca.findUnique({
                where: { id_finca: id },
            });

            if (!existingFinca) {
                throw new NotFoundException(`Finca con ID ${id} no encontrada`);
            }

            // Eliminar relaciones
            await prisma.fincaChofer.deleteMany({
                where: { id_finca: id },
            });

            await prisma.fincaProducto.deleteMany({
                where: { id_finca: id },
            });

            // Eliminar la finca
            return prisma.finca.delete({
                where: { id_finca: id },
            });
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.$transaction(async (prisma) => {
            // Verificar qué fincas existen
            const existingFincas = await prisma.finca.findMany({
                where: {
                    id_finca: {
                        in: ids,
                    },
                },
                select: {
                    id_finca: true,
                },
            });

            if (existingFincas.length === 0) {
                throw new NotFoundException('No se encontraron fincas para eliminar');
            }

            const existingIds = existingFincas.map(finca => finca.id_finca);

            // Eliminar relaciones
            await prisma.fincaChofer.deleteMany({
                where: {
                    id_finca: {
                        in: existingIds,
                    },
                },
            });

            await prisma.fincaProducto.deleteMany({
                where: {
                    id_finca: {
                        in: existingIds,
                    },
                },
            });

            // Eliminar las fincas
            return prisma.finca.deleteMany({
                where: {
                    id_finca: {
                        in: existingIds,
                    },
                },
            });
        });
    }

    // Extraer datos para crear una finca
    private extraerFincaData(data: CreateFincaDto | UpdateFincaDto) {
        return {
            nombre_finca: data.nombre_finca,
            codigo_finca: data.codigo_finca,
            ruc_finca: data.ruc_finca,
            id_tipo_documento: data.id_tipo_documento,
            genera_guias_certificadas: data.genera_guias_certificadas,
            i_general_telefono: data.i_general_telefono,
            i_general_email: data.i_general_email,
            i_general_ciudad: data.i_general_ciudad,
            i_general_provincia: data.i_general_provincia,
            i_general_pais: data.i_general_pais,
            i_general_cod_sesa: data.i_general_cod_sesa,
            i_general_cod_pais: data.i_general_cod_pais,
            dim_x: data.dim_x,
            dim_y: data.dim_y,
            dim_z: data.dim_z,
            excel_plantilla: data.excel_plantilla,
            a_nombre: data.a_nombre,
            a_codigo: data.a_codigo,
            a_direccion: data.a_direccion,
        };
    }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductosService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const productos = await this.prisma.producto.findMany();
        return productos;
    }

    async findOne(id: number) {
        const producto = await this.prisma.producto.findUnique({
            where: { id_producto: id },
        });

        if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        return producto;
    }

    async create(productoData: any) {
        const transaction = await this.prisma.$transaction(async (prisma) => {
            try {
                const productoBase = this.extraerProductoDeData(productoData);
                const miProData = this.extraerMiProData(productoData);
                const arancelesData = this.extraerArancelesData(productoData);
                const productoCompuestoData = this.extraerProductoCompuestoData(productoData);

                // Crear el producto principal
                const newProducto = await prisma.producto.create({
                    data: productoBase,
                });

                // Crear registros MiPro si existen
                if (miProData && miProData.length > 0) {
                    await prisma.productosMiPro.createMany({
                        data: miProData.map(mipro => ({
                            id_producto: newProducto.id_producto,
                            mipro_acuerdo: mipro.mipro_acuerdo,
                            mipro_djocode: mipro.mipro_djocode,
                            mipro_tariffcode: mipro.mipro_tariffcode,
                        })),
                    });
                }

                // Crear aranceles si existen
                if (arancelesData && arancelesData.length > 0) {
                    await prisma.productosAranceles.createMany({
                        data: arancelesData.map(arancel => ({
                            id_producto: newProducto.id_producto,
                            aranceles_destino: arancel.aranceles_destino,
                            aranceles_codigo: arancel.aranceles_codigo,
                        })),
                    });
                }

                // Crear productos compuestos si existen
                if (productoCompuestoData && productoCompuestoData.length > 0) {
                    await prisma.productosCompuesto.createMany({
                        data: productoCompuestoData.map(compuesto => ({
                            id_producto: newProducto.id_producto,
                            producto_compuesto_destino: compuesto.producto_compuesto_destino,
                            producto_compuesto_declaracion: compuesto.producto_compuesto_declaracion,
                        })),
                    });
                }

                return newProducto;
            } catch (error) {
                throw error;
            }
        });

        return this.findProductoCompleto(transaction.id_producto);
    }

    async findProductoCompleto(id: number) {
        const producto = await this.prisma.producto.findUnique({
            where: { id_producto: id },
            include: {
                medida: true,
                opcion: true,
                aranceles: true,
                producto_compuesto: true,
                mipro: true,
            },
        });

        if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        return producto;
    }

    async findAllCompleto() {
        return this.prisma.producto.findMany({
            include: {
                medida: true,
                opcion: true,
                aranceles: true,
                producto_compuesto: true,
                mipro: true,
            },
        });
    }

    async update(productoData: any) {
        const id = productoData.id_producto;
        if (!id) {
            throw new NotFoundException('ID de producto no proporcionado');
        }

        await this.prisma.$transaction(async (prisma) => {
            try {
                // Verificar que existe el producto
                const existingProducto = await prisma.producto.findUnique({
                    where: { id_producto: id },
                });

                if (!existingProducto) {
                    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
                }

                const productoBase = this.extraerProductoDeData(productoData);
                const miProData = this.extraerMiProData(productoData);
                const arancelesData = this.extraerArancelesData(productoData);
                const productoCompuestoData = this.extraerProductoCompuestoData(productoData);

                // Actualizar el producto principal
                await prisma.producto.update({
                    where: { id_producto: id },
                    data: productoBase,
                });

                // Eliminar relaciones existentes
                await prisma.productosMiPro.deleteMany({
                    where: { id_producto: id },
                });

                await prisma.productosAranceles.deleteMany({
                    where: { id_producto: id },
                });

                await prisma.productosCompuesto.deleteMany({
                    where: { id_producto: id },
                });

                // Crear nuevas relaciones
                if (miProData && miProData.length > 0) {
                    await prisma.productosMiPro.createMany({
                        data: miProData.map(mipro => ({
                            id_producto: id,
                            mipro_acuerdo: mipro.mipro_acuerdo,
                            mipro_djocode: mipro.mipro_djocode,
                            mipro_tariffcode: mipro.mipro_tariffcode,
                        })),
                    });
                }

                if (arancelesData && arancelesData.length > 0) {
                    await prisma.productosAranceles.createMany({
                        data: arancelesData.map(arancel => ({
                            id_producto: id,
                            aranceles_destino: arancel.aranceles_destino,
                            aranceles_codigo: arancel.aranceles_codigo,
                        })),
                    });
                }

                if (productoCompuestoData && productoCompuestoData.length > 0) {
                    await prisma.productosCompuesto.createMany({
                        data: productoCompuestoData.map(compuesto => ({
                            id_producto: id,
                            producto_compuesto_destino: compuesto.producto_compuesto_destino,
                            producto_compuesto_declaracion: compuesto.producto_compuesto_declaracion,
                        })),
                    });
                }
            } catch (error) {
                throw error;
            }
        });

        return this.findProductoCompleto(id);
    }

    async remove(id: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Verificar que existe el producto
            const existingProducto = await prisma.producto.findUnique({
                where: { id_producto: id },
            });

            if (!existingProducto) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }

            // Eliminar relaciones
            await prisma.productosMiPro.deleteMany({
                where: { id_producto: id },
            });

            await prisma.productosAranceles.deleteMany({
                where: { id_producto: id },
            });

            await prisma.productosCompuesto.deleteMany({
                where: { id_producto: id },
            });

            // Eliminar el producto
            return prisma.producto.delete({
                where: { id_producto: id },
            });
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.$transaction(async (prisma) => {
            // Verificar qué productos existen
            const existingProductos = await prisma.producto.findMany({
                where: {
                    id_producto: {
                        in: ids,
                    },
                },
                select: {
                    id_producto: true,
                },
            });

            if (existingProductos.length === 0) {
                throw new NotFoundException('No se encontraron productos para eliminar');
            }

            const existingIds = existingProductos.map(producto => producto.id_producto);

            // Eliminar relaciones
            await prisma.productosMiPro.deleteMany({
                where: {
                    id_producto: {
                        in: existingIds,
                    },
                },
            });

            await prisma.productosAranceles.deleteMany({
                where: {
                    id_producto: {
                        in: existingIds,
                    },
                },
            });

            await prisma.productosCompuesto.deleteMany({
                where: {
                    id_producto: {
                        in: existingIds,
                    },
                },
            });

            // Eliminar los productos
            return prisma.producto.deleteMany({
                where: {
                    id_producto: {
                        in: existingIds,
                    },
                },
            });
        });
    }

    // Funciones de extracción para mantener compatibilidad con el código existente
    private extraerProductoDeData(data: any) {
        return {
            id_producto: data?.id_producto,
            codigo_producto: data?.codigo_producto,
            nombre: data?.nombre,
            descripcion: data?.descripcion,
            nombre_botanico: data?.nombre_botanico,
            especie: data?.especie,
            id_medida: data?.medida?.id_medida,
            precio_unitario: data?.precio_unitario,
            estado: data?.estado,
            id_opcion: data?.opcion?.id_opcion,
            stems_por_full: data?.stems_por_full,
            id_sesa: data?.id_sesa,
        };
    }

    private extraerMiProData(data: any) {
        return data?.mipro || [];
    }

    private extraerArancelesData(data: any) {
        return data?.aranceles || [];
    }

    private extraerProductoCompuestoData(data: any) {
        return data?.producto_compuesto || [];
    }
}
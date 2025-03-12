// src/mantenimiento/consignatarios/consignatarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConsignatarioDto } from './dto/create-consignatario.dto';
import { UpdateConsignatarioDto, ConsignatarioRelacionado } from './dto/update-consignatario.dto';

@Injectable()
export class ConsignatariosService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const consignatarios = await this.prisma.consignatario.findMany({
            include: {
                cae_sice: {
                    include: {
                        tipoDocConsignee: true,
                        tipoDocNotify: true,
                        tipoDocHawb: true,
                    },
                },
                facturacion: true,
                fito: true,
                guia_h: true,
                guia_m: {
                    include: {
                        destino: true,
                    },
                },
                transmision: true,
                embarcador: true,
                cliente: true,
            },
        });

        // Mezclar todos los atributos en un solo objeto para mantener compatibilidad
        return consignatarios.map(consignatario => {
            return {
                ...consignatario,
                ...consignatario.cae_sice,
                ...consignatario.facturacion,
                ...consignatario.fito,
                ...consignatario.guia_h,
                ...consignatario.guia_m,
                ...consignatario.transmision,
                embarcador: consignatario.embarcador,
                cliente: consignatario.cliente,
                destino: consignatario.guia_m?.destino,
                tipo_documento_consignee: consignatario.cae_sice?.tipoDocConsignee,
                tipo_documento_notify: consignatario.cae_sice?.tipoDocNotify,
                tipo_documento_hawb: consignatario.cae_sice?.tipoDocHawb,
            };
        });
    }

    async findOne(id: number) {
        const consignatario = await this.prisma.consignatario.findUnique({
            where: { id_consignatario: id },
            include: {
                cae_sice: {
                    include: {
                        tipoDocConsignee: true,
                        tipoDocNotify: true,
                        tipoDocHawb: true,
                    },
                },
                facturacion: true,
                fito: true,
                guia_h: true,
                guia_m: {
                    include: {
                        destino: true,
                    },
                },
                transmision: true,
                embarcador: true,
                cliente: true,
            },
        });

        if (!consignatario) {
            throw new NotFoundException(`Consignatario con ID ${id} no encontrado`);
        }

        // Mezclar todos los atributos en un solo objeto para mantener compatibilidad
        return {
            ...consignatario,
            ...consignatario.cae_sice,
            ...consignatario.facturacion,
            ...consignatario.fito,
            ...consignatario.guia_h,
            ...consignatario.guia_m,
            ...consignatario.transmision,
            embarcador: consignatario.embarcador,
            cliente: consignatario.cliente,
            destino: consignatario.guia_m?.destino,
            tipo_documento_consignee: consignatario.cae_sice?.tipoDocConsignee,
            tipo_documento_notify: consignatario.cae_sice?.tipoDocNotify,
            tipo_documento_hawb: consignatario.cae_sice?.tipoDocHawb,
        };
    }

    async create(data: CreateConsignatarioDto | ConsignatarioRelacionado) {
        return this.prisma.$transaction(async (prisma) => {
            try {
                // Extraer datos para cada entidad relacionada
                const consignatarioData = this.extractConsignatarioFromData(data);
                const transmisionData = this.extractTransmisionFromData(data);
                const guiaMData = this.extractGuiaMFromData(data);
                const guiaHData = this.extractGuiaHFromData(data);
                const fitoData = this.extractFitoFromData(data);
                const facturacionData = this.extractFacturacionFromData(data);
                const caeSiceData = this.extractCaeSiceFromData(data);

                // Crear el consignatario principal
                const newConsignatario = await prisma.consignatario.create({
                    data: consignatarioData,
                });

                // Crear las entidades relacionadas
                await prisma.consignatarioTransmision.create({
                    data: {
                        id_consignatario: newConsignatario.id_consignatario,
                        ...transmisionData,
                    },
                });

                await prisma.consignatarioGuiaM.create({
                    data: {
                        id_consignatario: newConsignatario.id_consignatario,
                        ...guiaMData,
                    },
                });

                await prisma.consignatarioGuiaH.create({
                    data: {
                        id_consignatario: newConsignatario.id_consignatario,
                        ...guiaHData,
                    },
                });

                await prisma.consignatarioFito.create({
                    data: {
                        id_consignatario: newConsignatario.id_consignatario,
                        ...fitoData,
                    },
                });

                await prisma.consignatarioFacturacion.create({
                    data: {
                        id_consignatario: newConsignatario.id_consignatario,
                        ...facturacionData,
                    },
                });

                await prisma.consignatarioCaeSice.create({
                    data: {
                        id_consignatario: newConsignatario.id_consignatario,
                        ...caeSiceData,
                    },
                });

                return this.findOne(newConsignatario.id_consignatario);
            } catch (error) {
                throw error;
            }
        });
    }

    async update(id: number, data: UpdateConsignatarioDto | ConsignatarioRelacionado) {
        return this.prisma.$transaction(async (prisma) => {
            try {
                // Verificar que existe el consignatario
                const existingConsignatario = await prisma.consignatario.findUnique({
                    where: { id_consignatario: id },
                });

                if (!existingConsignatario) {
                    throw new NotFoundException(`Consignatario con ID ${id} no encontrado`);
                }

                // Extraer datos para cada entidad relacionada
                const consignatarioData = this.extractConsignatarioFromData(data);
                const transmisionData = this.extractTransmisionFromData(data);
                const guiaMData = this.extractGuiaMFromData(data);
                const guiaHData = this.extractGuiaHFromData(data);
                const fitoData = this.extractFitoFromData(data);
                const facturacionData = this.extractFacturacionFromData(data);
                const caeSiceData = this.extractCaeSiceFromData(data);

                // Actualizar consignatario principal
                await prisma.consignatario.update({
                    where: { id_consignatario: id },
                    data: consignatarioData,
                });

                // Actualizar entidades relacionadas
                await prisma.consignatarioTransmision.update({
                    where: { id_consignatario: id },
                    data: transmisionData,
                });

                await prisma.consignatarioGuiaM.update({
                    where: { id_consignatario: id },
                    data: guiaMData,
                });

                await prisma.consignatarioGuiaH.update({
                    where: { id_consignatario: id },
                    data: guiaHData,
                });

                await prisma.consignatarioFito.update({
                    where: { id_consignatario: id },
                    data: fitoData,
                });

                await prisma.consignatarioFacturacion.update({
                    where: { id_consignatario: id },
                    data: facturacionData,
                });

                await prisma.consignatarioCaeSice.update({
                    where: { id_consignatario: id },
                    data: caeSiceData,
                });

                return this.findOne(id);
            } catch (error) {
                throw error;
            }
        });
    }

    async remove(id: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Verificar que existe el consignatario
            const existingConsignatario = await prisma.consignatario.findUnique({
                where: { id_consignatario: id },
            });

            if (!existingConsignatario) {
                throw new NotFoundException(`Consignatario con ID ${id} no encontrado`);
            }

            // Eliminar entidades relacionadas por cascada (onDelete: Cascade en el schema)
            await prisma.consignatario.delete({
                where: { id_consignatario: id },
            });

            return existingConsignatario;
        });
    }

    async removeMany(ids: number[]) {
        return this.prisma.$transaction(async (prisma) => {
            // Verificar qué consignatarios existen
            const existingConsignatarios = await prisma.consignatario.findMany({
                where: {
                    id_consignatario: {
                        in: ids,
                    },
                },
                select: {
                    id_consignatario: true,
                },
            });

            if (existingConsignatarios.length === 0) {
                throw new NotFoundException('No se encontraron consignatarios para eliminar');
            }

            const existingIds = existingConsignatarios.map(consignatario => consignatario.id_consignatario);

            // Eliminar los consignatarios (las relaciones se eliminan por cascada)
            await prisma.consignatario.deleteMany({
                where: {
                    id_consignatario: {
                        in: existingIds,
                    },
                },
            });

            return { ok: true, msg: 'Consignatarios eliminados correctamente' };
        });
    }

    // Funciones de extracción para mantener compatibilidad con el código existente
    private extractConsignatarioFromData(data: any) {
        return {
            nombre_consignatario: data?.nombre_consignatario,
            ruc: data?.ruc,
            direccion: data?.direccion,
            id_embarcador: data?.id_embarcador || data?.embarcador?.id_embarcador,
            id_cliente: data?.id_cliente || data?.cliente?.id_clientes,
            telefono: data?.telefono,
            email: data?.email,
            ciudad: data?.ciudad,
            pais: data?.pais,
        };
    }

    private extractTransmisionFromData(data: any) {
        return {
            consignee_nombre_trans: data?.consignee_nombre_trans,
            consignee_direccion_trans: data?.consignee_direccion_trans,
            consignee_ciudad_trans: data?.consignee_ciudad_trans,
            consignee_provincia_trans: data?.consignee_provincia_trans,
            consignee_pais_trans: data?.consignee_pais_trans,
            consignee_eueori_trans: data?.consignee_eueori_trans,
            notify_nombre_trans: data?.notify_nombre_trans,
            notify_direccion_trans: data?.notify_direccion_trans,
            notify_ciudad_trans: data?.notify_ciudad_trans,
            notify_provincia_trans: data?.notify_provincia_trans,
            notify_pais_trans: data?.notify_pais_trans,
            notify_eueori_trans: data?.notify_eueori_trans,
            hawb_nombre_trans: data?.hawb_nombre_trans,
            hawb_direccion_trans: data?.hawb_direccion_trans,
            hawb_ciudad_trans: data?.hawb_ciudad_trans,
            hawb_provincia_trans: data?.hawb_provincia_trans,
            hawb_pais_trans: data?.hawb_pais_trans,
            hawb_eueori_trans: data?.hawb_eueori_trans,
        };
    }

    private extractGuiaMFromData(data: any) {
        return {
            id_destino: data?.id_destino || data?.destino?.id_destino,
            guia_m_consignee: data?.guia_m_consignee,
            guia_m_name_address: data?.guia_m_name_address,
            guia_m_notify: data?.guia_m_notify,
        };
    }

    private extractGuiaHFromData(data: any) {
        return {
            guia_h_consignee: data?.guia_h_consignee,
            guia_h_name_adress: data?.guia_h_name_adress,
            guia_h_notify: data?.guia_h_notify,
        };
    }

    private extractFitoFromData(data: any) {
        return {
            fito_declared_name: data?.fito_declared_name,
            fito_forma_a: data?.fito_forma_a,
            fito_nombre: data?.fito_nombre,
            fito_direccion: data?.fito_direccion,
            fito_pais: data?.fito_pais,
        };
    }

    private extractFacturacionFromData(data: any) {
        return {
            factura_nombre: data?.factura_nombre,
            factura_ruc: data?.factura_ruc,
            factura_direccion: data?.factura_direccion,
            factura_telefono: data?.factura_telefono,
        };
    }

    private extractCaeSiceFromData(data: any) {
        return {
            consignee_nombre: data?.consignee_nombre,
            consignee_direccion: data?.consignee_direccion,
            consignee_documento: data?.consignee_documento,
            consignee_siglas_pais: data?.consignee_siglas_pais,
            notify_nombre: data?.notify_nombre,
            notify_direccion: data?.notify_direccion,
            notify_documento: data?.notify_documento,
            notify_siglas_pais: data?.notify_siglas_pais,
            hawb_nombre: data?.hawb_nombre,
            hawb_direccion: data?.hawb_direccion,
            hawb_documento: data?.hawb_documento,
            hawb_siglas_pais: data?.hawb_siglas_pais,
            consignee_tipo_documento: data?.consignee_tipo_documento || data?.tipo_documento_consignee?.id_tipo_documento,
            notify_tipo_documento: data?.notify_tipo_documento || data?.tipo_documento_notify?.id_tipo_documento,
            hawb_tipo_documento: data?.hawb_tipo_documento || data?.tipo_documento_hawb?.id_tipo_documento,
        };
    }
}
// src/mantenimiento/aerolineas/aerolineas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAerolineaDto } from './dto/create-aerolinea.dto';
import { UpdateAerolineaDto } from './dto/update-aerolinea.dto';
import { CreateAerolineaCompletaDto } from './dto/create-aerolinea-completa.dto';
import { UpdateAerolineaCompletaDto } from './dto/update-aerolinea-completa.dto';

@Injectable()
export class AerolineasService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.aerolinea.findMany();
    }

    async findOne(id: number) {
        const aerolinea = await this.prisma.aerolinea.findUnique({
            where: { id_aerolinea: id },
        });

        if (!aerolinea) {
            throw new NotFoundException(`Aerolínea con ID ${id} no encontrada`);
        }

        return aerolinea;
    }

    async create(createAerolineaDto: CreateAerolineaDto) {
        return this.prisma.aerolinea.create({
            data: createAerolineaDto,
        });
    }

    async createCompleta(data: CreateAerolineaCompletaDto) {
        // Extraer datos de aerolínea y plantilla
        const aerolineaData = this.extractDataToAerolinea(data);
        const plantillaData = this.extractDataToAerolineaPlantilla(data);

        return this.prisma.$transaction(async (prisma) => {
            // Crear la aerolínea
            const newAerolinea = await prisma.aerolinea.create({
                data: aerolineaData,
            });

            // Crear la plantilla asociada
            const newAerolineaPlantilla = await prisma.aerolineasPlantilla.create({
                data: {
                    id_aerolinea: newAerolinea.id_aerolinea,
                    ...plantillaData,
                },
            });

            return {
                aerolinea: newAerolinea,
                aerolineaPlantilla: newAerolineaPlantilla,
            };
        });
    }

    async update(id: number, updateAerolineaDto: UpdateAerolineaDto) {
        // Verificar que existe la aerolínea
        await this.findOne(id);

        return this.prisma.aerolinea.update({
            where: { id_aerolinea: id },
            data: updateAerolineaDto,
        });
    }

    async updateCompleta(data: UpdateAerolineaCompletaDto) {
        const aerolineaData = this.extractDataToAerolinea(data);
        const plantillaData = this.extractDataToAerolineaPlantilla(data);
        const id = data.id_aerolinea;

        return this.prisma.$transaction(async (prisma) => {
            // Verificar que existe la aerolínea
            const aerolineaExistente = await prisma.aerolinea.findUnique({
                where: { id_aerolinea: id },
            });

            if (!aerolineaExistente) {
                throw new NotFoundException(`Aerolínea con ID ${id} no encontrada`);
            }

            // Actualizar la aerolínea
            await prisma.aerolinea.update({
                where: { id_aerolinea: id },
                data: aerolineaData,
            });

            // Actualizar o crear la plantilla
            const plantillaExistente = await prisma.aerolineasPlantilla.findUnique({
                where: { id_aerolinea: id },
            });

            if (plantillaExistente) {
                await prisma.aerolineasPlantilla.update({
                    where: { id_aerolinea: id },
                    data: plantillaData,
                });
            } else {
                await prisma.aerolineasPlantilla.create({
                    data: {
                        id_aerolinea: id,
                        ...plantillaData,
                    },
                });
            }

            // Recuperar datos actualizados
            const aerolinea = await prisma.aerolinea.findUnique({
                where: { id_aerolinea: id },
                include: {
                    aerolineas_plantilla: true,
                }
            });

            return this.formatAerolineaCompleta(aerolinea);
        });
    }

    async removeCompleta(ids: number[]) {
        return this.prisma.$transaction(async (prisma) => {
            // Verificar si todas las aerolíneas existen
            const existingAerolineas = await prisma.aerolinea.findMany({
                where: {
                    id_aerolinea: {
                        in: ids
                    }
                }
            });

            if (existingAerolineas.length !== ids.length) {
                throw new NotFoundException('Una o más aerolíneas no fueron encontradas');
            }

            // Eliminar plantillas primero por restricciones de clave foránea
            await prisma.aerolineasPlantilla.deleteMany({
                where: {
                    id_aerolinea: { in: ids },
                },
            });

            // Eliminar aerolíneas
            await prisma.aerolinea.deleteMany({
                where: {
                    id_aerolinea: { in: ids },
                },
            });

            return { success: true, deletedIds: ids };
        });
    }

    async findAllComplete() {
        const aerolineas = await this.prisma.aerolinea.findMany({
            include: {
                aerolineas_plantilla: {
                    include: {
                        multiplicador1: true,
                        multiplicador2: true,
                        multiplicador3: true,
                    },
                },
                modo: true,
                origen1: true,
                destino1: true,
                via1: true,
                destino2: true,
                via2: true,
                destino3: true,
                via3: true,
            },
        });

        // Mezclar los atributos de plantilla con los de aerolínea para mantener compatibilidad con frontend
        return aerolineas.map(aerolinea => this.formatAerolineaCompleta(aerolinea));
    }

    async findOneComplete(id: number) {
        const aerolinea = await this.prisma.aerolinea.findUnique({
            where: { id_aerolinea: id },
            include: {
                aerolineas_plantilla: {
                    include: {
                        multiplicador1: true,
                        multiplicador2: true,
                        multiplicador3: true,
                    },
                },
                modo: true,
                origen1: true,
                destino1: true,
                via1: true,
                destino2: true,
                via2: true,
                destino3: true,
                via3: true,
            },
        });

        if (!aerolinea) {
            throw new NotFoundException(`Aerolínea con ID ${id} no encontrada`);
        }

        return this.formatAerolineaCompleta(aerolinea);
    }

    async removeMany(ids: number[]) {
        return this.removeCompleta(ids);
    }

    // Funciones auxiliares para extracción de datos
    private extractDataToAerolinea(data: any) {
        const aerolineaData = data.aerolinea || data;

        return {
            nombre: aerolineaData.nombre,
            ci_ruc: aerolineaData.ci_ruc,
            direccion: aerolineaData.direccion,
            telefono: aerolineaData.telefono,
            email: aerolineaData.email,
            ciudad: aerolineaData.ciudad,
            pais: aerolineaData.pais,
            contacto: aerolineaData.contacto,
            id_modo: data.modo?.id_modo || aerolineaData.id_modo,
            maestra_guias_hijas: aerolineaData.maestra_guias_hijas,
            codigo: aerolineaData.codigo,
            prefijo_awb: aerolineaData.prefijo_awb,
            codigo_cae: aerolineaData.codigo_cae,
            estado_activo: aerolineaData.estado_activo,
            from1: data.origen1?.id_origen || aerolineaData.from1,
            to1: data.destino1?.id_destino || aerolineaData.to1,
            by1: data.via1?.id_aerolinea || aerolineaData.by1,
            to2: data.destino2?.id_destino || aerolineaData.to2,
            by2: data.via2?.id_aerolinea || aerolineaData.by2,
            to3: data.destino3?.id_destino || aerolineaData.to3,
            by3: data.via3?.id_aerolinea || aerolineaData.by3,
            afiliado_cass: aerolineaData.afiliado_cass,
            guias_virtuales: aerolineaData.guias_virtuales,
        };
    }

    private extractDataToAerolineaPlantilla(data: any) {
        const plantillaData = data.aerolinea_plantilla || data;

        return {
            costo_guia_abrv: plantillaData.costo_guia_abrv,
            combustible_abrv: plantillaData.combustible_abrv,
            seguridad_abrv: plantillaData.seguridad_abrv,
            aux_calculo_abrv: plantillaData.aux_calculo_abrv,
            iva_abrv: plantillaData.iva_abrv,
            otros_abrv: plantillaData.otros_abrv,
            aux1_abrv: plantillaData.aux1_abrv,
            aux2_abrv: plantillaData.aux2_abrv,
            costo_guia_valor: plantillaData.costo_guia_valor,
            combustible_valor: plantillaData.combustible_valor,
            seguridad_valor: plantillaData.seguridad_valor,
            aux_calculo_valor: plantillaData.aux_calculo_valor,
            otros_valor: plantillaData.otros_valor,
            aux1_valor: plantillaData.aux1_valor,
            aux2_valor: plantillaData.aux2_valor,
            iva_valor: plantillaData.iva_valor,
            plantilla_guia_madre: plantillaData.plantilla_guia_madre,
            plantilla_formato_aerolinea: plantillaData.plantilla_formato_aerolinea,
            plantilla_reservas: plantillaData.plantilla_reservas,
            tarifa_rate: plantillaData.tarifa_rate,
            pca: plantillaData.pca,
            combustible_mult: data.multiplicador1?.id_multiplicador || plantillaData.combustible_mult,
            seguridad_mult: data.multiplicador2?.id_multiplicador || plantillaData.seguridad_mult,
            aux_calc_mult: data.multiplicador3?.id_multiplicador || plantillaData.aux_calc_mult,
        };
    }

    // Formatea la aerolínea con sus relaciones para mantener compatibilidad con frontend
    private formatAerolineaCompleta(aerolinea: any) {
        if (!aerolinea) return null;

        const result = {
            ...aerolinea,
            ...aerolinea.aerolineas_plantilla,
        };

        // Manejar relaciones
        if (aerolinea.modo) result.modo = aerolinea.modo;
        if (aerolinea.origen1) result.origen1 = aerolinea.origen1;
        if (aerolinea.destino1) result.destino1 = aerolinea.destino1;
        if (aerolinea.via1) result.via1 = aerolinea.via1;
        if (aerolinea.destino2) result.destino2 = aerolinea.destino2;
        if (aerolinea.via2) result.via2 = aerolinea.via2;
        if (aerolinea.destino3) result.destino3 = aerolinea.destino3;
        if (aerolinea.via3) result.via3 = aerolinea.via3;

        // Manejar relaciones de la plantilla
        if (aerolinea.aerolineas_plantilla?.multiplicador1) {
            result.multiplicador1 = aerolinea.aerolineas_plantilla.multiplicador1;
        }
        if (aerolinea.aerolineas_plantilla?.multiplicador2) {
            result.multiplicador2 = aerolinea.aerolineas_plantilla.multiplicador2;
        }
        if (aerolinea.aerolineas_plantilla?.multiplicador3) {
            result.multiplicador3 = aerolinea.aerolineas_plantilla.multiplicador3;
        }

        return result;
    }
}
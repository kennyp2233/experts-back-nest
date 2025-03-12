// src/mantenimiento/aerolineas/aerolineas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAerolineaDto } from './dto/create-aerolinea.dto';
import { UpdateAerolineaDto } from './dto/update-aerolinea.dto';
import { CreateAerolineaCompletaDto } from './dto/create-aerolinea-completa.dto';

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

    // Este método corresponde a tu createAerolineaAndPlantilla
    async createCompleta(data: any) {
        // Extraer datos de aerolínea y plantilla usando una lógica similar a tus funciones extract
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

    // Este método corresponde a tu updateAerolineaAndPlantilla
    async updateCompleta(data: any) {
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
            });

            const aerolineaPlantilla = await prisma.aerolineasPlantilla.findUnique({
                where: { id_aerolinea: id },
            });

            return {
                aerolinea,
                aerolineaPlantilla,
            };
        });
    }

    // Este método corresponde a tu deleteAerolineaAndPlantilla
    async removeCompleta(ids: number[]) {
        return this.prisma.$transaction(async (prisma) => {
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

            return { success: true };
        });
    }

    // Este método corresponde a tu aerolineaJoinAll
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

        // Mezclar los atributos de plantilla con los de aerolínea, similar a tu código original
        return aerolineas.map(aerolinea => {
            const plantillaData = aerolinea.aerolineas_plantilla || {};
            return {
                ...aerolinea,
                ...plantillaData,
            };
        });
    }

    // Añadir al AerolineasService
    async removeMany(ids: number[]) {
        // Aquí implementamos la lógica para eliminar múltiples aerolíneas
        return this.prisma.$transaction(async (prisma) => {
            // Primero, verificamos si todas las aerolíneas existen
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

            // Eliminar registros en AerolineasPlantillas primero (por restricciones de clave foránea)
            await prisma.aerolineasPlantilla.deleteMany({
                where: {
                    id_aerolinea: {
                        in: ids
                    }
                }
            });

            // Eliminar las aerolíneas
            return prisma.aerolinea.deleteMany({
                where: {
                    id_aerolinea: {
                        in: ids
                    }
                }
            });
        });
    }

    // Funciones auxiliares para extracción de datos
    private extractDataToAerolinea(data: any) {
        return {
            nombre: data?.nombre,
            ci_ruc: data?.ci_ruc,
            direccion: data?.direccion,
            telefono: data?.telefono,
            email: data?.email,
            ciudad: data?.ciudad,
            pais: data?.pais,
            contacto: data?.contacto,
            id_modo: data?.modo?.id_modo,
            maestra_guias_hijas: data?.maestra_guias_hijas,
            codigo: data?.codigo,
            prefijo_awb: data?.prefijo_awb,
            codigo_cae: data?.codigo_cae,
            estado_activo: data?.estado_activo,
            from1: data?.origen1?.id_origen,
            to1: data?.destino1?.id_destino,
            by1: data?.via1?.id_aerolinea,
            to2: data?.destino2?.id_destino,
            by2: data?.via2?.id_aerolinea,
            to3: data?.destino3?.id_destino,
            by3: data?.via3?.id_aerolinea,
            afiliado_cass: data?.afiliado_cass,
            guias_virtuales: data?.guias_virtuales,
        };
    }

    private extractDataToAerolineaPlantilla(data: any) {
        return {
            costo_guia_abrv: data?.costo_guia_abrv,
            combustible_abrv: data?.combustible_abrv,
            seguridad_abrv: data?.seguridad_abrv,
            aux_calculo_abrv: data?.aux_calculo_abrv,
            iva_abrv: data?.iva_abrv,
            otros_abrv: data?.otros_abrv,
            aux1_abrv: data?.aux1_abrv,
            aux2_abrv: data?.aux2_abrv,
            costo_guia_valor: data?.costo_guia_valor,
            combustible_valor: data?.combustible_valor,
            seguridad_valor: data?.seguridad_valor,
            aux_calculo_valor: data?.aux_calculo_valor,
            otros_valor: data?.otros_valor,
            aux1_valor: data?.aux1_valor,
            aux2_valor: data?.aux2_valor,
            iva_valor: data?.iva_valor,
            plantilla_guia_madre: data?.plantilla_guia_madre,
            plantilla_formato_aerolinea: data?.plantilla_formato_aerolinea,
            plantilla_reservas: data?.plantilla_reservas,
            tarifa_rate: data?.tarifa_rate,
            pca: data?.pca,
            combustible_mult: data?.multiplicador1?.id_multiplicador,
            seguridad_mult: data?.multiplicador2?.id_multiplicador,
            aux_calc_mult: data?.multiplicador3?.id_multiplicador,
        };
    }
}
"use strict";
import Anotacion from "../entity/anotacion.entity.js";
import { AppDataSource } from "../config/configDb.js";

// Obtener una anotación o todas las de un estudiante específico
export async function getAnotacionService(query) {
  try {
    const { id_anotacion, estudiante_id_estudiante } = query;

    const anotacionRepository = AppDataSource.getRepository(Anotacion);

    const condition = id_anotacion
      ? { where: { id_anotacion } }
      : { where: { estudiante_id_estudiante } };

    const anotacion = id_anotacion
      ? await anotacionRepository.findOne(condition)
      : await anotacionRepository.find(condition);

    if (!anotacion) {
      return [null, id_anotacion ? "Anotación no encontrada." : "No se encontraron anotaciones para el estudiante."];
    }

    return [anotacion, null];
  } catch (error) {
    console.error("Error al obtener anotación:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getAnotacionesService() {
  try {
    const anotacionRepository = AppDataSource.getRepository(Anotacion);

    const anotaciones = await anotacionRepository.find();

    if (!anotaciones || anotaciones.length === 0) {
      return [null, "No se encontraron anotaciones"];
    }

    return [anotaciones, null];
  } catch (error) {
    console.error("Error al obtener todas las anotaciones:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createAnotacionService(body) {
  try {
    const anotacionRepository = AppDataSource.getRepository(Anotacion);

    const newAnotacion = anotacionRepository.create(body);
    const anotacionSaved = await anotacionRepository.save(newAnotacion);

    return [anotacionSaved, null];
  } catch (error) {
    console.error("Error al crear la anotación:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateAnotacionService(id_anotacion, body) {
  try {
    const anotacionRepository = AppDataSource.getRepository(Anotacion);
    
    const anotacionFound = await anotacionRepository.findOne({
      where: { id_anotacion }
    });

    if (!anotacionFound) return [null, "Anotación no encontrada."];

    // Solo actualizamos los campos que se envían en el body
    const updatedAnotacion = {
      ...anotacionFound,
      ...(body.estudiante_id_estudiante && { estudiante_id_estudiante: body.estudiante_id_estudiante }),
      ...(body.fecha && { fecha: body.fecha }),
      ...(body.descripcion && { descripcion: body.descripcion }),
      ...(body.tipo && { tipo: body.tipo }),
    };

    await anotacionRepository.save(updatedAnotacion);

    return [updatedAnotacion, null];
  } catch (error) {
    console.error("Error al actualizar la anotación:", error);
    return [null, "Error interno del servidor."];
  }
}

export async function deleteAnotacionService(query) {
  try {
    const { id_anotacion } = query;

    const anotacionRepository = AppDataSource.getRepository(Anotacion);

    const anotacionEncontrada = await anotacionRepository.findOne({ where: { id_anotacion } });

    if (!anotacionEncontrada) {
      return [null, "Anotación no encontrada"];
    }

    const anotacionEliminada = await anotacionRepository.remove(anotacionEncontrada);

    return [anotacionEliminada, null];
  } catch (error) {
    console.error("Error al eliminar anotación:", error);
    return [null, "Error interno del servidor"];
  }
}

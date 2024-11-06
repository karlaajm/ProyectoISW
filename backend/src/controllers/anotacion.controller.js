"use strict";
import {
  deleteAnotacionService,
  getAnotacionService,
  getAnotacionesService,
  updateAnotacionService,
  createAnotacionService,
} from "../services/anotacion.service.js";
import { anotacionBodyValidation } from "../validations/anotacion.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getAnotacion(req, res) {
  try {
    const { id_anotacion, estudiante_id_estudiante } = req.query;

    if (!id_anotacion && !estudiante_id_estudiante) {
      return handleErrorClient(
        res,
        400,
        "Debes proporcionar id_anotacion o estudiante_id_estudiante."
      );
    }

    const [anotacion, errorAnotacion] = await getAnotacionService({
      id_anotacion,
      estudiante_id_estudiante,
    });

    if (errorAnotacion) return handleErrorClient(res, 404, errorAnotacion);

    handleSuccess(
      res,
      200,
      id_anotacion
        ? "Anotación encontrada."
        : "Anotaciones del estudiante encontradas.",
      anotacion
    );
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAnotaciones(req, res) {
  try {
    const [anotaciones, errorAnotaciones] = await getAnotacionesService();

    if (errorAnotaciones) return handleErrorClient(res, 404, errorAnotaciones);

    handleSuccess(res, 200, "Anotaciones encontradas", anotaciones);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createAnotacion(req, res) {
  try {
    const { body } = req;

    const { error } = anotacionBodyValidation.validate(body, { abortEarly: false });
    if (error) return handleErrorClient(res, 400, "Error de validación en los datos enviados", error.details.map(err => err.message));

    const [anotacion, errorAnotacion] = await createAnotacionService(body);
    if (errorAnotacion) return handleErrorClient(res, 400, "Error creando la anotación", errorAnotacion);

    handleSuccess(res, 201, "Anotación creada correctamente", anotacion);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateAnotacion(req, res) {
  try {
    const { id_anotacion } = req.body;
    const body = req.body;

    if (!id_anotacion) {
      return handleErrorClient(res, 400, "El campo id_anotacion es obligatorio.");
    }

    const [anotacion, error] = await updateAnotacionService(id_anotacion, body);

    if (error) return handleErrorClient(res, 400, error);

    handleSuccess(res, 200, "Anotación actualizada correctamente", anotacion);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteAnotacion(req, res) {
  try {
    const { id_anotacion } = req.body;

    const { error } = anotacionBodyValidation.validate({ id_anotacion });
    if (error) return handleErrorClient(res, 400, error.message);

    const [anotacionDelete, errorAnotacionDelete] = await deleteAnotacionService({ id_anotacion });

    if (errorAnotacionDelete)
      return handleErrorClient(res, 404, "Error eliminando la anotación", errorAnotacionDelete);

    handleSuccess(res, 200, "Anotación eliminada correctamente", anotacionDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

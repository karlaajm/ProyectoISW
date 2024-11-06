"use strict";
import Joi from "joi";

export const anotacionQueryValidation = Joi.object({
  id_anotacion: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El ID de la anotación debe ser un número.",
      "number.integer": "El ID de la anotación debe ser un número entero.",
      "number.positive": "El ID de la anotación debe ser un número positivo.",
    })
})
  .or("id_anotacion")
  .messages({
    "object.missing": "Debes proporcionar el id_anotacion.",
  });

export const anotacionBodyValidation = Joi.object({
  estudiante_id_estudiante: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El estudiante_id_estudiante debe ser un número.",
      "number.integer": "El estudiante_id_estudiante debe ser un número entero.",
      "number.positive": "El estudiante_id_estudiante debe ser un número positivo.",
      "any.required": "El campo estudiante_id_estudiante es obligatorio.",
    }),
  fecha: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "La fecha debe ser una fecha válida.",
      "any.required": "El campo fecha es obligatorio.",
    }),
  descripcion: Joi.string()
    .min(5)
    .max(255)
    .required()
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "string.min": "La descripción debe tener como mínimo 5 caracteres.",
      "string.max": "La descripción debe tener como máximo 255 caracteres.",
      "any.required": "El campo descripcion es obligatorio.",
    }),
  tipo: Joi.string()
    .valid('Positiva', 'Negativa', 'Neutra') // Asegúrate de que estos sean los tipos válidos
    .required()
    .messages({
      "string.empty": "El tipo no puede estar vacío.",
      "any.only": "El tipo debe ser 'Positiva', 'Negativa' o 'Neutra'.",
      "any.required": "El campo tipo es obligatorio.",
    }),
})
  .unknown(false) // Esto asegura que no se permiten propiedades adicionales
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
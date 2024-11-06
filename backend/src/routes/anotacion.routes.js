"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteAnotacion,
  getAnotacion,
  getAnotaciones,
  updateAnotacion,
  createAnotacion,
} from "../controllers/anotacion.controller.js";

const router = Router();

// router
//   .use(authenticateJwt)
//   .use(isAdmin);

router
  .get("/", getAnotaciones)
  .get("/detalle/", getAnotacion)
  .patch("/actualizar/", updateAnotacion)
  .delete("/eliminar/", deleteAnotacion)
  .post("/crear/", createAnotacion);

export default router;
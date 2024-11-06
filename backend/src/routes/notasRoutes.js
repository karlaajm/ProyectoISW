const express = require("express");
const router = express.Router();
const notasController = require("../controllers/notasController");

router.post("/notas", notasController.crearNota);
router.get("/notas/:estudianteId", notasController.obtenerNotas);
router.put("/notas/:id", notasController.actualizarNota);
router.delete("/notas/:id", notasController.eliminarNota);
router.get("/notas/promedio/:estudianteId", notasController.calcularPromedioYNotificar);

module.exports = router;
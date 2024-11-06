// controllers/notasController.js
const notasService = require("../services/notasService");
const { validarNota } = require("../validations/notasValidation");

// Crear nota
exports.crearNota = async (req, res) => {
    const { error } = validarNota(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const nuevaNota = await notasService.crearNota(req.body);
        res.status(201).json(nuevaNota);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener notas
exports.obtenerNotas = async (req, res) => {
    try {
        const notas = await notasService.obtenerNotas(req.params.estudianteId);
        res.status(200).json(notas);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Actualizar nota
exports.actualizarNota = async (req, res) => {
    const { error } = validarNota(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const notaActualizada = await notasService.actualizarNota(req.params.id, req.body);
        res.status(200).json(notaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar nota
exports.eliminarNota = async (req, res) => {
    try {
        await notasService.eliminarNota(req.params.id);
        res.status(200).json({ message: "Nota eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Calcular promedio y notificar
exports.calcularPromedioYNotificar = async (req, res) => {
    try {
        const promedio = await notasService.calcularPromedio(req.params.estudianteId);
        if (promedio < 4.0) {
            await notasService.enviarNotificacionCorreo(req.params.estudianteId);
        }
        res.status(200).json({ promedio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Función de envío de correo (Sin implementar aun)
function enviarCorreoNotificacion(estudianteId) {
    console.log(`Correo de notificación enviado al estudiante ${estudianteId} para examen extraordinario.`);
}

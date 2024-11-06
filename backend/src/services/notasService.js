// services/notasService.js
const Nota = require("../models/Nota");

// Crear una nueva nota
exports.crearNota = async (data) => {
    const nuevaNota = new Nota(data);
    nuevaNota.estado = nuevaNota.nota >= 4.0 ? "Aprobado" : "Reprobado";
    return await nuevaNota.save();
};

// Obtener las notas de un estudiante
exports.obtenerNotas = async (estudiante_id_estudiante) => {
    return await Nota.find({ estudiante_id_estudiante });
};

// Actualizar una nota existente
exports.actualizarNota = async (id_nota, data) => {
    return await Nota.findByIdAndUpdate(id_nota, data, { new: true });
};

// Eliminar una nota
exports.eliminarNota = async (id_nota) => {
    return await Nota.findByIdAndDelete(id_nota);
};

// Calcular promedio de notas
exports.calcularPromedio = async (estudiante_id_estudiante) => {
    const notas = await Nota.find({ estudiante_id_estudiante });
    const promedio = notas.reduce((sum, nota) => sum + nota.nota, 0) / notas.length;
    return promedio;
};

// Enviar notificación por correo (Sin implementar aun)
exports.enviarNotificacionCorreo = async (estudiante_id_estudiante) => {
    // Lógica para enviar correo (esto es solo un ejemplo)
    console.log(`Correo enviado al estudiante ${estudiante_id_estudiante} para examen extraordinario.`);
};
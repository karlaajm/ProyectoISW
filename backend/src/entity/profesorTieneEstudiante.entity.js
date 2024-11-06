"use strict";
import { EntitySchema } from "typeorm";

const ProfesorTieneEstudianteSchema = new EntitySchema({
  name: "ProfesorTieneEstudiante",
  tableName: "profesor_tiene_estudiante",
  columns: {
    profesor_id_profesor: {
      type: "int",
      primary: true,
    },
    estudiante_id_estudiante: {
      type: "int",
      primary: true,
    },
  },
  relations: {
    profesor: {
      type: "many-to-one",
      target: "Profesor",
      joinColumn: {
        name: "profesor_id_profesor"
      },
      onDelete: "CASCADE",
    },
    estudiante: {
      type: "many-to-one",
      target: "Estudiante",
      joinColumn: {
        name: "estudiante_id_estudiante"
      },
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "IDX_PROFESOR_ESTUDIANTE",
      columns: ["profesor_id_profesor", "estudiante_id_estudiante"],
      unique: true,
    },
  ],
});

export default ProfesorTieneEstudianteSchema;

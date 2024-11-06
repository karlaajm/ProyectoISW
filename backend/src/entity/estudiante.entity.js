"use strict";
import { EntitySchema } from "typeorm";

const EstudianteSchema = new EntitySchema({
  name: "Estudiante",
  tableName: "estudiante",
  columns: {
    id_estudiante: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_ESTUDIANTE",
      columns: ["id_estudiante"],
      unique: true,
    },
  ],
});

export default EstudianteSchema;
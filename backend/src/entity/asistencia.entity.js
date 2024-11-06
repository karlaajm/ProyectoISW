"use strict";
import { EntitySchema } from "typeorm";

const AsistenciaSchema = new EntitySchema({
  name: "Asistencia",
  tableName: "asistencia",
  columns: {
    id_asistencia: {
      type: "int",
      primary: true,
      generated: true,
    },
    fecha: {
      type: "date",
      nullable: false,
    },
    estado: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
    estudiante_id_estudiante: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    estudiante: {
      type: "many-to-one",
      target: "Estudiante",
      joinColumn: {
        name: "estudiante_id_estudiante",
      },
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "IDX_ASISTENCIA",
      columns: ["id_asistencia"],
      unique: true,
    },
    {
      name: "IDX_ASISTENCIA_ESTUDIANTE",
      columns: ["estudiante_id_estudiante"],
    },
  ],
});

export default AsistenciaSchema;
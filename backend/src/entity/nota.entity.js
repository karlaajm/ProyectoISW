"use strict";
import { EntitySchema } from "typeorm";

const NotaSchema = new EntitySchema({
  name: "Nota",
  tableName: "nota",
  columns: {
    id_nota: {
      type: "int",
      primary: true,
      generated: true,
    },
    fecha_de_evaluacion: {
      type: "date",
      nullable: false,
    },
    calificacion: {
      type: "int",
      nullable: false,
    },
    tipo: {
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
      joinColumn: { name: "estudiante_id_estudiante" },
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "IDX_NOTA",
      columns: ["id_nota"],
      unique: true,
    },
    {
      name: "IDX_NOTA_ESTUDIANTE",
      columns: ["estudiante_id_estudiante"],
    },
  ],
});

export default NotaSchema;
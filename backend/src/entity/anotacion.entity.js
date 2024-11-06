"use strict";
import { EntitySchema } from "typeorm";

const AnotacionSchema = new EntitySchema({
  name: "Anotacion",
  tableName: "anotacion",
  columns: {
    id_anotacion: {
      type: "int",
      primary: true,
      generated: true,
    },
    estudiante_id_estudiante: {
      type: "int",
      nullable: false,
    },
    fecha: {
      type: "date",
      nullable: false,
    },
    descripcion: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
    tipo: {
      type: "varchar",
      length: 45,
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
  }
});

export default AnotacionSchema;

"use strict";
import { EntitySchema } from "typeorm";

const ProfesorSchema = new EntitySchema({
  name: "Profesor",
  tableName: "profesor",
  columns: {
    id_profesor: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
    correo: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
    curso: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_PROFESOR",
      columns: ["id_profesor"],
      unique: true,
    },
  ],
});

export default ProfesorSchema;
"use strict";
import { EntitySchema } from "typeorm";

const ApoderadoSchema = new EntitySchema({
  name: "Apoderado",
  tableName: "apoderado",
  columns: {
    id_apoderado: {
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
  },
  indices: [
    {
      name: "IDX_APODERADO",
      columns: ["id_apoderado"],
      unique: true,
    },
  ],
});

export default ApoderadoSchema;
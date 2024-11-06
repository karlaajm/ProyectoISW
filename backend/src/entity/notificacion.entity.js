"use strict";
import { EntitySchema } from "typeorm";

const NotificacionSchema = new EntitySchema({
  name: "Notificacion",
  tableName: "notificacion",
  columns: {
    id_notificacion: {
      type: "int",
      primary: true,
      generated: true,
    },
    fecha: {
      type: "date",
      nullable: false,
    },
    mensaje: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
    apoderado_id_apoderado: {
      type: "int",
      nullable: false,
    },
    estudiante_id_estudiante: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    apoderado: {
      type: "many-to-one",
      target: "Apoderado",
      joinColumn: {
        name: "apoderado_id_apoderado",
      },
      onDelete: "CASCADE",
    },
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
      name: "IDX_NOTIFICACION",
      columns: ["id_notificacion"],
      unique: true,
    },
    {
      name: "IDX_NOTIFICACION_APODERADO",
      columns: ["apoderado_id_apoderado"],
    },
    {
      name: "IDX_NOTIFICACION_ESTUDIANTE",
      columns: ["estudiante_id_estudiante"],
    },
  ],
});

export default NotificacionSchema;
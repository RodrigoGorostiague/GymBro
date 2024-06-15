import { Exercise } from "./exercise.model";

export interface Rutina{
  mes?: Date,
  detalle?: string,
  ejercicios: Exercise[],
}

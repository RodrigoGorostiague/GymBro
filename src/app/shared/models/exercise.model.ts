// exercise.model.ts
export interface Exercise {
  nombre: string;
  detalle: string;
  repeticiones: string;
  series: number;
  descanso: number;
  peso: number;
  completado?: boolean;
}

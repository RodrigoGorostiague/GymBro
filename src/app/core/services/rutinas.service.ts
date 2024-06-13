import { Injectable, signal } from '@angular/core';
import { Exercise } from '../../shared/models/exercise.model';
import { Rutina } from '../../shared/models/rutinas.model';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  constructor() { }
  exercises = signal<Exercise[]>([{
    nombre: 'Flexiones',
    detalle: 'Flexiones de brazos',
    repeticiones: '10',
    series: 3,
    descanso: 30,
    peso: 0
  },
  {
    nombre: 'Abdominales',
    detalle: 'Abdominales inferiores',
    repeticiones: '10',
    descanso: 30,
    series: 3,
    peso: 0
  }])



  exercises2: Exercise[] = [{
    nombre: 'Flexiones2',
    detalle: 'Flexiones de brazos',
    repeticiones: '10',
    series: 3,
    descanso: 30,
    peso: 0
  },
  {
    nombre: 'Sentadillas',
    detalle: 'Sentadillas con peso',
    repeticiones: '10',
    descanso: 30,
    series: 3,
    peso: 10
  },
  {
    nombre: 'Abdominales',
    detalle: 'Abdominales inferiores',
    repeticiones: '10',
    descanso: 30,
    series: 3,
    peso: 0
  }]



  exercises3: Exercise[] = [{
    nombre: 'Flexiones3',
    detalle: 'Flexiones de brazos',
    repeticiones: '10',
    series: 3,
    descanso: 30,
    peso: 0
  },
  {
    nombre: 'Sentadillas',
    detalle: 'Sentadillas con peso',
    repeticiones: '10',
    descanso: 30,
    series: 3,
    peso: 10
  },
  {
    nombre: 'Abdominales',
    detalle: 'Abdominales inferiores',
    repeticiones: '10',
    descanso: 30,
    series: 3,
    peso: 0
  }]

  rutina: Rutina[] = [{
    mes: new Date('2021-05-01'),
    detalle: 'Rutina de ejercicios',
    ejercicios: this.exercises()
  },
  {
    mes: new Date('2021-06-01'),
    detalle: 'Rutina de ejercicios',
    ejercicios: this.exercises2
  },
  {
    mes: new Date('2021-07-01'),
    detalle: 'Rutina de ejercicios',
    ejercicios: this.exercises3
  },
  {
    mes: new Date('2021-08-01'),
    detalle: 'Rutina de ejercicios',
    ejercicios: this.exercises3
  },
  {
  mes: new Date('2021-09-01'),
  detalle: 'Rutina de ejercicios',
  ejercicios: this.exercises3
  }
];

  getExercises(index: number): Exercise[] {
    return this.rutina[index].ejercicios;
  }

  deleteExercise(index: number): void {
    this.exercises.update((exercises) => exercises.splice(index, 1));
  }

  updateExercise(index: number, exercise: Exercise[]): void {
    this.rutina[index].ejercicios = exercise
  }

  getRutinas(): Rutina[] {
    return this.rutina;
  }

  getRutina(index: number): Rutina {
    return this.rutina[index];
  }
}

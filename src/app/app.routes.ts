import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'rutinas',
    loadComponent: () => import('./pages/rutinas/rutinas.component').then(m => m.RutinasComponent),
  },
  {
    path: 'rutinas/detalle/:index',
    loadComponent: () => import('./pages/rutina/rutina.component').then(m => m.RutinaComponent)
  }
];

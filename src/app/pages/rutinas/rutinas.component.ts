import { Component, inject, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { RutinasService } from '../../core/services/rutinas.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-rutinas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatGridListModule, DatePipe, RouterLink],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.scss'
})
export class RutinasComponent {
  rutinaSvc = inject(RutinasService);
  rutinas = signal(this.rutinaSvc.getRutinas())

  color = ['lightblue', 'lightgreen', 'lightpink', '#DDBDF1', 'lightyellow', 'lightcoral', 'lightgoldenrodyellow', 'lightgrey', 'lightcyan', 'lightsalmon', 'lightseagreen', 'lightskyblue'];
  cols = [1, 2, 3, 4];
  rows = [1, 2];
  hover = false;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  getRandomElement(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }
}

import { ChangeDetectionStrategy, Component, ViewChild, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinasService } from '../../core/services/rutinas.service';
import { Exercise } from '../../shared/models/exercise.model';
import { MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogStartComponent } from '../../shared/components/dialog-start/dialog-start.component';

@Component({
  selector: 'app-rutina',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TitleCasePipe,
    MatCheckboxModule,
  ],
  templateUrl: './rutina.component.html',
  styleUrl: './rutina.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RutinaComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  columnsToDisplay: string[] = ['nombre', 'series', 'repeticiones', 'completado'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Exercise | null;

  route = inject(ActivatedRoute);
  router = inject(Router);
  index = 1;
  rutinaSvc = inject(RutinasService);
  exercises = signal<Exercise[]>([]);
  rutina = signal<any>('');
  protected readonly value = signal('');
  readonly dialog = inject(MatDialog);

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
    console.log(this.value());
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.index = +params['index'];
    });
    this.getAllExercises();
    console.log(this.exercises());
  }

  getAllExercises(): void {
    this.rutina.set(this.rutinaSvc.getRutina(this.index));
    this.exercises.set(this.rutina().ejercicios);
  }

  add(): void {
    this.exercises.set([...this.exercises(), {
      nombre: '',
      detalle: '',
      repeticiones: '',
      series: 0,
      descanso: 0,
      peso: 0
    }]);
    this.rutinaSvc.updateExercise(this.index, this.exercises());
  }

  edit(element: Exercise,nombre:string ,series: number, repeticiones: string, descanso: number, peso: number): void {
    element.nombre = nombre;
    element.series = series;
    element.repeticiones = repeticiones;
    element.descanso = descanso;
    element.peso = peso;
    this.rutinaSvc.updateExercise(this.index, this.exercises());
  }

  toggleCompletado(element: Exercise): void {
    element.completado = !element.completado;
    this.rutinaSvc.updateExercise(this.index, this.exercises());
    console.log(this.exercises());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStartComponent, {
      data: {index: this.index},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     if (result !== undefined) {
        this.exercises.set(result);
      }
    });
  }
}

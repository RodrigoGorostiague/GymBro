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
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule
  ],
  templateUrl: './rutina.component.html',
  styleUrl: './rutina.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RutinaComponent {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  columnsToDisplay: string[] = ['series', 'repeticiones', 'descanso', 'peso', 'completado'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Exercise | null;

  route = inject(ActivatedRoute);
  router = inject(Router);
  index = 1;
  rutinaSvc = inject(RutinasService);
  exercises = signal<Exercise[]>([]);
  rutina = signal<any>('');
  counter = 0;
  counterDescanso = 0;
  descansoTime = signal<number>(0);
  descansoP = signal<number>(100);
  hide = false;
  time = 0;
  inteval: any;
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.index = +params['index'];
    });
    this.getAllExercises();
  }

  getAllExercises(): void {
    this.rutina.set(this.rutinaSvc.getRutina(this.index));
    this.exercises.set(this.rutina().ejercicios);
    this.exercises().forEach((exercise) => {
      exercise.completado = false;
    });
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
   }

  edit(index: number): void {

  }
}

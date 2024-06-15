import { Exercise } from './../../models/exercise.model';
import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RutinasService } from '../../../core/services/rutinas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-dialog-start',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './dialog-start.component.html',
  styleUrl: './dialog-start.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogStartComponent {
  readonly dialogRef = inject(MatDialogRef<DialogStartComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  rutinaSvc = inject(RutinasService);
  exercises = signal<Exercise[]>([]);

  color = signal<ThemePalette>('primary');
  counter = signal(0);
  counterDescanso = 0;
  descansoTime = signal<number>(0);
  descansoP = signal<number>(100);
  time = 0;
  inteval: any;

  ngOnInit(): void {
    this.exercises.set(this.rutinaSvc.getRutina(this.data.index).ejercicios);
    if(this.exercises()[this.counter()].completado) {
      this.counter.set(this.counter() + 1);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    clearInterval(this.inteval);
  }

  descanso() {
    console.log('Descanso');
    this.color.set('primary');
    this.descansoTime.set(this.exercises()[this.counter()].descanso);
    let descanso = this.exercises()[this.counter()].descanso;
    this.time = 0;
    this.descansoP.set(100);
    clearInterval(this.inteval)
    this.inteval = setInterval(() => {
    this.time++;
    if(this.descansoTime() !== 0) {
    this.descansoTime.update((n) => n - 1);
    if (this.descansoTime() < 10){
      this.color.set('warn');
    }else{
      this.color.set('primary');
    }
    }

    this.descansoP.set(
      100 - (this.time / descanso) * 100
    );
    if (this.descansoTime() === 0) {
      this.clear();
      this.descansoP.set(100);
    }
  }, 1000);

  }

  clear(){
    clearInterval(this.inteval);
    this.counterDescanso++;
    if (this.counterDescanso === this.exercises()[this.counter()].series) {
      this.next();
    }
  }

  next() {
    if (this.counter() < this.exercises().length) { // Verificar límite superior
      this.exercises()[this.counter()].completado = true;
      this.counter.set(this.counter() + 1);
      if(this.exercises()[this.counter()].completado) {
        this.counter.set(this.counter() + 1);
      }
      this.counterDescanso = 0;
      clearInterval(this.inteval);
    }
  }

  back() {
    if (this.counter() > 0) { // Verificar límite inferior
      this.exercises()[this.counter() - 1].completado = false;
      this.counter.set(this.counter() - 1);
      if(this.exercises()[this.counter()].completado) {
        this.counter.set(this.counter() - 1);
      }
      this.counterDescanso = 0;
      clearInterval(this.inteval);
    }
  }
}

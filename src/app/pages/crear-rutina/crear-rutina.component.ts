import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Rutina } from '../../shared/models/rutinas.model';
import { Exercise } from '../../shared/models/exercise.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    DatePipe,
    TitleCasePipe,
    MatTableModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crear-rutina.component.html',
  styleUrl: './crear-rutina.component.scss',
})
export class CrearRutinaComponent {
  readonly date = new FormControl(moment());
  rutina = signal<Rutina>({ mes: undefined, ejercicios: [] });
  displayedColumns: string[] = ['nombre', 'repeticiones', 'series', 'descanso', 'peso'];

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    console.log(this.date.value)
  }
  add(nombreInput:string, detalleInput:string, repInput:string, seriesInput:string, descansoInput:string, pesoInput:string){
    const ejercicio: Exercise = {
      nombre: nombreInput,
      detalle: detalleInput,
      repeticiones: repInput,
      series: parseInt(seriesInput),
      descanso: parseInt(descansoInput),
      peso: parseInt(pesoInput),
    }
      this.rutina.update((rutina) => {

          rutina.mes = this.date.value?.toDate();
          rutina?.ejercicios.push(ejercicio);
        return rutina;
      });
    console.log(this.rutina());
  }

}

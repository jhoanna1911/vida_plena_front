import { Component, OnInit, Injectable } from '@angular/core';
import {
	NgbCalendar,
	NgbDatepickerModule,
	NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ActividadesService } from 'app/services/actividades/actividades.service';
import { Actividad } from 'app/model/actividad';

@Component({
  selector: 'app-user-profile',
  standalone: true,
	imports: [NgbDatepickerModule, FormsModule, JsonPipe],
   templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

	fechaActual: Date;
	model: NgbDateStruct;
	date: { day: number; year: number; month: number };
	actividad: Actividad;

  ngOnInit() {
	this.fechaActual = new Date();
	this.consultarActividad(this.fechaActual);

  }

	constructor(private calendar: NgbCalendar,
		private service: ActividadesService) {}

	selectToday() {
		this.model = this.calendar.getToday();
	}

	consultarActividad(fecha: Date) {
		const fechaFormateada = this.formatDate(fecha);
		this.service.consultarActividad(fechaFormateada).subscribe({
		  next: (resp) => {
			this.actividad = resp;
		  },
		  error: (e: any) =>
			console.error(e)
		})
	  }

	  formatDate(date: Date): string {
		const day = ('0' + date.getDate()).slice(-2);
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const year = date.getFullYear().toString().slice(-2);
	
		return `${day}/${month}/${year}`;
	  }

	  convertirFechaALetras(fecha: string): string {
		const fechaDate = new Date(fecha);
		return this.formatDateToLetters(fechaDate); 
	  }

	  formatDateToLetters(dateValue: any): string {
		if (!dateValue) return '';
		const date = new Date(dateValue);
		if (isNaN(date.getTime())) return '';
		const options: Intl.DateTimeFormatOptions = {
		  year: 'numeric',
		  month: 'long',
		  day: 'numeric'
		};
		return date.toLocaleDateString('es-ES', options);
	  }
}

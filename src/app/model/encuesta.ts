import { Validators } from "@angular/forms";

export interface Encuesta {
    respuesta1: string;
    respuesta2: string;
    respuesta3: string;
    calificacion: string;
}

export const ENCUESTAFORM = {
    respuesta1: ['', Validators.required],
    respuesta2: ['', Validators.required],
    respuesta3: ['', Validators.required],
    calificacion: ['', Validators.required],
}
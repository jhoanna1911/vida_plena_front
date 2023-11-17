import { Validators } from "@angular/forms";

export interface Usuario {
    idUsuario: number;
    login: string;
    contrasena: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: Date;
    idEps: number;
    eps: string;
    celular: string;
    direccion: string;
    email: string;
    nombreContacto: string;
    telefonoContacto: string;
    parentescoContacto: string;
    fechaCreacion: Date;
}

export const USUARIOFORM = {
    login: ['', Validators.required],
    contrasena: ['', Validators.required],
    contrasenaRep: ['', Validators.required],
    primerNombre: ['', Validators.required],
    segundoNombre: ['', Validators.required],
    primerApellido: ['', Validators.required],
    segundoApellido: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    idEps: [''],
    eps: ['', Validators.required],
    celular: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', Validators.required],
    nombreContacto: ['', Validators.required],
    telefonoContacto: ['', Validators.required],
    parentescoContacto: ['', Validators.required]
}

export const USUARIOSESIONFORM = {
    login: ['', Validators.required],
    contrasena: ['', Validators.required]
}
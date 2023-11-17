import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { USUARIOFORM, USUARIOSESIONFORM, Usuario } from 'app/model/usuario';
import { AuthService } from 'app/services/auth-service.service';
import { LocalStorage } from 'app/services/local-storage/local-storage.service';
import { LoginService } from 'app/services/login/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registroForm: FormGroup;
  habilitarMenu: boolean = false;
  habilitarRegistro: boolean = false;
  infoUsuario: Usuario;
  private localStorageKey = 'infoUsuario';
  correoOlvidoContrasena: string;
  listaEps: any;
  coincide: boolean = true;
  editMode: boolean = false;

  fechas: { dia: number; mes: number; año: number }[] = [
    { dia: 1, mes: 1, año: 2023 },
    { dia: 15, mes: 3, año: 2023 },
    { dia: 30, mes: 6, año: 2023 }
  ];

  constructor(public fb: FormBuilder,
    public service: LoginService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorage,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    const storedUserInfo = this.localStorageService.getItem(this.localStorageKey);
    if (storedUserInfo) {
      this.infoUsuario = storedUserInfo;
    } this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.habilitarMenu = isLoggedIn;
    }
    );
    this.loginForm = this.fb.group(USUARIOSESIONFORM);
    this.registroForm = this.fb.group(USUARIOFORM);
    this.obtenerListaEps();
  }

  validarCampoObligatorioLog(campo: string): boolean {
    return this.loginForm.get(campo).invalid && this.loginForm.get(campo).touched;
  }

  validarCampoObligatorioReg(campo: string): boolean {
    return this.registroForm.get(campo).invalid && this.registroForm.get(campo).touched;
  }

  obtenerListaEps() {
    this.service.obtenerListaEps().subscribe({
      next: (resp) => {
        this.listaEps = resp['lista'];
      },
      error: (e: any) =>
        console.error(e)
    })
  }

  validarLogin() {
    this.spinner.show();
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.spinner.hide();
      return;
    }
    else {
      this.service.validarUsuario(this.loginForm.value).subscribe({
        next: (resp) => {
          if (resp) {
            this.service.consularInfoUsuario(this.loginForm.value.login).subscribe({
              next: (resp) => {
                this.habilitarMenu = true;
                this.authService.login();
                this.infoUsuario = resp;
                this.localStorageService.setItem(this.localStorageKey, this.infoUsuario);
              },
              error: (e: any) =>
                console.error(e)
            });
            Swal.fire({
              title: "Bienvenido!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Por favor verifique',
              text: 'Usuario o contraseña invalidos'
            })
          }
        }
      })
    }
  }

  cerrarSesion() {
    Swal.fire({
      title: 'Cerrar sesión',
      text: "¿Está seguro de salir?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: 'rgb(45 179 49)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habilitarMenu = false;
        this.authService.logout();
      }
    })
  }

  olvidoContrasena() {
    Swal.fire({
      title: 'Recordar contraseña',
      html: 'Por favor, introduzca el correo asociado al login:<br><input type="text" id="swal-input1" class="swal2-input">',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: 'rgb(45 179 49)',
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const correoInput = document.getElementById('swal-input1') as HTMLInputElement;
        this.correoOlvidoContrasena = correoInput.value;
        if (this.correoOlvidoContrasena) {
          if (this.validaCorreo(this.correoOlvidoContrasena)) {
            this.service.recordarContrasena(this.correoOlvidoContrasena).subscribe({
              next: (resp) => {
                Swal.fire({
                  title: "Se ha enviado la contraseña al correo asociado!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500
                })
              },
              error: (e: any) =>
                console.error(e)
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Debe introducir un correo valido'
            })
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe introducir un correo valido'
          })
        }
      }
    })
  }

  validaCorreo(correo: string): boolean {
    let EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(correo);
  }

  registro() {
    this.habilitarRegistro = true;
    this.coincide = true;
  }

  registrarUsuario() {
    this.listarUsuarios(this.registroForm.value.login, this.registroForm.value.email);
    if (this.registroForm.value.eps) {
      this.registroForm.controls['idEps'].setValue(this.registroForm.value.eps);
    }
    if (this.registroForm.invalid) {
      Object.values(this.registroForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.spinner.hide();
      return;
    }
    else {
      if (this.registroForm.value.contrasena == this.registroForm.value.contrasenaRep) {
        this.service.guardarUsuario(this.registroForm.value).subscribe({
          next: (resp) => {
            if (resp = 1) {
              Swal.fire({
                title: "Usuario registrado con exito!",
                icon: "success",
                showConfirmButton: false,
                timer: 3000
              });
              this.registroForm.reset();
              this.cancelar();
            }
          },
          error: (err: any) => {
          },
        })
      }
      else {
        this.coincide = false;
      }
    }
  }

  actualizarDatos() {
    Swal.fire({
      icon: 'info',
      title: 'En planeación',
      text: 'Esta funcionalidad será implementada en la segunda fase del proyecto'
    })
  }

  cancelar() {
    this.registroForm.reset();
    this.habilitarRegistro = false;
    this.router.navigate(['/']);
  }

  listarUsuarios(login: String, email: string) {
    this.service.consularListaUsuario().subscribe({
      next: (resp) => {
        const loginExistente = resp['lista'].some(usuario => usuario.login === login);
        const emailExistente = resp['lista'].some(usuario => usuario.email === email);
        if (loginExistente) {
          Swal.fire({
            icon: 'error',
            title: 'Por favor verifique',
            text: 'El nombre de usuario ya existe'
          })
        }
        else if (emailExistente) {
          Swal.fire({
            icon: 'error',
            title: 'Por favor verifique',
            text: 'El correo ya está registrado'
          })
        }
      },
      error: (e: any) =>
        console.error(e)
    });
  }
}

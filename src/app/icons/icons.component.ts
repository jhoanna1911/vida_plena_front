import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENCUESTAFORM } from 'app/model/encuesta';
import { EncuestaService } from 'app/services/encuesta/encuesta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  selectedRating: string;
  encuestaForm: FormGroup;
  
  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private service: EncuestaService) { }

  ngOnInit() {
    this.encuestaForm = this.fb.group(ENCUESTAFORM);
  }

  validarCampoObligatorio(campo: string): boolean {
    return this.encuestaForm.get(campo).invalid && this.encuestaForm.get(campo).touched;
  }

  guardarEncuesta() {
    if (this.encuestaForm.invalid) {
      Object.values(this.encuestaForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.spinner.hide();
      return;
    }
    else {
      this.service.guardarEncuesta(this.encuestaForm.value).subscribe({
        next: (resp) => {
          if(resp = 1){
            Swal.fire({
              title: "Gracias, tu opinión es importante!",
              icon: "success",
              showConfirmButton: false,
              timer: 3000
            });
            this.encuestaForm.reset();
          }
        },
        error: (err: any) => {
        },
      })
      
    }
  }

}

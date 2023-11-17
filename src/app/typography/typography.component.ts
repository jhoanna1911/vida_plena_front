import { Component, OnInit } from '@angular/core';
import { Eps } from 'app/model/eps';
import { EpsService } from 'app/services/eps/eps.service';
import { LocalStorage } from 'app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})

export class TypographyComponent implements OnInit {
  idEps: number;
  eps: Eps;


  constructor(private localStorageService: LocalStorage,
    private service: EpsService) { }

  ngOnInit() {
    const storedUserInfo = this.localStorageService.getItem('infoUsuario');
    if (storedUserInfo) {
      this.idEps = storedUserInfo.idEps;
      this.consultarInfoEps(this.idEps);
    }
  }

  consultarInfoEps(idEps: number) {
    this.service.consularInfoEps(idEps).subscribe({
      next: (resp) => {
        this.eps = resp;
      },
      error: (e: any) =>
        console.error(e)
    })
  }

}

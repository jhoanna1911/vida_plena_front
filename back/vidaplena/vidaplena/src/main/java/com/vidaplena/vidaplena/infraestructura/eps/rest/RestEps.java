package com.vidaplena.vidaplena.infraestructura.eps.rest;

import com.vidaplena.vidaplena.aplicacion.eps.dto.Eps;
import com.vidaplena.vidaplena.infraestructura.eps.servicio.ServiceEps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/eps")
public class RestEps {
    @Autowired
    private ServiceEps serviceEps;
    @GetMapping("/consultar")
    public ResponseEntity<Eps> obtenerInformacionEps(@RequestParam Long idEps){
        try {
            Eps infoEps = new Eps();
            infoEps = serviceEps.obtenerInformacionEps(idEps);
            return ResponseEntity.ok(infoEps);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

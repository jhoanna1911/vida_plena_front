package com.vidaplena.vidaplena.infraestructura.actividad.rest;

import com.vidaplena.vidaplena.aplicacion.actividad.dto.Actividad;
import com.vidaplena.vidaplena.aplicacion.eps.dto.Eps;
import com.vidaplena.vidaplena.infraestructura.actividad.servicio.ServicioActividad;
import com.vidaplena.vidaplena.infraestructura.eps.servicio.ServiceEps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/actividad")
public class RestActividad {
    @Autowired
    private ServicioActividad servicioActividad;
    @GetMapping("/consultar")
    public ResponseEntity<Actividad> obtenerInformacionActividad(@RequestParam String fecha){
        try {
            Actividad actividad = new Actividad();
            actividad = servicioActividad.obtenerInformacionActividad(fecha);
            return ResponseEntity.ok(actividad);
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

package com.vidaplena.vidaplena.infraestructura.encuesta.rest;

import com.vidaplena.vidaplena.aplicacion.encuesta.dto.Encuesta;
import com.vidaplena.vidaplena.infraestructura.encuesta.servicio.ServiceEncuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/encuesta")
public class RestEncuesta {
    @Autowired
    private ServiceEncuesta serviceEncuesta;
    @PostMapping("/guardar")
    public int guardarEncuesta(@RequestBody Encuesta encuesta){
        return serviceEncuesta.guardarEncuesta(encuesta);
    }

}

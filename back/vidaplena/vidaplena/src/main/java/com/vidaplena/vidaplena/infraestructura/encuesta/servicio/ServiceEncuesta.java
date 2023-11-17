package com.vidaplena.vidaplena.infraestructura.encuesta.servicio;

import com.vidaplena.vidaplena.aplicacion.encuesta.dto.Encuesta;
import org.springframework.http.ResponseEntity;

public interface ServiceEncuesta {
    public int guardarEncuesta(Encuesta encuesta);
}

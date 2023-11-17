package com.vidaplena.vidaplena.infraestructura.encuesta.servicio;

import com.vidaplena.vidaplena.aplicacion.encuesta.dto.Encuesta;
import com.vidaplena.vidaplena.dominio.encuesta.persistencia.EncuestaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;


@Service
public class ServiceEncuestaImpl implements ServiceEncuesta{
    @Autowired
    private EncuestaMapper encuestaMapper;
    public int guardarEncuesta(Encuesta encuesta) {
        return encuestaMapper.guardarEncuesta(encuesta);
    }
}

package com.vidaplena.vidaplena.aplicacion.encuesta.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Repository
public class Encuesta {
    private Long idEncuesta;
    private String respuesta1;
    private String respuesta2;
    private String respuesta3;
    private String calificacion;
    private Date fechaCreacion;
}

package com.vidaplena.vidaplena.aplicacion.actividad.dto;

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
public class Actividad {
    private Long idActividad;
    private String nombre;
    private String fecha;
    private String descripcion;
    private String hora;
    private String lugar;
    private String imagen;
    private Date fechaCreacion;
}

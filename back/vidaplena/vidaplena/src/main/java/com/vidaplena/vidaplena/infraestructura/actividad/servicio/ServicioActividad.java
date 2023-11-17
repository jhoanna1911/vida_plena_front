package com.vidaplena.vidaplena.infraestructura.actividad.servicio;

import com.vidaplena.vidaplena.aplicacion.actividad.dto.Actividad;

import java.util.Date;
import java.util.List;

public interface ServicioActividad {
    public Actividad obtenerInformacionActividad(String fecha);
}

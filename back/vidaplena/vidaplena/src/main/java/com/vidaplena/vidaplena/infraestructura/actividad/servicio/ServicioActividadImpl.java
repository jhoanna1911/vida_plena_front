package com.vidaplena.vidaplena.infraestructura.actividad.servicio;

import com.vidaplena.vidaplena.aplicacion.actividad.dto.Actividad;
import com.vidaplena.vidaplena.dominio.actividad.persistencia.ActividadMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ServicioActividadImpl implements ServicioActividad{
    @Autowired
    private ActividadMapper actividadMapper;
    public Actividad obtenerInformacionActividad(String fecha){
        System.out.println(actividadMapper.obtenerInformacionActividad(fecha));
        return actividadMapper.obtenerInformacionActividad(fecha);
    };
}

package com.vidaplena.vidaplena.dominio.actividad.persistencia;

import com.vidaplena.vidaplena.aplicacion.actividad.dto.Actividad;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;

@Mapper
public interface ActividadMapper {
    @Select("SELECT nombre, fecha_actividad AS fecha, descripcion, hora_actividad AS hora, lugar, imagen\n" +
            "FROM actividad\n" +
            "WHERE fecha_actividad = #{fecha}\n" +
            "OR fecha_actividad = (\n" +
            "    SELECT MIN(fecha_actividad)\n" +
            "    FROM actividad\n" +
            "    WHERE fecha_actividad >= #{fecha}\n" +
            ")")
    public Actividad obtenerInformacionActividad(String fecha);
}

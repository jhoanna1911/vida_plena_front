package com.vidaplena.vidaplena.dominio.encuesta.persistencia;

import com.vidaplena.vidaplena.aplicacion.encuesta.dto.Encuesta;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface EncuestaMapper {
    @Insert("INSERT INTO ENCUESTA (PREGUNTA1, PREGUNTA2, PREGUNTA3, CALIFICACION, FECHA_CREACION)\n" +
            "VALUES (#{respuesta1}, #{respuesta2}, #{respuesta3}, #{calificacion}, SYSDATE)")
    int guardarEncuesta(Encuesta encuesta);

}

package com.vidaplena.vidaplena.dominio.eps.persistencia;

import com.vidaplena.vidaplena.aplicacion.eps.dto.Eps;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EpsMapper {
    @Select("select nombre, url, url_citas citas, url_urg_medicas urgMedicas, url_urg_odonto urgOdontologicas,\n" +
            "url_ambulancia urgAmbulancias, url_prioritaria urgPrioritaria\n" +
            "from eps\n" +
            "where id_eps = #{idEps}")
    public Eps obtenerInformacionEps(Long idEps);
}

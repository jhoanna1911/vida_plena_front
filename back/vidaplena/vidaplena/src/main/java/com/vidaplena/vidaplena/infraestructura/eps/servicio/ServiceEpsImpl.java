package com.vidaplena.vidaplena.infraestructura.eps.servicio;

import com.vidaplena.vidaplena.aplicacion.eps.dto.Eps;
import com.vidaplena.vidaplena.dominio.eps.persistencia.EpsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceEpsImpl implements ServiceEps{
    @Autowired
    private EpsMapper epsMapper;
    public Eps obtenerInformacionEps(Long idEps) {
        return epsMapper.obtenerInformacionEps(idEps);
    }
}

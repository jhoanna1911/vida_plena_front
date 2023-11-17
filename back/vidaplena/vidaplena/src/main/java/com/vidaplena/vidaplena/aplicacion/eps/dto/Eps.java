package com.vidaplena.vidaplena.aplicacion.eps.dto;

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
public class Eps {
    private Long idEps;
    private String nombre;
    private String url;
    private String citas;
    private String urgMedicas;
    private String urgOdontologicas;
    private String urgAmbulancias;
    private String urgPrioritaria;
    private Date fechaCreacion;
}

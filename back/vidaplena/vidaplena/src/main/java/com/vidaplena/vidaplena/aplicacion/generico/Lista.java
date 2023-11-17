package com.vidaplena.vidaplena.aplicacion.generico;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Repository;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@ToString
@Repository
public class Lista {
    private String codigoRespuesta;
    private String mensajeRespuesta;
    private int totalRegistros;
    private int totalPaginas;
    private List<?> lista;
}

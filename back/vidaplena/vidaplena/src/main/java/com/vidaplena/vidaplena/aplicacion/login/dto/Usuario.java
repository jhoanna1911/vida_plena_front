package com.vidaplena.vidaplena.aplicacion.login.dto;

import org.springframework.stereotype.Repository;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Repository
public class Usuario {
    private Long idUsuario;
    private String login;
    private String contrasena;
    private String primerNombre;
    private String segundoNombre;
    private String primerApellido;
    private String segundoApellido;
    private Date fechaNacimiento;
    private Long idEps;
    private String eps;
    private String celular;
    private String direccion;
    private String email;
    private String nombreContacto;
    private String telefonoContacto;
    private String parentescoContacto;
    private Date fechaCreacion;
}

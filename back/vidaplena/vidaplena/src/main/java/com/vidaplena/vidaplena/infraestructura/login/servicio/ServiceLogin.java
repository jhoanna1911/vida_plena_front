package com.vidaplena.vidaplena.infraestructura.login.servicio;

import com.vidaplena.vidaplena.aplicacion.encuesta.dto.Encuesta;
import com.vidaplena.vidaplena.aplicacion.generico.Lista;
import com.vidaplena.vidaplena.aplicacion.login.dto.Usuario;

public interface ServiceLogin {
    public boolean consultaUsuario(Usuario usuario);
    public Usuario obtenerInformacionUsuario(String login);
    public boolean recordarContrasena(String correo);
    public int guardarUsuario(Usuario usuario);
    public Lista consultarListaEps() throws Exception;
    public Lista consultarListaUsuario();
}

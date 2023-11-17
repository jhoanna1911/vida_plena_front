package com.vidaplena.vidaplena.infraestructura.login.rest;

import com.vidaplena.vidaplena.aplicacion.login.dto.Usuario;
import com.vidaplena.vidaplena.infraestructura.login.servicio.ServiceLogin;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.vidaplena.vidaplena.aplicacion.generico.Lista;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RestLoginTest {

    @InjectMocks
    private RestLogin restLogin;

    @Mock
    private ServiceLogin serviceLogin;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testConsultaUsuario() {
        Usuario usuario = new Usuario();
        usuario.setLogin("testUser");
        when(serviceLogin.consultaUsuario(usuario)).thenReturn(true);

        boolean result = restLogin.consultaUsuario(usuario);

        assertTrue(result);
    }

    @Test
    void testObtenerInformacionUsuario() {
        String login = "testUser";
        Usuario infoUsuario = new Usuario();
        infoUsuario.setLogin(login);
        when(serviceLogin.obtenerInformacionUsuario(login)).thenReturn(infoUsuario);

        ResponseEntity<Usuario> response = restLogin.obtenerInformacionUsuario(login);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(infoUsuario, response.getBody());
    }

    @Test
    void testRecordarContrasena() {
        String correo = "test@example.com";
        when(serviceLogin.recordarContrasena(correo)).thenReturn(true);

        boolean result = restLogin.recordarContrasena(correo);

        assertTrue(result);
    }

    @Test
    void testGuardarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setLogin("testUser");
        when(serviceLogin.guardarUsuario(usuario)).thenReturn(1);

        int result = restLogin.guardarUsuario(usuario);

        assertEquals(1, result);
    }

    @Test
    void testConsultarListaEps() throws Exception {
        Lista respuesta = new Lista();
        when(serviceLogin.consultarListaEps()).thenReturn(respuesta);

        ResponseEntity<Lista> response = restLogin.consultarListaEps();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(respuesta, response.getBody());
    }

}
package com.vidaplena.vidaplena.infraestructura.login.rest;

import com.vidaplena.vidaplena.aplicacion.generico.Lista;
import com.vidaplena.vidaplena.aplicacion.login.dto.Usuario;
import com.vidaplena.vidaplena.infraestructura.login.servicio.ServiceLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class RestLogin {
    @Autowired
    private ServiceLogin serviceLogin;
    @PostMapping("/consultarUsuario")
    public boolean consultaUsuario(@RequestBody Usuario usuario){
        return serviceLogin.consultaUsuario(usuario);
    }

    @GetMapping("/informacionUsuario")
    public ResponseEntity<Usuario> obtenerInformacionUsuario(@RequestParam String login){
        try {
            Usuario infoUsuario = new Usuario();
            infoUsuario = serviceLogin.obtenerInformacionUsuario(login);
            return ResponseEntity.ok(infoUsuario);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/recordarContrasena")
    public boolean recordarContrasena(@RequestBody String correo){
        return serviceLogin.recordarContrasena(correo);
    }

    @PostMapping("/guardar")
    public int guardarUsuario(@RequestBody Usuario usuario){
        System.out.println(usuario);
        return serviceLogin.guardarUsuario(usuario);
    }

    @GetMapping("/consultarEps")
    public ResponseEntity<Lista> consultarListaEps() throws Exception{
        Lista respuesta = null;
        try {
            respuesta = serviceLogin.consultarListaEps();
            return new ResponseEntity<Lista>(respuesta, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/consultarLista")
    public ResponseEntity<Lista> consultarListaUsuario() throws Exception{
        Lista respuesta = null;
        try {
            respuesta = serviceLogin.consultarListaUsuario();
            return new ResponseEntity<Lista>(respuesta, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

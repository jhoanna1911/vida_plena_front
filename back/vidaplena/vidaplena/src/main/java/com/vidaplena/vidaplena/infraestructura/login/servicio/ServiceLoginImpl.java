package com.vidaplena.vidaplena.infraestructura.login.servicio;

import com.vidaplena.vidaplena.aplicacion.eps.dto.Eps;
import com.vidaplena.vidaplena.aplicacion.generico.Lista;
import com.vidaplena.vidaplena.aplicacion.login.dto.Usuario;
import com.vidaplena.vidaplena.dominio.login.persistencia.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class ServiceLoginImpl implements ServiceLogin{
    @Autowired
    private LoginMapper loginMapper;

    public boolean consultaUsuario(Usuario usuario) {
        int count = loginMapper.consultaUsuario(usuario);
        return count > 0;
    }

    public Usuario obtenerInformacionUsuario(String login) {
        return loginMapper.obtenerInformacionUsuario(login);
    }

    public Lista consultarListaUsuario() {
        Lista respuesta = new Lista();
        List<Usuario> listado = loginMapper.consultarListaUsuario();
        respuesta.setLista(listado);
        return respuesta;
    }

    public boolean recordarContrasena(String correo) {
        String contrasena = loginMapper.recordarContrasena(correo);
        final String username = "plenav89@gmail.com";
        final String password = "20192263Lo_123";
        if (!contrasena.isEmpty()) {
            Properties envioCorreo = new Properties();
            envioCorreo.put("mail.smtp.host", "smtp.gmail.com");
            envioCorreo.put("mail.smtp.starttls.enable", "true");
            envioCorreo.put("mail.smtp.port", "587");
            envioCorreo.put("mail.smtp.auth", "true");

            Session session = Session.getInstance(envioCorreo, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });

            try {
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(username));
                message.addRecipient(Message.RecipientType.TO, new InternetAddress("lore.dev@hotmail.com"));
                message.setSubject("Recordar contraseña");
                message.setText("Su contraseña es: " + contrasena);
                System.out.println(message);

                Transport.send(message);
            } catch (MessagingException me) {
                me.printStackTrace();
            }
            return true;
        } else {
            return false;
        }
    }

    public int guardarUsuario(Usuario usuario) {
        System.out.println(usuario);
        return loginMapper.guardarUsuario(usuario);
    }

    public Lista consultarListaEps() throws Exception {
        Lista lista = new Lista();
        List<Eps> listaEps = new ArrayList<Eps>();
        try {
            listaEps = loginMapper.consultarListaEps();
            lista.setLista(listaEps);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return lista;
    }

}

package com.vidaplena.vidaplena.dominio.login.persistencia;

import com.vidaplena.vidaplena.aplicacion.encuesta.dto.Encuesta;
import com.vidaplena.vidaplena.aplicacion.eps.dto.Eps;
import com.vidaplena.vidaplena.aplicacion.login.dto.Usuario;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface LoginMapper {
    @Select("SELECT COUNT(*) FROM usuario WHERE login = #{login} and contrasena = #{contrasena}")
    public int consultaUsuario(Usuario usuario);

    @Select("SELECT\n" +
            "    u.primer_nombre                AS primernombre,\n" +
            "    u.segundo_nombre               AS segundonombre,\n" +
            "    u.primer_apellido              AS primerapellido,\n" +
            "    u.segundo_apellido             AS segundoapellido,\n" +
            "    u.fecha_nacimiento             AS fechanacimiento,\n" +
            "    e.nombre AS eps, u.eps AS idEps,\n" +
            "    u.celular,\n" +
            "    u.direccion,\n" +
            "    u.email,\n" +
            "    u.nombre_contacto_emergencia   AS nombrecontacto,\n" +
            "    u.telefono_contacto_emergencia AS telefonocontacto,\n" +
            "    u.parentesco_emergencia        AS parentescocontacto,\n" +
            "    u.fecha_creacion               AS fechacreacion\n" +
            "FROM\n" +
            "         usuario u\n" +
            "    INNER JOIN eps e ON e.id_eps = u.eps\n" +
            "    where login = #{login}")
    public Usuario obtenerInformacionUsuario(String login);

    @Select("SELECT COUNT(*) FROM usuario WHERE login = #{login} and contrasena = #{contrasena}")
    public String recordarContrasena(String correo);

    @Insert("INSERT INTO USUARIO (LOGIN, CONTRASENA, PRIMER_NOMBRE, SEGUNDO_NOMBRE, \n" +
            "PRIMER_APELLIDO, SEGUNDO_APELLIDO, FECHA_NACIMIENTO, EPS, CELULAR, DIRECCION,\n" +
            "EMAIL, NOMBRE_CONTACTO_EMERGENCIA, TELEFONO_CONTACTO_EMERGENCIA, PARENTESCO_EMERGENCIA, FECHA_CREACION)\n" +
            "VALUES (#{login}, #{contrasena}, #{primerNombre}, #{segundoNombre},\n" +
            "#{primerApellido}, #{segundoApellido}, #{fechaNacimiento}, #{idEps}, #{celular}, #{direccion},\n" +
            "#{email}, #{nombreContacto}, #{telefonoContacto}, #{parentescoContacto}, SYSDATE)")
    int guardarUsuario(Usuario usuario);

    @Select("select nombre, id_eps idEps from eps")
    public List<Eps> consultarListaEps();

    @Select("SELECT login, email FROM usuario")
    public List<Usuario> consultarListaUsuario();

}

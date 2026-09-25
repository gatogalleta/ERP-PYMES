package com.erppymes.dao;

import com.erppymes.config.ConexionBD;
import com.erppymes.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UsuarioDAO {

    // =========================================
    // INSERTAR USUARIO
    // =========================================
    public boolean crearUsuario(Usuario usuario) {

        String sql = "INSERT INTO usuarios " +
                     "(nombre, email, password, rol, estado) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection conexion = ConexionBD.conectar();
             PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setString(1, usuario.getNombre());
            sentencia.setString(2, usuario.getEmail());
            sentencia.setString(3, usuario.getPassword());
            sentencia.setString(4, usuario.getRol());
            sentencia.setBoolean(5, usuario.isEstado());

            int filasAfectadas = sentencia.executeUpdate();

            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.out.println("Error al crear usuario: " + e.getMessage());
            return false;
        }
    }

    // =========================================
    // CONSULTAR USUARIOS
    // =========================================
    public List<Usuario> consultarUsuarios() {

        List<Usuario> usuarios = new ArrayList<>();

        String sql = "SELECT id_usuario, nombre, email, password, rol, estado " +
                     "FROM usuarios";

        try (Connection conexion = ConexionBD.conectar();
             PreparedStatement sentencia = conexion.prepareStatement(sql);
             ResultSet resultado = sentencia.executeQuery()) {

            while (resultado.next()) {

                Usuario usuario = new Usuario();

                usuario.setIdUsuario(resultado.getInt("id_usuario"));
                usuario.setNombre(resultado.getString("nombre"));
                usuario.setEmail(resultado.getString("email"));
                usuario.setPassword(resultado.getString("password"));
                usuario.setRol(resultado.getString("rol"));
                usuario.setEstado(resultado.getBoolean("estado"));

                usuarios.add(usuario);
            }

        } catch (SQLException e) {
            System.out.println("Error al consultar usuarios: " + e.getMessage());
        }

        return usuarios;
    }

    // =========================================
    // ACTUALIZAR USUARIO
    // =========================================
    public boolean actualizarUsuario(Usuario usuario) {

        String sql = "UPDATE usuarios SET " +
                     "nombre = ?, email = ?, password = ?, rol = ?, estado = ? " +
                     "WHERE id_usuario = ?";

        try (Connection conexion = ConexionBD.conectar();
             PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setString(1, usuario.getNombre());
            sentencia.setString(2, usuario.getEmail());
            sentencia.setString(3, usuario.getPassword());
            sentencia.setString(4, usuario.getRol());
            sentencia.setBoolean(5, usuario.isEstado());
            sentencia.setInt(6, usuario.getIdUsuario());

            int filasAfectadas = sentencia.executeUpdate();

            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.out.println("Error al actualizar usuario: " + e.getMessage());
            return false;
        }
    }

    // =========================================
    // ELIMINAR USUARIO
    // =========================================
    public boolean eliminarUsuario(int idUsuario) {

        String sql = "DELETE FROM usuarios WHERE id_usuario = ?";

        try (Connection conexion = ConexionBD.conectar();
             PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setInt(1, idUsuario);

            int filasAfectadas = sentencia.executeUpdate();

            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.out.println("Error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }
}
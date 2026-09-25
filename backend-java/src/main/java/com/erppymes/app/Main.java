package com.erppymes.app;

import com.erppymes.dao.UsuarioDAO;
import com.erppymes.model.Usuario;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        System.out.println("=================================");
        System.out.println("   ERP PARA PYMES - CRUD JDBC");
        System.out.println("=================================");

        UsuarioDAO usuarioDAO = new UsuarioDAO();

        // =========================================
        // BUSCAR USUARIO DE PRUEBA
        // =========================================

        List<Usuario> usuarios = usuarioDAO.consultarUsuarios();

        Usuario usuarioPrueba = null;

        for (Usuario usuario : usuarios) {

            if (usuario.getEmail().equals("usuario.prueba@erppymes.com")) {
                usuarioPrueba = usuario;
                break;
            }
        }

        // =========================================
        // ELIMINAR USUARIO
        // =========================================

        if (usuarioPrueba != null) {

            boolean eliminado =
                    usuarioDAO.eliminarUsuario(usuarioPrueba.getIdUsuario());

            if (eliminado) {
                System.out.println("\nUsuario eliminado correctamente.");
            } else {
                System.out.println("\nNo fue posible eliminar el usuario.");
            }

        } else {
            System.out.println("\nNo se encontró el usuario de prueba.");
        }

        // =========================================
        // CONSULTAR DESPUÉS DE ELIMINAR
        // =========================================

        System.out.println("\n--- USUARIOS DESPUÉS DE LA ELIMINACIÓN ---");

        List<Usuario> usuariosFinales = usuarioDAO.consultarUsuarios();

        for (Usuario usuario : usuariosFinales) {
            System.out.println(usuario);
        }

        System.out.println("\n=================================");
        System.out.println("Prueba de eliminación finalizada.");
        System.out.println("=================================");
    }
}
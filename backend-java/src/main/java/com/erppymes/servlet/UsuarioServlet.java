package com.erppymes.servlet;

import com.erppymes.dao.UsuarioDAO;
import com.erppymes.model.Usuario;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/usuarios")
public class UsuarioServlet extends HttpServlet {

    private UsuarioDAO usuarioDAO;

    @Override
    public void init() {
        usuarioDAO = new UsuarioDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        List<Usuario> usuarios = usuarioDAO.consultarUsuarios();

        request.setAttribute(
                "mensaje",
                "Consulta de usuarios realizada correctamente."
        );

        request.setAttribute("usuarios", usuarios);

        request.getRequestDispatcher("/usuarios.jsp")
                .forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String accion = request.getParameter("accion");

        // =========================================
        // ELIMINAR USUARIO
        // =========================================
        if ("eliminar".equals(accion)) {

            int idUsuario = Integer.parseInt(
                    request.getParameter("idUsuario")
            );

            boolean eliminado = usuarioDAO.eliminarUsuario(idUsuario);

            if (eliminado) {

                request.setAttribute(
                        "mensaje",
                        "Usuario eliminado correctamente."
                );

            } else {

                request.setAttribute(
                        "mensaje",
                        "No fue posible eliminar el usuario."
                );
            }

            request.getRequestDispatcher("/usuarios.jsp")
                    .forward(request, response);

        // =========================================
        // ACTUALIZAR USUARIO
        // =========================================
        } else if ("actualizar".equals(accion)) {

            int idUsuario = Integer.parseInt(
                    request.getParameter("idUsuario")
            );

            String nombre = request.getParameter("nombre");
            String correo = request.getParameter("correo");
            String password = request.getParameter("password");
            String rol = request.getParameter("rol");
            boolean estado = Boolean.parseBoolean(
                    request.getParameter("estado")
            );

            Usuario usuario = new Usuario(
                    idUsuario,
                    nombre,
                    correo,
                    password,
                    rol,
                    estado
            );

            boolean actualizado = usuarioDAO.actualizarUsuario(usuario);

            if (actualizado) {

                request.setAttribute(
                        "mensaje",
                        "Usuario actualizado correctamente."
                );

            } else {

                request.setAttribute(
                        "mensaje",
                        "No fue posible actualizar el usuario."
                );
            }

            request.setAttribute("nombre", nombre);
            request.setAttribute("correo", correo);

            request.getRequestDispatcher("/usuarios.jsp")
                    .forward(request, response);

        // =========================================
        // REGISTRAR USUARIO
        // =========================================
        } else {

            String nombre = request.getParameter("nombre");
            String correo = request.getParameter("correo");
            String password = request.getParameter("password");
            String rol = request.getParameter("rol");
            boolean estado = Boolean.parseBoolean(
                    request.getParameter("estado")
            );

            Usuario usuario = new Usuario(
                    nombre,
                    correo,
                    password,
                    rol,
                    estado
            );

            boolean registrado = usuarioDAO.crearUsuario(usuario);

            if (registrado) {

                request.setAttribute(
                        "mensaje",
                        "Usuario registrado correctamente."
                );

            } else {

                request.setAttribute(
                        "mensaje",
                        "No fue posible registrar el usuario."
                );
            }

            request.setAttribute("nombre", nombre);
            request.setAttribute("correo", correo);

            request.getRequestDispatcher("/usuarios.jsp")
                    .forward(request, response);
        }
    }
}
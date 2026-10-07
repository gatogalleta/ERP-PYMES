<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.erppymes.model.Usuario" %>
<%@ page import="java.util.List" %>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>ERP PYMES - Usuarios</title>
</head>

<body>

    <h1>ERP PYMES</h1>

    <h2>Módulo de Usuarios</h2>

    <p>${mensaje}</p>

    <h3>Usuarios registrados</h3>

    <table border="1">

        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
            </tr>
        </thead>

        <tbody>

            <%
                List<Usuario> usuarios =
                        (List<Usuario>) request.getAttribute("usuarios");

                if (usuarios != null && !usuarios.isEmpty()) {

                    for (Usuario usuario : usuarios) {
            %>

            <tr>

                <td>
                    <%= usuario.getIdUsuario() %>
                </td>

                <td>
                    <%= usuario.getNombre() %>
                </td>

                <td>
                    <%= usuario.getEmail() %>
                </td>

                <td>
                    <%= usuario.getRol() %>
                </td>

                <td>
                    <%= usuario.isEstado() ? "Activo" : "Inactivo" %>
                </td>

                <!-- =========================================
                     ACTUALIZAR
                     ========================================= -->

                <td>

                    <form action="usuarios" method="post">

                        <input
                                type="hidden"
                                name="accion"
                                value="actualizar">

                        <input
                                type="hidden"
                                name="idUsuario"
                                value="<%= usuario.getIdUsuario() %>">

                        <label>Nombre:</label>

                        <input
                                type="text"
                                name="nombre"
                                value="<%= usuario.getNombre() %>"
                                required>

                        <br>

                        <label>Correo:</label>

                        <input
                                type="email"
                                name="correo"
                                value="<%= usuario.getEmail() %>"
                                required>

                        <br>

                        <label>Contraseña:</label>

                        <input
                                type="password"
                                name="password"
                                value="<%= usuario.getPassword() %>"
                                required>

                        <br>

                        <label>Rol:</label>

                        <select name="rol" required>

                            <option
                                    value="Administrador"
                                    <%= "Administrador".equals(usuario.getRol())
                                            ? "selected"
                                            : "" %>>
                                Administrador
                            </option>

                            <option
                                    value="Empleado"
                                    <%= "Empleado".equals(usuario.getRol())
                                            ? "selected"
                                            : "" %>>
                                Empleado
                            </option>

                        </select>

                        <br>

                        <label>Estado:</label>

                        <select name="estado" required>

                            <option
                                    value="true"
                                    <%= usuario.isEstado()
                                            ? "selected"
                                            : "" %>>
                                Activo
                            </option>

                            <option
                                    value="false"
                                    <%= !usuario.isEstado()
                                            ? "selected"
                                            : "" %>>
                                Inactivo
                            </option>

                        </select>

                        <br><br>

                        <button type="submit">
                            Actualizar usuario
                        </button>

                    </form>

                </td>

                <!-- =========================================
                     ELIMINAR
                     ========================================= -->

                <td>

                    <form action="usuarios" method="post">

                        <input
                                type="hidden"
                                name="accion"
                                value="eliminar">

                        <input
                                type="hidden"
                                name="idUsuario"
                                value="<%= usuario.getIdUsuario() %>">

                        <button type="submit">
                            Eliminar usuario
                        </button>

                    </form>

                </td>

            </tr>

            <%
                    }

                } else {
            %>

            <tr>

                <td colspan="7">
                    No hay usuarios registrados.
                </td>

            </tr>

            <%
                }
            %>

        </tbody>

    </table>

</body>

</html>
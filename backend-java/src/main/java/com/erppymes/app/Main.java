package com.erppymes.app;

import com.erppymes.dao.UsuarioDAO;
import com.erppymes.model.Usuario;
import com.erppymes.validation.UsuarioValidacion;

import java.util.List;

public class Main {

    private static final String EMAIL_PRUEBA =
            "usuario.prueba@erppymes.com";

    public static void main(String[] args) {

        System.out.println("========================================");
        System.out.println("      ERP PARA PYMES - CRUD JDBC");
        System.out.println("========================================");

        UsuarioDAO usuarioDAO = new UsuarioDAO();

        // =========================================
        // PRUEBAS DE VALIDACIÓN
        // =========================================

        System.out.println("\n========================================");
        System.out.println("      PRUEBAS DE VALIDACIÓN");
        System.out.println("========================================");

        probarValidacion(
                "VAL-01",
                "Nombre vacío",
                new Usuario(
                        "",
                        "prueba.validacion@erppymes.com",
                        "123456",
                        "Administrador",
                        true
                ),
                "El nombre es obligatorio."
        );

        probarValidacion(
                "VAL-02",
                "Correo electrónico vacío",
                new Usuario(
                        "Usuario Prueba",
                        "",
                        "123456",
                        "Administrador",
                        true
                ),
                "El correo electrónico es obligatorio."
        );

        probarValidacion(
                "VAL-03",
                "Correo electrónico con formato inválido",
                new Usuario(
                        "Usuario Prueba",
                        "correo-invalido",
                        "123456",
                        "Administrador",
                        true
                ),
                "El correo electrónico no tiene un formato válido."
        );

        probarValidacion(
                "VAL-04",
                "Contraseña menor a 6 caracteres",
                new Usuario(
                        "Usuario Prueba",
                        "prueba.validacion@erppymes.com",
                        "123",
                        "Administrador",
                        true
                ),
                "La contraseña debe tener mínimo 6 caracteres."
        );

        probarValidacion(
                "VAL-05",
                "Rol vacío",
                new Usuario(
                        "Usuario Prueba",
                        "prueba.validacion@erppymes.com",
                        "123456",
                        "",
                        true
                ),
                "El rol es obligatorio."
        );

        probarValidacion(
                "VAL-06",
                "Nombre superior a 100 caracteres",
                new Usuario(
                        generarTexto(101),
                        "prueba.validacion@erppymes.com",
                        "123456",
                        "Administrador",
                        true
                ),
                "El nombre no puede superar los 100 caracteres."
        );

        probarValidacion(
                "VAL-07",
                "Correo superior a 100 caracteres",
                new Usuario(
                        "Usuario Prueba",
                        generarCorreoLargo(),
                        "123456",
                        "Administrador",
                        true
                ),
                "El correo electrónico no puede superar los 100 caracteres."
        );

        probarValidacion(
                "VAL-08",
                "Rol superior a 50 caracteres",
                new Usuario(
                        "Usuario Prueba",
                        "prueba.validacion@erppymes.com",
                        "123456",
                        generarTexto(51),
                        true
                ),
                "El rol no puede superar los 50 caracteres."
        );

        probarValidacionAceptada(
                "VAL-09",
                "Datos válidos",
                new Usuario(
                        "Usuario Prueba",
                        "prueba.validacion@erppymes.com",
                        "123456",
                        "Administrador",
                        true
                )
        );

        // =========================================
        // LIMPIEZA PREVIA
        // =========================================

        System.out.println("\n========================================");
        System.out.println("LIMPIEZA PREVIA");
        System.out.println("========================================");

        List<Usuario> usuariosIniciales =
                usuarioDAO.consultarUsuarios();

        for (Usuario usuario : usuariosIniciales) {

            if (usuario.getEmail().equals(EMAIL_PRUEBA)) {

                usuarioDAO.eliminarUsuario(
                        usuario.getIdUsuario()
                );

                System.out.println(
                        "Usuario de prueba anterior eliminado."
                );
            }
        }

        // =========================================
        // PRUEBA 1 - INSERTAR
        // =========================================

        System.out.println("\n========================================");
        System.out.println("PRUEBA 1 - REGISTRAR USUARIO");
        System.out.println("========================================");

        Usuario usuarioPrueba = new Usuario(
                "Usuario Prueba",
                EMAIL_PRUEBA,
                "123456",
                "Administrador",
                true
        );

        boolean creado =
                usuarioDAO.crearUsuario(usuarioPrueba);

        if (creado) {

            System.out.println("RESULTADO: PRUEBA APROBADA");
            System.out.println(
                    "Usuario registrado correctamente."
            );

        } else {

            System.out.println("RESULTADO: PRUEBA FALLIDA");
            System.out.println(
                    "No fue posible registrar el usuario."
            );
        }

        // =========================================
        // PRUEBA 2 - CONSULTAR
        // =========================================

        System.out.println("\n========================================");
        System.out.println("PRUEBA 2 - CONSULTAR USUARIO");
        System.out.println("========================================");

        List<Usuario> usuariosConsulta =
                usuarioDAO.consultarUsuarios();

        Usuario usuarioEncontrado =
                buscarPorEmail(
                        usuariosConsulta,
                        EMAIL_PRUEBA
                );

        if (usuarioEncontrado != null) {

            System.out.println("RESULTADO: PRUEBA APROBADA");
            System.out.println("Usuario encontrado:");
            System.out.println(usuarioEncontrado);

        } else {

            System.out.println("RESULTADO: PRUEBA FALLIDA");
            System.out.println(
                    "No se encontró el usuario registrado."
            );
        }

        // =========================================
        // PRUEBA 3 - ACTUALIZAR
        // =========================================

        System.out.println("\n========================================");
        System.out.println("PRUEBA 3 - ACTUALIZAR USUARIO");
        System.out.println("========================================");

        if (usuarioEncontrado != null) {

            usuarioEncontrado.setNombre(
                    "Usuario Prueba Actualizado"
            );

            usuarioEncontrado.setRol("Empleado");
            usuarioEncontrado.setEstado(false);

            boolean actualizado =
                    usuarioDAO.actualizarUsuario(
                            usuarioEncontrado
                    );

            if (actualizado) {

                System.out.println(
                        "RESULTADO: PRUEBA APROBADA"
                );

                System.out.println(
                        "Usuario actualizado correctamente."
                );

                Usuario usuarioActualizado =
                        buscarPorEmail(
                                usuarioDAO.consultarUsuarios(),
                                EMAIL_PRUEBA
                        );

                System.out.println(
                        "Datos después de la actualización:"
                );

                System.out.println(usuarioActualizado);

            } else {

                System.out.println(
                        "RESULTADO: PRUEBA FALLIDA"
                );

                System.out.println(
                        "No fue posible actualizar el usuario."
                );
            }

        } else {

            System.out.println(
                    "No se puede realizar la actualización "
                    + "porque el usuario no fue encontrado."
            );
        }

        // =========================================
        // PRUEBA 4 - ELIMINAR
        // =========================================

        System.out.println("\n========================================");
        System.out.println("PRUEBA 4 - ELIMINAR USUARIO");
        System.out.println("========================================");

        if (usuarioEncontrado != null) {

            boolean eliminado =
                    usuarioDAO.eliminarUsuario(
                            usuarioEncontrado.getIdUsuario()
                    );

            if (eliminado) {

                System.out.println(
                        "RESULTADO: PRUEBA APROBADA"
                );

                System.out.println(
                        "Usuario eliminado correctamente."
                );

            } else {

                System.out.println(
                        "RESULTADO: PRUEBA FALLIDA"
                );

                System.out.println(
                        "No fue posible eliminar el usuario."
                );
            }

        } else {

            System.out.println(
                    "No se puede eliminar porque el usuario "
                    + "no fue encontrado."
            );
        }

        // =========================================
        // VERIFICACIÓN FINAL
        // =========================================

        System.out.println("\n========================================");
        System.out.println("VERIFICACIÓN FINAL");
        System.out.println("========================================");

        List<Usuario> usuariosFinales =
                usuarioDAO.consultarUsuarios();

        Usuario usuarioVerificacion =
                buscarPorEmail(
                        usuariosFinales,
                        EMAIL_PRUEBA
                );

        if (usuarioVerificacion == null) {

            System.out.println(
                    "RESULTADO: PRUEBA APROBADA"
            );

            System.out.println(
                    "El usuario de prueba ya no existe "
                    + "en la base de datos."
            );

        } else {

            System.out.println(
                    "RESULTADO: PRUEBA FALLIDA"
            );

            System.out.println(
                    "El usuario de prueba todavía existe."
            );
        }

        // =========================================
        // RESUMEN
        // =========================================

        System.out.println("\n========================================");
        System.out.println("      PRUEBAS FINALIZADAS");
        System.out.println("========================================");

        System.out.println("VALIDACIONES -> Ejecutadas");
        System.out.println("INSERTAR     -> Ejecutado");
        System.out.println("CONSULTAR    -> Ejecutado");
        System.out.println("ACTUALIZAR   -> Ejecutado");
        System.out.println("ELIMINAR     -> Ejecutado");

        System.out.println(
                "\nLa prueba dejó la base de datos limpia."
        );
    }

    // =========================================
    // MÉTODO PARA VALIDACIONES QUE DEBEN FALLAR
    // =========================================

    private static void probarValidacion(
            String codigo,
            String descripcion,
            Usuario usuario,
            String mensajeEsperado) {

        System.out.println("\n[" + codigo + "] " + descripcion);

        String resultado =
                UsuarioValidacion.validar(usuario);

        if (mensajeEsperado.equals(resultado)) {

            System.out.println("RESULTADO: PRUEBA APROBADA");
            System.out.println(
                    "Validación detectada: " + resultado
            );

        } else {

            System.out.println("RESULTADO: PRUEBA FALLIDA");
            System.out.println(
                    "Resultado obtenido: " + resultado
            );
        }
    }

    // =========================================
    // MÉTODO PARA VALIDACIÓN DE DATOS CORRECTOS
    // =========================================

    private static void probarValidacionAceptada(
            String codigo,
            String descripcion,
            Usuario usuario) {

        System.out.println("\n[" + codigo + "] " + descripcion);

        String resultado =
                UsuarioValidacion.validar(usuario);

        if (resultado == null) {

            System.out.println("RESULTADO: PRUEBA APROBADA");
            System.out.println(
                    "Los datos fueron aceptados correctamente."
            );

        } else {

            System.out.println("RESULTADO: PRUEBA FALLIDA");
            System.out.println(
                    "El sistema rechazó los datos: " + resultado
            );
        }
    }

    // =========================================
    // MÉTODO PARA GENERAR TEXTOS DE PRUEBA
    // =========================================

    private static String generarTexto(int longitud) {

        StringBuilder texto = new StringBuilder();

        for (int i = 0; i < longitud; i++) {
            texto.append("A");
        }

        return texto.toString();
    }

    // =========================================
    // MÉTODO PARA GENERAR CORREO LARGO
    // =========================================

   private static String generarCorreoLargo() {

    return generarTexto(101)
            + "@c.com";
}

    // =========================================
    // MÉTODO AUXILIAR
    // =========================================

    private static Usuario buscarPorEmail(
            List<Usuario> usuarios,
            String email) {

        for (Usuario usuario : usuarios) {

            if (usuario.getEmail().equals(email)) {
                return usuario;
            }
        }

        return null;
    }
}
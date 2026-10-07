package com.erppymes.validation;

import com.erppymes.model.Usuario;

public class UsuarioValidacion {

    public static String validar(Usuario usuario) {

        if (usuario == null) {
            return "El usuario no puede ser nulo.";
        }

        if (usuario.getNombre() == null ||
                usuario.getNombre().trim().isEmpty()) {
            return "El nombre es obligatorio.";
        }

        if (usuario.getNombre().length() > 100) {
            return "El nombre no puede superar los 100 caracteres.";
        }

        if (usuario.getEmail() == null ||
                usuario.getEmail().trim().isEmpty()) {
            return "El correo electrónico es obligatorio.";
        }

        if (!usuario.getEmail().matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            return "El correo electrónico no tiene un formato válido.";
        }

        if (usuario.getEmail().length() > 100) {
            return "El correo electrónico no puede superar los 100 caracteres.";
        }

        if (usuario.getPassword() == null ||
                usuario.getPassword().isEmpty()) {
            return "La contraseña es obligatoria.";
        }

        if (usuario.getPassword().length() < 6) {
            return "La contraseña debe tener mínimo 6 caracteres.";
        }

        if (usuario.getPassword().length() > 225) {
            return "La contraseña no puede superar los 225 caracteres.";
        }

        if (usuario.getRol() == null ||
                usuario.getRol().trim().isEmpty()) {
            return "El rol es obligatorio.";
        }

        if (usuario.getRol().length() > 50) {
            return "El rol no puede superar los 50 caracteres.";
        }

        return null;
    }
}
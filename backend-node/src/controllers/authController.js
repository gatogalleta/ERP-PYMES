const pool = require("../config/database");
const bcrypt = require("bcrypt");

// Controlador para registrar usuarios nuevos
async function register(req, res) {
    try {
        // Recibir los datos enviados desde el cliente
        let { nombre, email, password } = req.body;

        // Validar que los campos obligatorios estÃ©n completos
        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: "El nombre, correo y contraseÃ±a son obligatorios."
            });
        }

        // Limpiar y normalizar los datos
        nombre = nombre.trim();
        email = email.trim().toLowerCase();

        // Validar que los campos de texto no queden vacÃ­os
        if (!nombre || !email) {
            return res.status(400).json({
                mensaje: "El nombre y el correo no pueden estar vacÃ­os."
            });
        }

        // Validar un formato bÃ¡sico de correo electrÃ³nico
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoEmail.test(email)) {
            return res.status(400).json({
                mensaje: "El formato del correo electrÃ³nico no es vÃ¡lido."
            });
        }

        // Exigir una contraseÃ±a de al menos ocho caracteres
        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({
                mensaje: "La contraseÃ±a debe tener al menos 8 caracteres."
            });
        }

        // Comprobar si el correo ya estÃ¡ registrado
        const [usuariosExistentes] = await pool.query(
            "SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1",
            [email]
        );

        if (usuariosExistentes.length > 0) {
            return res.status(409).json({
                mensaje: "Ya existe un usuario registrado con ese correo."
            });
        }

        // Cifrar la contraseÃ±a antes de almacenarla en la base de datos
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear el usuario con un rol predeterminado.
        // No se permite que el cliente elija su propio rol.
        const [resultado] = await pool.query(
            `INSERT INTO usuarios
                (nombre, email, password, rol, estado)
             VALUES (?, ?, ?, ?, ?)`,
            [nombre, email, passwordHash, "Usuario", 1]
        );

        // Responder sin exponer la contraseÃ±a ni su hash
        return res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
            usuario: {
                id_usuario: resultado.insertId,
                nombre,
                email,
                rol: "Usuario",
                estado: 1
            }
        });
    } catch (error) {
        // Controlar posibles correos duplicados por solicitudes simultÃ¡neas
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                mensaje: "Ya existe un usuario registrado con ese correo."
            });
        }

        // Registrar el detalle tÃ©cnico en el servidor
        console.error("Error al registrar usuario:", error.message);

        return res.status(500).json({
            mensaje: "Error interno al registrar el usuario."
        });
    }
}

// Controlador para iniciar sesiÃ³n
async function login(req, res) {
    try {
        // Recibir correo y contraseÃ±a
        let { email, password } = req.body;

        // Validar los campos obligatorios
        if (
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password
        ) {
            return res.status(400).json({
                mensaje: "El correo y la contraseÃ±a son obligatorios."
            });
        }

        // Normalizar el correo electrÃ³nico
        email = email.trim().toLowerCase();

        // Buscar un usuario activo por su correo
        const [usuarios] = await pool.query(
            `SELECT id_usuario, nombre, email, password, rol, estado
             FROM usuarios
             WHERE email = ? AND estado = 1
             LIMIT 1`,
            [email]
        );

        // No revelar si el correo existe o la contraseÃ±a es incorrecta
        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: "Correo o contraseÃ±a incorrectos."
            });
        }

        const usuario = usuarios[0];
        const passwordGuardada = usuario.password;

        // Detectar si la contraseÃ±a ya estÃ¡ guardada como hash bcrypt
        const esHashBcrypt =
    /^\$2[aby]\$\d{2}\$/.test(passwordGuardada);

        let passwordCorrecta = false;

        if (esHashBcrypt) {
            // Comparar la contraseÃ±a con el hash almacenado
            passwordCorrecta = await bcrypt.compare(
                password,
                passwordGuardada
            );
        } else {
            // Compatibilidad temporal con cuentas antiguas en texto plano
            passwordCorrecta = password === passwordGuardada;

            if (passwordCorrecta) {
                // Actualizar a bcrypt cuando el usuario inicia sesiÃ³n
                const passwordHash = await bcrypt.hash(password, 10);

                await pool.query(
                    `UPDATE usuarios
                     SET password = ?
                     WHERE id_usuario = ?`,
                    [passwordHash, usuario.id_usuario]
                );
            }
        }

        // Rechazar credenciales incorrectas
        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Correo o contraseÃ±a incorrectos."
            });
        }

        // Eliminar la contraseÃ±a de la respuesta al cliente
        delete usuario.password;

        // Informar que la autenticaciÃ³n fue exitosa
        return res.status(200).json({
            mensaje: "Inicio de sesiÃ³n exitoso.",
            usuario
        });
    } catch (error) {
        // Registrar errores tÃ©cnicos sin exponerlos al cliente
        console.error("Error en la autenticaciÃ³n:", error.message);

        return res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
}

// Exportar los controladores para utilizarlos en las rutas
module.exports = {
    register,
    login
};

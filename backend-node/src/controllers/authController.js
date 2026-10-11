const pool = require("../config/database");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validar campos
        if (!email || !password) {
            return res.status(400).json({
                mensaje: "El correo y la contraseña son obligatorios."
            });
        }

        // Buscar usuario activo
        const [usuarios] = await pool.query(
            `SELECT id_usuario, nombre, email, password, rol, estado
             FROM usuarios
             WHERE email = ? AND estado = 1
             LIMIT 1`,
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos."
            });
        }

        const usuario = usuarios[0];

        // Comparar contraseña
        if (password !== usuario.password) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos."
            });
        }

        // No enviar la contraseña al frontend
        delete usuario.password;

        res.json({
            mensaje: "Inicio de sesión exitoso.",
            usuario
        });

    } catch (error) {
        console.error("Error en el login:", error.message);

        res.status(500).json({
            mensaje: "Error interno del servidor."
        });
    }
}

module.exports = {
    login
};
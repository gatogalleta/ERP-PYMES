const jwt = require("jsonwebtoken");

// Verifica que la solicitud incluya un token JWT válido.
function verificarToken(req, res, next) {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "Se requiere un token de autenticación."
        });
    }

    const token = autorizacion.split(" ")[1];

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = {
            id_usuario: datos.id_usuario,
            email: datos.email,
            rol: datos.rol
        };

        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "El token es inválido o ha expirado."
        });
    }
}

// Restringe una ruta a los roles autorizados.
function permitirRoles(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: "No tienes permisos para realizar esta operación."
            });
        }

        next();
    };
}

module.exports = {
    verificarToken,
    permitirRoles
};
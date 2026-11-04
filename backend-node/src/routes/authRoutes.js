
const express = require("express");

const {
    register,
    login,
    me
} = require("../controllers/authController");

const {
    verificarToken
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Ruta para registrar usuarios nuevos
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta protegida para consultar el perfil del usuario autenticado
router.get("/me", verificarToken, me);

module.exports = router;

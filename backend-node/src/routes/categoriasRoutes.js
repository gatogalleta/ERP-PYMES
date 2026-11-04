
const express = require("express");
const router = express.Router();

const {
    listarCategorias
} = require("../controllers/categoriasController");

const {
    verificarToken
} = require("../middlewares/authMiddleware");

// Consultar categorías: requiere iniciar sesión.
router.get("/", verificarToken, listarCategorias);

module.exports = router;

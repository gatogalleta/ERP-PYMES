
const express = require("express");
const router = express.Router();

const {
    listarProveedores
} = require("../controllers/proveedoresController");

const {
    verificarToken
} = require("../middlewares/authMiddleware");

// Consultar proveedores: requiere iniciar sesión.
router.get("/", verificarToken, listarProveedores);

module.exports = router;

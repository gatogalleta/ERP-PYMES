
const express = require("express");
const router = express.Router();

const {
    listarProductos,
    crearProducto,
    eliminarProducto,
    actualizarProducto
} = require("../controllers/productosController");

const {
    verificarToken,
    permitirRoles
} = require("../middlewares/authMiddleware");

// Consultar productos: requiere iniciar sesión.
router.get("/", verificarToken, listarProductos);

// Crear productos: solo administradores.
router.post("/", verificarToken, permitirRoles("Administrador"), crearProducto);

// Actualizar productos: solo administradores.
router.put("/:id", verificarToken, permitirRoles("Administrador"), actualizarProducto);

// Eliminar productos: solo administradores.
router.delete("/:id", verificarToken, permitirRoles("Administrador"), eliminarProducto);

module.exports = router;

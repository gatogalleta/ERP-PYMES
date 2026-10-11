
const express = require("express");
const router = express.Router();

const {
    listarProductos,
    crearProducto,
    eliminarProducto,
    actualizarProducto
} = require("../controllers/productosController");

router.get("/", listarProductos);
router.post("/", crearProducto);
router.delete("/:id", eliminarProducto);
router.put("/:id", actualizarProducto);

module.exports = router;
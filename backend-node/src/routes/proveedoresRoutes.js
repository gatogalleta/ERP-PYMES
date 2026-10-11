
const express = require("express");
const router = express.Router();

const {
    listarProveedores
} = require("../controllers/proveedoresController");

router.get("/", listarProveedores);

module.exports = router;

const db = require("../config/database");

async function listarProveedores(req, res) {
    try {
        const [proveedores] = await db.query(`
            SELECT id_proveedor, nombre
            FROM proveedores
            ORDER BY nombre ASC
        `);

        res.json(proveedores);
    } catch (error) {
        console.error("Error al consultar proveedores:", error.message);
        res.status(500).json({
            mensaje: "Error al consultar los proveedores."
        });
    }
}

module.exports = { listarProveedores };
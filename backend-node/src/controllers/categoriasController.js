
const db = require("../config/database");

async function listarCategorias(req, res) {
    try {
        const [categorias] = await db.query(`
            SELECT id_categoria, nombre, descripcion
            FROM categorias
            ORDER BY nombre ASC
        `);

        res.json(categorias);
    } catch (error) {
        console.error("Error al consultar categorías:", error.message);
        res.status(500).json({
            mensaje: "Error al consultar las categorías."
        });
    }
}

module.exports = { listarCategorias };

const db = require("../config/database");

// Consultar productos con sus categorías y proveedores.
async function listarProductos(req, res) {
    try {
        const [productos] = await db.query(`
            SELECT
                p.id_producto,
                p.nombre,
                p.descripcion,
                p.precio_compra,
                p.precio_venta,
                p.id_categoria,
                c.nombre AS categoria,
                p.id_proveedor,
                pr.nombre AS proveedor,
                p.estado
            FROM productos p
            INNER JOIN categorias c
                ON p.id_categoria = c.id_categoria
            INNER JOIN proveedores pr
                ON p.id_proveedor = pr.id_proveedor
            ORDER BY p.id_producto DESC
        `);

        res.json(productos);
    } catch (error) {
        console.error("Error al consultar productos:", error.message);

        res.status(500).json({
            mensaje: "Error al consultar los productos."
        });
    }
}

// Registrar un producto nuevo.
async function crearProducto(req, res) {
    try {
        const {
            nombre,
            descripcion,
            precio_compra,
            precio_venta,
            id_categoria,
            id_proveedor
        } = req.body;

        if (
            typeof nombre !== "string" ||
            !nombre.trim() ||
            nombre.trim().length > 150 ||
            (descripcion != null &&
                (typeof descripcion !== "string" ||
                 descripcion.length > 255)) ||
            precio_compra === "" ||
            precio_venta === "" ||
            !Number.isFinite(Number(precio_compra)) ||
            !Number.isFinite(Number(precio_venta)) ||
            Number(precio_compra) < 0 ||
            Number(precio_venta) < 0 ||
            !Number.isInteger(Number(id_categoria)) ||
            Number(id_categoria) <= 0 ||
            !Number.isInteger(Number(id_proveedor)) ||
            Number(id_proveedor) <= 0
        ) {
            return res.status(400).json({
                mensaje: "Verifica los datos del producto."
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO productos
                (nombre, descripcion, precio_compra, precio_venta,
                 id_categoria, id_proveedor, estado)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre.trim(),
                descripcion?.trim() || null,
                Number(precio_compra),
                Number(precio_venta),
                Number(id_categoria),
                Number(id_proveedor),
                1
            ]
        );

        res.status(201).json({
            mensaje: "Producto registrado correctamente.",
            id_producto: resultado.insertId
        });
    } catch (error) {
        console.error("Error al registrar producto:", error.message);

        res.status(500).json({
            mensaje: "No fue posible registrar el producto."
        });
    }
}

// Eliminar un producto por su identificador.
async function eliminarProducto(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: "El identificador del producto no es válido."
            });
        }

        const [resultado] = await db.query(
            "DELETE FROM productos WHERE id_producto = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se encontró el producto."
            });
        }

        res.json({
            mensaje: "Producto eliminado correctamente."
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error.message);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                mensaje:
                    "No se puede eliminar el producto porque está relacionado con otros registros."
            });
        }

        res.status(500).json({
            mensaje: "No fue posible eliminar el producto."
        });
    }
}


async function actualizarProducto(req, res) {
    try {
        const id = Number(req.params.id);

        const {
            nombre,
            descripcion,
            precio_compra,
            precio_venta,
            id_categoria,
            id_proveedor
        } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: "El identificador del producto no es válido."
            });
        }

        if (
            typeof nombre !== "string" ||
            !nombre.trim() ||
            nombre.trim().length > 150 ||
            (descripcion != null &&
                (typeof descripcion !== "string" ||
                 descripcion.length > 255)) ||
            precio_compra === "" ||
            precio_venta === "" ||
            !Number.isFinite(Number(precio_compra)) ||
            !Number.isFinite(Number(precio_venta)) ||
            Number(precio_compra) < 0 ||
            Number(precio_venta) < 0 ||
            !Number.isInteger(Number(id_categoria)) ||
            Number(id_categoria) <= 0 ||
            !Number.isInteger(Number(id_proveedor)) ||
            Number(id_proveedor) <= 0
        ) {
            return res.status(400).json({
                mensaje: "Verifica los datos del producto."
            });
        }

        // Comprobar que el producto exista.
        const [productos] = await db.query(
            "SELECT id_producto FROM productos WHERE id_producto = ?",
            [id]
        );

        if (productos.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontró el producto."
            });
        }

        // Actualizar los datos en MySQL.
        await db.query(
            `UPDATE productos
             SET nombre = ?,
                 descripcion = ?,
                 precio_compra = ?,
                 precio_venta = ?,
                 id_categoria = ?,
                 id_proveedor = ?
             WHERE id_producto = ?`,
            [
                nombre.trim(),
                descripcion?.trim() || null,
                Number(precio_compra),
                Number(precio_venta),
                Number(id_categoria),
                Number(id_proveedor),
                id
            ]
        );

        res.json({
            mensaje: "Producto actualizado correctamente."
        });
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);

        res.status(500).json({
            mensaje: "No fue posible actualizar el producto."
        });
    }
}

module.exports = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    actualizarProducto
};
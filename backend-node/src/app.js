const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const productosRoutes = require("./routes/productosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const proveedoresRoutes = require("./routes/proveedoresRoutes");
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/proveedores", proveedoresRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "API ERP PYMES funcionando correctamente"
    });
});

// Consultar usuarios
app.get("/api/usuarios", async (req, res) => {
    try {
        const [usuarios] = await pool.query(`
            SELECT id_usuario, nombre, email, rol, estado
            FROM usuarios
        `);

        res.json(usuarios);
    } catch (error) {
        console.error("Error al consultar usuarios:", error.message);

        res.status(500).json({
            mensaje: "Error al consultar los usuarios"
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
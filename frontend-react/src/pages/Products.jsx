
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const API_URL = "http://localhost:3000/api";

const formularioInicial = {
    nombre: "",
    descripcion: "",
    precio_compra: "",
    precio_venta: "",
    id_categoria: "",
    id_proveedor: "",
};

function formatoCOP(valor) {
    return Number(valor).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 2,
    });
}

function Products() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const [busqueda, setBusqueda] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [productoEditando, setProductoEditando] = useState(null);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    // Cargar los datos desde el backend.
    async function cargarDatos() {
        setCargando(true);
        setError(false);

        try {
            const respuestas = await Promise.all([
                fetch(`${API_URL}/productos`),
                fetch(`${API_URL}/categorias`),
                fetch(`${API_URL}/proveedores`),
            ]);

            if (respuestas.some((respuesta) => !respuesta.ok)) {
                throw new Error("No fue posible consultar los datos.");
            }

            const [listaProductos, listaCategorias, listaProveedores] =
                await Promise.all(
                    respuestas.map((respuesta) => respuesta.json())
                );

            setProductos(listaProductos);
            setCategorias(listaCategorias);
            setProveedores(listaProveedores);
        } catch (err) {
            console.error("Error al cargar el catálogo:", err);
            setError(true);
            setMensaje(
                "No fue posible cargar los datos. Verifica que el backend esté funcionando."
            );
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
    async function iniciarCarga() {
        await cargarDatos();
    }

    iniciarCarga();
}, []);

    // Filtrar por nombre o categoría.
    const productosFiltrados = productos.filter((producto) =>
        `${producto.nombre} ${producto.categoria}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    // Actualizar los campos del formulario.
    function manejarCambio(evento) {
        const { name, value } = evento.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value,
        }));
    }

    // Preparar el formulario con los datos del producto seleccionado.
function editarProducto(producto) {
    setProductoEditando(producto.id_producto);

    setFormulario({
        nombre: producto.nombre,
        descripcion: producto.descripcion || "",
        precio_compra: String(producto.precio_compra),
        precio_venta: String(producto.precio_venta),
        id_categoria: String(producto.id_categoria),
        id_proveedor: String(producto.id_proveedor),
    });

    setMostrarFormulario(true);
    setMensaje("");
    setError(false);
}

    // Registrar el producto en MySQL mediante la API.
    
async function registrarProducto(evento) {
    evento.preventDefault();
    setMensaje("");
    setError(false);

    if (
        !formulario.nombre.trim() ||
        formulario.precio_compra === "" ||
        formulario.precio_venta === "" ||
        !formulario.id_categoria ||
        !formulario.id_proveedor
    ) {
        setError(true);
        setMensaje("Completa todos los campos obligatorios.");
        return;
    }

    const precioCompra = Number(formulario.precio_compra);
    const precioVenta = Number(formulario.precio_venta);

    if (
        !Number.isFinite(precioCompra) ||
        !Number.isFinite(precioVenta) ||
        precioCompra < 0 ||
        precioVenta < 0
    ) {
        setError(true);
        setMensaje("Los precios deben ser números válidos y no negativos.");
        return;
    }

    setGuardando(true);

    try {
        const editando = productoEditando !== null;

        const url = editando
            ? `${API_URL}/productos/${productoEditando}`
            : `${API_URL}/productos`;

        const respuesta = await fetch(url, {
            method: editando ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: formulario.nombre.trim(),
                descripcion: formulario.descripcion.trim(),
                precio_compra: precioCompra,
                precio_venta: precioVenta,
                id_categoria: Number(formulario.id_categoria),
                id_proveedor: Number(formulario.id_proveedor),
            }),
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                resultado.mensaje ||
                    "No fue posible guardar el producto."
            );
        }

        setFormulario(formularioInicial);
        setProductoEditando(null);
        setMostrarFormulario(false);

        setMensaje(
            editando
                ? "Producto actualizado correctamente en MySQL."
                : "Producto registrado correctamente en MySQL."
        );

        await cargarDatos();
    } catch (err) {
        console.error("Error al guardar producto:", err);
        setError(true);
        setMensaje(err.message || "Error al guardar el producto.");
    } finally {
        setGuardando(false);
    }
}

    // Eliminar el producto de MySQL.
    async function eliminarProducto(id) {
        const confirmar = window.confirm(
            "¿Deseas eliminar este producto de la base de datos?"
        );

        if (!confirmar) return;

        setMensaje("");
        setError(false);

        try {
            const respuesta = await fetch(`${API_URL}/productos/${id}`, {
                method: "DELETE",
            });

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    resultado.mensaje || "No fue posible eliminar el producto."
                );
            }

            setMensaje("Producto eliminado correctamente de MySQL.");
            await cargarDatos();
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            setError(true);
            setMensaje(err.message || "Error al eliminar el producto.");
        }
    }

    return (
        <div className="erp-layout">
            <aside className="erp-sidebar">
                <h2>ERP <span>PYMES</span></h2>

                <nav aria-label="Navegación principal">
                    <Link to="/dashboard">🏠 Dashboard</Link>
                    <Link to="/products" className="erp-nav-active">
                        📦 Productos
                    </Link>
                    <Link to="/sales">🛒 Ventas</Link>
                    <Link to="/inventory">🏷️ Inventario</Link>
                    <Link to="/reports">📊 Reportes</Link>
                </nav>

                <Link to="/" className="erp-logout">Cerrar sesión</Link>
            </aside>

            <main className="erp-main">
                <header className="erp-header">
                    <h1>Gestión de productos</h1>
                    <p>Consulta y administra el catálogo de productos.</p>
                </header>

                <section className="products-toolbar">
                    <input
                        type="search"
                        placeholder="Buscar por nombre o categoría..."
                        aria-label="Buscar productos"
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setMostrarFormulario((anterior) => !anterior);
                            setFormulario(formularioInicial);
                            setProductoEditando(null);
                            setMensaje("");
                            setError(false);
                        }}
                    >
                        {mostrarFormulario ? "Cancelar" : "+ Agregar producto"}
                    </button>
                </section>

                {mensaje && (
                    <p
                        className="products-message"
                        role="status"
                        style={{ color: error ? "#b91c1c" : undefined }}
                    >
                        {mensaje}
                    </p>
                )}

                {mostrarFormulario && (
                    <form
                        className="products-form"
                        onSubmit={registrarProducto}
                    >
                        <h2>{productoEditando !== null ? "Editar producto" : "Nuevo producto"}</h2>

                        <label>
                            Nombre *
                            <input
                                name="nombre"
                                value={formulario.nombre}
                                onChange={manejarCambio}
                                maxLength={150}
                                required
                            />
                        </label>

                        <label>
                            Descripción
                            <input
                                name="descripcion"
                                value={formulario.descripcion}
                                onChange={manejarCambio}
                                maxLength={255}
                            />
                        </label>

                        <label>
                            Precio de compra (COP) *
                            <input
                                type="number"
                                name="precio_compra"
                                min="0"
                                step="0.01"
                                value={formulario.precio_compra}
                                onChange={manejarCambio}
                                required
                            />
                        </label>

                        <label>
                            Precio de venta (COP) *
                            <input
                                type="number"
                                name="precio_venta"
                                min="0"
                                step="0.01"
                                value={formulario.precio_venta}
                                onChange={manejarCambio}
                                required
                            />
                        </label>

                        <label>
                            Categoría *
                            <select
                                name="id_categoria"
                                value={formulario.id_categoria}
                                onChange={manejarCambio}
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias.map((categoria) => (
                                    <option
                                        key={categoria.id_categoria}
                                        value={categoria.id_categoria}
                                    >
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Proveedor *
                            <select
                                name="id_proveedor"
                                value={formulario.id_proveedor}
                                onChange={manejarCambio}
                                required
                            >
                                <option value="">Selecciona un proveedor</option>
                                {proveedores.map((proveedor) => (
                                    <option
                                        key={proveedor.id_proveedor}
                                        value={proveedor.id_proveedor}
                                    >
                                        {proveedor.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <button type="submit" disabled={guardando}>
                                {guardando
                                     ? "Guardando..."
                                     : productoEditando !== null
                                        ? "Guardar cambios"
                                        : "Guardar producto"}
                        </button>
                    </form>
                )}

                <section className="products-table-container">
                    <h2>Catálogo</h2>

                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : (
                        <div className="products-table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th>Proveedor</th>
                                        <th>Precio de compra</th>
                                        <th>Precio de venta</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {productosFiltrados.map((producto) => (
                                        <tr key={producto.id_producto}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.categoria}</td>
                                            <td>{producto.proveedor}</td>
                                            <td>{formatoCOP(producto.precio_compra)}</td>
                                            <td>{formatoCOP(producto.precio_venta)}</td>
                                            <td>
                                                {Number(producto.estado) === 1
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </td>
                                            
                                                <td>
                                                     <div className="products-actions">
                                                        <button
                                                        type="button"
                                                        onClick={() => editarProducto(producto)}
                                                        >
                                                            Editar
                                                            </button>

                                                            <button
                                                            type="button"
                                                            className="products-delete"
                                                            onClick={() =>
                                                            eliminarProducto(producto.id_producto)
                                                            }
                                                        >
                                                            Eliminar
                                                            </button>
                                                    </div>
                                                </td>
                                        </tr>
                                    ))}

                                    {!error && productosFiltrados.length === 0 && (
                                        <tr>
                                            <td colSpan="7">
                                                No se encontraron productos.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <p className="products-note">
                    Los productos se consultan y guardan en la base de datos MySQL.
                </p>
            </main>
        </div>
    );
}

export default Products;
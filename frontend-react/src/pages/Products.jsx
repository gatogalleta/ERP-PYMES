import { useCallback, useEffect, useState } from "react";
import ERPLayout from "../components/ERPLayout";
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

    // Consultar los productos, las categorías y los proveedores.
    const cargarDatos = useCallback(async () => {
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

            const [
                listaProductos,
                listaCategorias,
                listaProveedores,
            ] = await Promise.all(
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
    }, []);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    // Buscar por nombre, categoría o proveedor.
    const productosFiltrados = productos.filter((producto) =>
        `${producto.nombre} ${producto.categoria || ""} ${producto.proveedor || ""}`
            .toLowerCase()
            .includes(busqueda.trim().toLowerCase())
    );

    // Contar los productos activos.
    const productosActivos = productos.filter(
        (producto) => Number(producto.estado) === 1
    ).length;

    // Actualizar los valores del formulario.
    function manejarCambio(evento) {
        const { name, value } = evento.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value,
        }));
    }

    // Abrir el formulario con los datos del producto elegido.
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

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Limpiar el formulario y cancelar la edición.
    function cancelarFormulario() {
        setMostrarFormulario(false);
        setFormulario({ ...formularioInicial });
        setProductoEditando(null);
        setMensaje("");
        setError(false);
    }

    // Registrar o actualizar un producto en MySQL.
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
            setMensaje(
                "Los precios deben ser números válidos y no negativos."
            );
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

            setFormulario({ ...formularioInicial });
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

    // Eliminar un producto de la base de datos.
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
                    resultado.mensaje ||
                        "No fue posible eliminar el producto."
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
        <ERPLayout>
            <main className="erp-main products-main">
                {/* Encabezado de la página */}
                <header className="erp-header-modern">
                    <div className="erp-header-title">
                        <span className="erp-page-eyebrow">
                            ADMINISTRACIÓN DEL NEGOCIO
                        </span>

                        <h1>Gestión de productos</h1>

                        <p>
                            Consulta, registra y administra el catálogo
                            de productos de tu empresa.
                        </p>
                    </div>

                    <div className="erp-header-profile">
                        <div className="erp-profile-avatar">E</div>

                        <div className="erp-profile-info">
                            <strong>Usuario del sistema</strong>
                            <span>Área de administración</span>
                        </div>
                    </div>
                </header>

                {/* Tarjetas de resumen */}
                <section className="products-summary">
                    <article className="products-summary-card">
                        <span className="products-summary-icon">▤</span>

                        <div>
                            <p>Total de productos</p>
                            <strong>
                                {cargando ? "…" : productos.length}
                            </strong>
                        </div>
                    </article>

                    <article className="products-summary-card">
                        <span className="products-summary-icon products-summary-green">
                            ✓
                        </span>

                        <div>
                            <p>Productos activos</p>
                            <strong>
                                {cargando ? "…" : productosActivos}
                            </strong>
                        </div>
                    </article>

                    <article className="products-summary-card">
                        <span className="products-summary-icon products-summary-purple">
                            ⌕
                        </span>

                        <div>
                            <p>Categorías disponibles</p>
                            <strong>
                                {cargando ? "…" : categorias.length}
                            </strong>
                        </div>
                    </article>
                </section>

                {/* Área de búsqueda y administración */}
                <section className="products-workspace">
                    <div className="products-toolbar products-toolbar-modern">
                        <div className="products-search">
                            <span aria-hidden="true">⌕</span>

                            <input
                                type="search"
                                placeholder="Buscar por nombre, categoría o proveedor..."
                                aria-label="Buscar productos"
                                value={busqueda}
                                onChange={(evento) =>
                                    setBusqueda(evento.target.value)
                                }
                            />
                        </div>

                        <button
                            type="button"
                            className="products-add-button"
                            onClick={() => {
                                if (mostrarFormulario) {
                                    cancelarFormulario();
                                } else {
                                    setMostrarFormulario(true);
                                    setFormulario({ ...formularioInicial });
                                    setProductoEditando(null);
                                    setMensaje("");
                                    setError(false);
                                }
                            }}
                        >
                            {mostrarFormulario
                                ? "Cancelar"
                                : "+ Agregar producto"}
                        </button>
                    </div>

                    {/* Mensajes de éxito o error */}
                    {mensaje && (
                        <div
                            className={`products-message ${
                                error
                                    ? "products-message-error"
                                    : "products-message-success"
                            }`}
                            role={error ? "alert" : "status"}
                        >
                            <span aria-hidden="true">
                                {error ? "!" : "✓"}
                            </span>

                            {mensaje}
                        </div>
                    )}

                    {/* Formulario de registro y edición */}
                    {mostrarFormulario && (
                        <form
                            className="products-form products-form-modern"
                            onSubmit={registrarProducto}
                        >
                            <div className="products-form-heading">
                                <div>
                                    <span className="erp-page-eyebrow">
                                        CATÁLOGO DE PRODUCTOS
                                    </span>

                                    <h2>
                                        {productoEditando !== null
                                            ? "Editar producto"
                                            : "Registrar producto"}
                                    </h2>

                                    <p>
                                        Los campos marcados con * son
                                        obligatorios.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="products-cancel-button"
                                    onClick={cancelarFormulario}
                                >
                                    Cancelar
                                </button>
                            </div>

                            <div className="products-form-grid">
                                <label>
                                    Nombre del producto *
                                    <input
                                        name="nombre"
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        maxLength={150}
                                        placeholder="Ej. Mouse inalámbrico"
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
                                        placeholder="Descripción del producto"
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
                                        placeholder="0"
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
                                        placeholder="0"
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
                                        <option value="">
                                            Selecciona una categoría
                                        </option>

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
                                        <option value="">
                                            Selecciona un proveedor
                                        </option>

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
                            </div>

                            <div className="products-form-actions">
                                <button
                                    type="button"
                                    className="products-cancel-button"
                                    onClick={cancelarFormulario}
                                >
                                    Descartar
                                </button>

                                <button
                                    type="submit"
                                    className="products-save-button"
                                    disabled={guardando}
                                >
                                    {guardando
                                        ? "Guardando..."
                                        : productoEditando !== null
                                            ? "Guardar cambios"
                                            : "Guardar producto"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Tabla de productos */}
                    <section className="products-table-container products-table-modern">
                        <div className="products-table-heading">
                            <div>
                                <h2>Catálogo de productos</h2>

                                <p>
                                    Consulta y administra los registros
                                    guardados en la base de datos.
                                </p>
                            </div>

                            {!cargando && (
                                <span className="products-result-count">
                                    {productosFiltrados.length}{" "}
                                    {productosFiltrados.length === 1
                                        ? "resultado"
                                        : "resultados"}
                                </span>
                            )}
                        </div>

                        {cargando ? (
                            <div className="products-loading">
                                <span className="products-loading-dot"></span>
                                Cargando catálogo de productos...
                            </div>
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
                                                <td>
                                                    <span className="products-name">
                                                        {producto.nombre}
                                                    </span>

                                                    {producto.descripcion && (
                                                        <span className="products-description">
                                                            {producto.descripcion}
                                                        </span>
                                                    )}
                                                </td>

                                                <td>
                                                    {producto.categoria || "—"}
                                                </td>

                                                <td>
                                                    {producto.proveedor || "—"}
                                                </td>

                                                <td className="products-price">
                                                    {formatoCOP(
                                                        producto.precio_compra
                                                    )}
                                                </td>

                                                <td className="products-price">
                                                    {formatoCOP(
                                                        producto.precio_venta
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            Number(producto.estado) === 1
                                                                ? "products-status products-status-active"
                                                                : "products-status products-status-inactive"
                                                        }
                                                    >
                                                        {Number(producto.estado) === 1
                                                            ? "Activo"
                                                            : "Inactivo"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="products-actions">
                                                        <button
                                                            type="button"
                                                            className="products-edit-button"
                                                            onClick={() =>
                                                                editarProducto(producto)
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="products-delete"
                                                            onClick={() =>
                                                                eliminarProducto(
                                                                    producto.id_producto
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                        {!error &&
                                            productosFiltrados.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="products-empty"
                                                    >
                                                        {busqueda
                                                            ? "No hay productos que coincidan con la búsqueda."
                                                            : "Todavía no hay productos registrados."}
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </section>

                {/* Pie de página */}
                <footer className="erp-dashboard-footer">
                    <span>ERP para PYMES</span>

                    <span>
                        Los datos se consultan y guardan en MySQL.
                    </span>
                </footer>
            </main>
        </ERPLayout>
    );
}

export default Products;

import { Link } from "react-router-dom";
import "../App.css";

// Indicadores visuales de la página principal del ERP.
const indicadores = [
    { titulo: "Productos", descripcion: "Consulta y administra los productos.", ruta: "/products", icono: "📦" },
    { titulo: "Ventas", descripcion: "Accede al módulo de ventas.", ruta: "/sales", icono: "🛒" },
    { titulo: "Inventario", descripcion: "Revisa las existencias disponibles.", ruta: "/inventory", icono: "🏷️" },
    { titulo: "Reportes", descripcion: "Consulta los informes del negocio.", ruta: "/reports", icono: "📊" },
];

function Dashboard() {
    return (
        <div className="erp-layout">
            {/* Menú de navegación principal */}
            <aside className="erp-sidebar">
                <h2>ERP <span>PYMES</span></h2>

                <nav aria-label="Navegación principal">
                    <Link to="/dashboard" className="erp-nav-active">
                        🏠 Dashboard
                    </Link>
                    <Link to="/products">📦 Productos</Link>
                    <Link to="/sales">🛒 Ventas</Link>
                    <Link to="/inventory">🏷️ Inventario</Link>
                    <Link to="/reports">📊 Reportes</Link>
                </nav>

                <Link to="/" className="erp-logout">
                    Cerrar sesión
                </Link>
            </aside>

            {/* Contenido principal */}
            <main className="erp-main">
                <header className="erp-header">
                    <div>
                        <h1>Panel principal</h1>
                        <p>Bienvenido al sistema de gestión ERP para PYMES.</p>
                    </div>
                </header>

                <section className="erp-welcome">
                    <h2>Gestiona tu negocio desde un solo lugar</h2>
                    <p>
                        Consulta los módulos disponibles y continúa
                        con las actividades de administración.
                    </p>
                </section>

                <section className="erp-cards" aria-label="Módulos del sistema">
                    {indicadores.map((indicador) => (
                        <Link
                            to={indicador.ruta}
                            className="erp-card"
                            key={indicador.ruta}
                        >
                            <span className="erp-card-icon" aria-hidden="true">
                                {indicador.icono}
                            </span>
                            <h3>{indicador.titulo}</h3>
                            <p>{indicador.descripcion}</p>
                            <span className="erp-card-link">Abrir módulo →</span>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
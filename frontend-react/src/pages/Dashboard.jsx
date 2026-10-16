
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";

const indicadores = [
    {
        titulo: "Productos",
        descripcion: "Registra y administra los productos de tu empresa.",
        ruta: "/products",
        icono: "▦",
        color: "blue",
        disponible: true
    },
    {
        titulo: "Ventas",
        descripcion: "Espacio previsto para la gestión de ventas.",
        ruta: null,
        icono: "↗",
        color: "green",
        disponible: false
    },
    {
        titulo: "Inventario",
        descripcion: "Espacio previsto para el control de existencias.",
        ruta: null,
        icono: "▤",
        color: "orange",
        disponible: false
    },
    {
        titulo: "Reportes",
        descripcion: "Espacio previsto para los informes del negocio.",
        ruta: null,
        icono: "▥",
        color: "purple",
        disponible: false
    }
];

function Dashboard() {
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarSesion = () => {
        navigate("/");
    };

    return (
        <div className="erp-layout">
            <button
                type="button"
                className="erp-mobile-menu"
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-label={
                    menuAbierto
                        ? "Cerrar menú de navegación"
                        : "Abrir menú de navegación"
                }
                aria-expanded={menuAbierto}
            >
                {menuAbierto ? "✕" : "☰"}
            </button>

            {menuAbierto && (
                <button
                    type="button"
                    className="erp-mobile-overlay"
                    aria-label="Cerrar menú"
                    onClick={() => setMenuAbierto(false)}
                />
            )}

            <aside
                className={`erp-sidebar ${
                    menuAbierto ? "erp-sidebar-open" : ""
                }`}
            >
                <Link
                    to="/dashboard"
                    className="erp-brand"
                    onClick={() => setMenuAbierto(false)}
                >
                    <span className="erp-brand-icon">E</span>
                    <span className="erp-brand-text">
                        ERP
                        <strong>PARA PYMES</strong>
                    </span>
                </Link>

                <div className="erp-sidebar-caption">
                    MENÚ PRINCIPAL
                </div>

                <nav aria-label="Navegación principal">
                    <Link
                        to="/dashboard"
                        className="erp-nav-link erp-nav-active"
                        onClick={() => setMenuAbierto(false)}
                    >
                        <span className="erp-nav-icon">▦</span>
                        Dashboard
                    </Link>

                    <Link
                        to="/products"
                        className="erp-nav-link"
                        onClick={() => setMenuAbierto(false)}
                    >
                        <span className="erp-nav-icon">▤</span>
                        Productos
                    </Link>

                    <div className="erp-nav-link erp-nav-disabled">
                        <span className="erp-nav-icon">↗</span>
                        Ventas
                        <span className="erp-nav-badge">Próximo</span>
                    </div>

                    <div className="erp-nav-link erp-nav-disabled">
                        <span className="erp-nav-icon">▥</span>
                        Inventario
                        <span className="erp-nav-badge">Próximo</span>
                    </div>

                    <div className="erp-nav-link erp-nav-disabled">
                        <span className="erp-nav-icon">▧</span>
                        Reportes
                        <span className="erp-nav-badge">Próximo</span>
                    </div>
                </nav>

                <div className="erp-sidebar-bottom">
                    <div className="erp-sidebar-help">
                        <span className="erp-help-icon">i</span>
                        <div>
                            <strong>ERP para PYMES</strong>
                            <p>Plataforma de gestión empresarial</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="erp-logout"
                        onClick={cerrarSesion}
                    >
                        <span>↪</span>
                        Volver al inicio
                    </button>
                </div>
            </aside>

            <main className="erp-main">
                <header className="erp-header erp-header-modern">
                    <div className="erp-header-title">
                        <span className="erp-page-eyebrow">
                            ESPACIO DE TRABAJO
                        </span>
                        <h1>Panel principal</h1>
                        <p>
                            Consulta el estado de los módulos de tu ERP.
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

                <section className="erp-welcome erp-welcome-modern">
                    <div className="erp-welcome-content">
                        <span className="erp-welcome-tag">
                            ERP PARA PYMES
                        </span>

                        <h2>
                            Gestiona tu negocio
                            <br />
                            desde un solo lugar.
                        </h2>

                        <p>
                            Administra tus productos y organiza la
                            información de tu empresa desde una plataforma
                            centralizada.
                        </p>

                        <Link
                            to="/products"
                            className="erp-welcome-button"
                        >
                            Ir a productos <span>→</span>
                        </Link>
                    </div>

                    <div
                        className="erp-welcome-decoration"
                        aria-hidden="true"
                    >
                        <div className="erp-decoration-circle">
                            <span>ERP</span>
                            <strong>PYMES</strong>
                        </div>
                    </div>
                </section>

                <section className="erp-modules-heading">
                    <div>
                        <h2>Módulos del sistema</h2>
                        <p>
                            Accede a las funcionalidades disponibles.
                        </p>
                    </div>

                    <span className="erp-module-count">
                        {indicadores.filter(
                            (item) => item.disponible
                        ).length}{" "}
                        módulo disponible
                    </span>
                </section>

                <section
                    className="erp-cards erp-cards-modern"
                    aria-label="Módulos del sistema"
                >
                    {indicadores.map((indicador) => {
                        const contenido = (
                            <>
                                <div
                                    className={`erp-card-icon erp-icon-${indicador.color}`}
                                    aria-hidden="true"
                                >
                                    {indicador.icono}
                                </div>

                                <div className="erp-card-title-row">
                                    <h3>{indicador.titulo}</h3>
                                    {indicador.disponible ? (
                                        <span className="erp-status-available">
                                            Disponible
                                        </span>
                                    ) : (
                                        <span className="erp-status-soon">
                                            Próximamente
                                        </span>
                                    )}
                                </div>

                                <p>{indicador.descripcion}</p>

                                <span className="erp-card-link">
                                    {indicador.disponible
                                        ? "Abrir módulo →"
                                        : "En desarrollo"}
                                </span>
                            </>
                        );

                        return indicador.disponible ? (
                            <Link
                                to={indicador.ruta}
                                className="erp-card erp-card-modern"
                                key={indicador.titulo}
                            >
                                {contenido}
                            </Link>
                        ) : (
                            <article
                                className="erp-card erp-card-modern erp-card-unavailable"
                                key={indicador.titulo}
                            >
                                {contenido}
                            </article>
                        );
                    })}
                </section>

                <footer className="erp-dashboard-footer">
                    <span>ERP para PYMES</span>
                    <span>Plataforma de gestión empresarial · 2026</span>
                </footer>
            </main>
        </div>
    );
}

export default Dashboard;

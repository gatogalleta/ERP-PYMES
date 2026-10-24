
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ERPLayout from "../components/ERPLayout";
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

    const [usuario] = useState(() => {
        try {
            return JSON.parse(
                sessionStorage.getItem("erp_usuario") || "null"
            );
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (!usuario) {
            navigate("/login", { replace: true });
        }
    }, [usuario, navigate]);

    if (!usuario) {
        return null;
    }

    return (
        <ERPLayout>
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
                        <div className="erp-profile-avatar">
                            {usuario?.nombre?.trim()?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="erp-profile-info">
                            <strong>{usuario?.nombre || "Usuario"}</strong>
                            <span>{usuario?.rol || "Usuario del sistema"}</span>
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
                    <span>
                        Plataforma de gestión empresarial · 2026
                    </span>
                </footer>
            </main>
        </ERPLayout>
    );
}

export default Dashboard;

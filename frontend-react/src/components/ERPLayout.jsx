
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function ERPLayout({ children }) {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const cerrarSesion = () => {
        sessionStorage.removeItem("erp_usuario");
        setMenuAbierto(false);
        navigate("/login", { replace: true });
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
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
                    onClick={cerrarMenu}
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
                    onClick={cerrarMenu}
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
                        className={`erp-nav-link ${
                            location.pathname === "/dashboard"
                                ? "erp-nav-active"
                                : ""
                        }`}
                        onClick={cerrarMenu}
                    >
                        <span className="erp-nav-icon">▦</span>
                        Dashboard
                    </Link>

                    <Link
                        to="/products"
                        className={`erp-nav-link ${
                            location.pathname === "/products"
                                ? "erp-nav-active"
                                : ""
                        }`}
                        onClick={cerrarMenu}
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
                            <p>
                                Plataforma de gestión empresarial
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="erp-logout"
                        onClick={cerrarSesion}
                    >
                        <span>↪</span>
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {children}
        </div>
    );
}

export default ERPLayout;

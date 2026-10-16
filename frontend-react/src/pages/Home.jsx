
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <header className="home-header">
                <Link to="/" className="home-logo">
                    <span className="home-logo-icon">E</span>
                    <span>
                        ERP <strong>PARA PYMES</strong>
                    </span>
                </Link>

                <nav className="home-nav">
                    <a href="#inicio">Inicio</a>
                    <a href="#nosotros">Nosotros</a>
                    <a href="#servicios">Servicios</a>
                    <a href="#contacto">Contacto</a>
                </nav>

                <Link to="/login" className="home-login-button">
                    Iniciar sesión
                </Link>
            </header>

            <main>
                <section className="home-hero" id="inicio">
                    <div className="home-hero-content">
                        <span className="home-tag">
                            GESTIÓN EMPRESARIAL INTELIGENTE
                        </span>

                        <h1>
                            Administra tu negocio
                            <span> desde un solo lugar.</span>
                        </h1>

                        <p>
                            Organiza tus productos, controla tu inventario
                            y gestiona la información de tu empresa con
                            una plataforma diseñada para pequeñas y
                            medianas empresas.
                        </p>

                        <div className="home-hero-actions">
                            <Link
                                to="/login"
                                className="home-primary-button"
                            >
                                Ingresar al sistema
                            </Link>

                            <a
                                href="#servicios"
                                className="home-secondary-button"
                            >
                                Conocer los servicios
                            </a>
                        </div>

                        <div className="home-trust">
                            <span>✓</span>
                            Organización
                            <span>✓</span>
                            Control
                            <span>✓</span>
                            Eficiencia
                        </div>
                    </div>

                    <div className="home-hero-visual">
                        <div className="home-dashboard-preview">
                            <div className="preview-top">
                                <div>
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                    <span className="preview-dot"></span>
                                </div>
                                <span>Panel de gestión</span>
                            </div>

                            <div className="preview-content">
                                <div className="preview-sidebar">
                                    <span className="preview-sidebar-logo">
                                        ERP
                                    </span>
                                    <span className="preview-menu active">
                                        ▦
                                    </span>
                                    <span className="preview-menu">▤</span>
                                    <span className="preview-menu">♙</span>
                                    <span className="preview-menu">⚙</span>
                                </div>

                                <div className="preview-main">
                                    <span className="preview-label">
                                        RESUMEN GENERAL
                                    </span>
                                    <h3>Tu empresa, bajo control</h3>

                                    <div className="preview-stats">
                                        <div className="preview-stat">
                                            <span>Productos</span>
                                            <strong>Inventario</strong>
                                            <div className="preview-bar bar-one"></div>
                                        </div>

                                        <div className="preview-stat">
                                            <span>Gestión</span>
                                            <strong>Organizada</strong>
                                            <div className="preview-bar bar-two"></div>
                                        </div>
                                    </div>

                                    <div className="preview-chart">
                                        <div className="chart-heading">
                                            <span>Control de recursos</span>
                                            <span>ERP</span>
                                        </div>

                                        <div className="chart-bars">
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="home-floating-card">
                            <span className="floating-check">✓</span>
                            <div>
                                <strong>Todo organizado</strong>
                                <p>Información centralizada</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-about" id="nosotros">
                    <span className="home-section-tag">QUIÉNES SOMOS</span>
                    <h2>Una mejor forma de gestionar tu empresa</h2>
                    <p>
                        ERP para PYMES es un proyecto orientado a facilitar
                        la administración de pequeñas y medianas empresas
                        mediante herramientas digitales para organizar
                        sus procesos y su información.
                    </p>
                </section>

                <section className="home-services" id="servicios">
                    <div className="home-section-heading">
                        <span className="home-section-tag">
                            NUESTROS SERVICIOS
                        </span>
                        <h2>Herramientas para tu negocio</h2>
                        <p>
                            Funcionalidades pensadas para centralizar
                            la información y facilitar el trabajo diario.
                        </p>
                    </div>

                    <div className="home-service-grid">
                        <article className="home-service-card">
                            <span className="service-icon">▦</span>
                            <h3>Gestión de productos</h3>
                            <p>
                                Registra, consulta, actualiza y elimina
                                productos desde el módulo de inventario.
                            </p>
                        </article>

                        <article className="home-service-card">
                            <span className="service-icon">♙</span>
                            <h3>Acceso de usuarios</h3>
                            <p>
                                Ingresa al sistema mediante un formulario
                                de autenticación conectado al servidor.
                            </p>
                        </article>

                        <article className="home-service-card">
                            <span className="service-icon">▤</span>
                            <h3>Información centralizada</h3>
                            <p>
                                Consulta y administra datos almacenados
                                en la base de datos de la aplicación.
                            </p>
                        </article>
                    </div>
                </section>

                <section className="home-contact" id="contacto">
                    <div>
                        <span className="home-section-tag">
                            EMPIEZA AQUÍ
                        </span>
                        <h2>Ingresa a tu plataforma de gestión</h2>
                        <p>
                            Accede al sistema para utilizar los módulos
                            disponibles de ERP para PYMES.
                        </p>
                    </div>

                    <Link
                        to="/login"
                        className="home-primary-button"
                    >
                        Acceder al sistema
                    </Link>
                </section>
            </main>

            <footer className="home-footer">
                <Link to="/" className="home-logo footer-logo">
                    <span className="home-logo-icon">E</span>
                    <span>
                        ERP <strong>PARA PYMES</strong>
                    </span>
                </Link>

                <p>
                    Proyecto de software para la gestión empresarial.
                </p>

                <span>© 2026 ERP para PYMES</span>
            </footer>
        </div>
    );
}

export default Home;

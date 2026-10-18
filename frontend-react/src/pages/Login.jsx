
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [esError, setEsError] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMensaje("");
        setEsError(false);
        setCargando(true);

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setEsError(true);
                setMensaje(
                    data.mensaje ||
                    "No fue posible iniciar sesión."
                );
                return;
            }

            
            if (!data.usuario) {
                setEsError(true);
                setMensaje("El servidor no devolvió los datos del usuario.");
                return;
            }

            sessionStorage.setItem(
    "erp_usuario",
    JSON.stringify(data.usuario)
);

console.log(
    "Usuario guardado:",
    sessionStorage.getItem("erp_usuario")
);

navigate("/dashboard");

        } catch (error) {
            console.error("Error de conexión:", error);
            setEsError(true);
            setMensaje(
                "No fue posible conectar con el servidor. Verifica que el backend esté funcionando."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="login-page">
            <div className="login-background-shape login-shape-one"></div>
            <div className="login-background-shape login-shape-two"></div>

            <Link to="/" className="login-back-home">
                <span aria-hidden="true">←</span>
                Volver al inicio
            </Link>

            <section className="login-container">
                <div className="login-brand">
                    <div className="login-brand-icon">E</div>

                    <p className="login-brand-name">
                        ERP <strong>PARA PYMES</strong>
                    </p>

                    <span className="login-brand-caption">
                        GESTIÓN EMPRESARIAL
                    </span>
                </div>

                <div className="login-card">
                    <div className="login-card-heading">
                        <span className="login-eyebrow">
                            BIENVENIDO DE NUEVO
                        </span>

                        <h1>Iniciar sesión</h1>

                        <p>
                            Ingresa tus credenciales para acceder
                            a tu espacio de trabajo.
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="login-field">
                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <div className="login-input-wrap">
                                <span
                                    className="login-input-icon"
                                    aria-hidden="true"
                                >
                                    @
                                </span>

                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="nombre@empresa.com"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <div className="login-password-heading">
                                <label htmlFor="password">
                                    Contraseña
                                </label>
                                <span className="login-private-label">
                                    Acceso seguro
                                </span>
                            </div>

                            <div className="login-input-wrap">
                                <span
                                    className="login-input-icon"
                                    aria-hidden="true"
                                >
                                    *
                                </span>

                                <input
                                    type={
                                        mostrarPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Ingresa tu contraseña"
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="login-show-password"
                                    onClick={() =>
                                        setMostrarPassword(
                                            !mostrarPassword
                                        )
                                    }
                                    aria-label={
                                        mostrarPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {mostrarPassword
                                        ? "Ocultar"
                                        : "Ver"}
                                </button>
                            </div>
                        </div>

                        {mensaje && (
                            <div
                                className={
                                    esError
                                        ? "login-message login-message-error"
                                        : "login-message login-message-success"
                                }
                                role="alert"
                            >
                                <span aria-hidden="true">
                                    {esError ? "!" : "✓"}
                                </span>
                                <p>{mensaje}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={cargando}
                        >
                            {cargando
                                ? "Verificando acceso..."
                                : "Ingresar al sistema"}

                            {!cargando && (
                                <span aria-hidden="true">→</span>
                            )}
                        </button>
                    </form>

                    <div className="login-security-note">
                        <span aria-hidden="true">✓</span>
                        <p>
                            Tu acceso es validado por el servidor
                            del sistema.
                        </p>
                    </div>
                </div>

                <p className="login-footer">
                    © 2026 ERP para PYMES · Plataforma de gestión empresarial
                </p>
            </section>
        </main>
    );
}

export default Login;

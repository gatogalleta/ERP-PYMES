
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

            if (!data.usuario || !data.token) {
                setEsError(true);
                setMensaje(
                    "El servidor no devolvió el usuario o el token."
                );
                return;
            }

            // Guardar los datos de la sesión.
            sessionStorage.setItem(
                "erp_usuario",
                JSON.stringify(data.usuario)
            );

            sessionStorage.setItem(
                "erp_token",
                data.token
            );

            // Verificar que la sesión se haya guardado.
            console.log(
                "Sesión guardada:",
                Boolean(sessionStorage.getItem("erp_token")),
                Boolean(sessionStorage.getItem("erp_usuario"))
            );

            // Entrar al dashboard.
            navigate("/dashboard", { replace: true });

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
                <div className="login-card">
                    <div className="login-header">
                        <h1>ERP para PYMES</h1>
                        <p>Ingresa a tu cuenta</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-form-group">
                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="correo@ejemplo.com"
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="login-form-group">
                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <div className="login-password-wrapper">
                                <input
                                    id="password"
                                    type={
                                        mostrarPassword
                                            ? "text"
                                            : "password"
                                    }
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
                                    className="login-password-toggle"
                                    onClick={() =>
                                        setMostrarPassword(!mostrarPassword)
                                    }
                                    aria-label={
                                        mostrarPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {mostrarPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>

                        {mensaje && (
                            <div
                                className={
                                    esError
                                        ? "login-message login-error"
                                        : "login-message"
                                }
                                role="alert"
                            >
                                {mensaje}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={cargando}
                        >
                            {cargando
                                ? "Ingresando..."
                                : "Iniciar sesión"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Login;

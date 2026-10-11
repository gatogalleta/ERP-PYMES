import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [esError, setEsError] = useState(false);
    const [cargando, setCargando] = useState(false);

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
                    data.mensaje || "No fue posible iniciar sesión."
                );
                return;
            }

            console.log("Usuario autenticado:", data.usuario);
            
            navigate("/dashboard");
        } catch (error) {
            console.error("Error de conexión:", error);
            setEsError(true);
            setMensaje(
                "No fue posible conectar con el servidor."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <main>
            <h1>Iniciar sesión</h1>
            <p>ERP para PYMES</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Ingrese su correo"
                        autoComplete="username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Ingrese su contraseña"
                        autoComplete="current-password"
                        required
                    />
                </div>

                <button type="submit" disabled={cargando}>
                    {cargando
                        ? "Verificando..."
                        : "Iniciar sesión"}
                </button>
            </form>

            {mensaje && (
                <p
                    role="status"
                    style={{
                        color: esError ? "#b91c1c" : "#15803d"
                    }}
                >
                    {mensaje}
                </p>
            )}
        </main>
    );
}

export default Login;
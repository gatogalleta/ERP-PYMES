
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

// Rutas principales del ERP para PYMES.
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página pública de bienvenida */}
                <Route path="/" element={<Home />} />

                {/* Inicio de sesión */}
                <Route path="/login" element={<Login />} />

                {/* Módulos existentes del ERP */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                {/* Redirigir las rutas desconocidas al inicio */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

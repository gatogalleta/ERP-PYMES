
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

// Componente principal de la aplicación ERP para PYMES.
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página de inicio de sesión */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                {/* Las páginas restantes se incorporarán progresivamente */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


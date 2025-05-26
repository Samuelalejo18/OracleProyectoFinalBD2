import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cliente from "./pages/cliente";
import Factura from "./pages/factura";
import Producto from "./pages/producto";
import DetalleFactura from "./pages/detalleFactura";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/detalleFactura" element={<DetalleFactura />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

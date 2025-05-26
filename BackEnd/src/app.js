const express = require("express");
const server = express();
const cors = require("cors");
const routerCliente= require("../src/routes/cliente/cliente.route");
const  routerProducto= require("../src/routes/Producto/producto.route");
const routerFactura = require("../src/routes/factura/factura.route")
const routerDetalleFactura = require("./routes/DetalleFactura/detalleFactura.route")
// Middlewares
server.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

server.use(express.json()); // Esto primero
server.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rutas
server.use("/api", routerCliente);
server.use("/api", routerProducto);
server.use("/api", routerFactura);
server.use("/api", routerDetalleFactura );


module.exports = server;
const { Router } = require("express");
const routerDetalleFactura = Router();
// Asegúrate que esta ruta esté correcta
const {
    getDetallesFactura,
    getDetalleFactura
} = require("../../controller/DetalleFactura/getDF.controller");

console.log({ getDetallesFactura, getDetalleFactura });

const {
    createDetalleFactura
} = require("../../controller/DetalleFactura/createDF.controller");

const {
    updateDetalleFactura
} = require("../../controller/DetalleFactura/updateDF.controller");

const {
    deleteDetalleFactura
} = require("../../controller/DetalleFactura/deleteDF.controller");



routerDetalleFactura.get("/getDetallesFactura", getDetallesFactura);
routerDetalleFactura.get("/getDetalleFactura/:num_fac/:cod_pro", getDetalleFactura);

routerDetalleFactura.post("/createDetalleFactura", createDetalleFactura);
routerDetalleFactura.put("/updateDetalleFactura/:num_fac/:cod_pro", updateDetalleFactura);
routerDetalleFactura.delete("/deleteDetalleFactura/:num_fac/:cod_pro", deleteDetalleFactura);

module.exports = routerDetalleFactura;
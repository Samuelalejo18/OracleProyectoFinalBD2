const { Router } = require("express");
const {
    getFacturas,
    getFactura,

} = require("../../controller/factura/getFacturas.controller");

const { createFactura } = require("../../controller/factura/createFactura.controller")
const { updateFactura } = require("../../controller/factura/updateFactura.controller")
const { deleteFactura } = require("../../controller/factura/deleteFactura.controller")
const routerFactura = Router();

routerFactura.get("/getFacturas", getFacturas);
routerFactura.get("/getFactura/:id", getFactura);


routerFactura.post("/createFactura", createFactura);
routerFactura.put("/updateFactura/:id", updateFactura);
routerFactura.delete("/deleteFactura/:id", deleteFactura);

module.exports = routerFactura;
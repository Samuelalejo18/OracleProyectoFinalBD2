const { Router } = require("express");

const routerCliente = Router();


const { getClientes, getClienteById } = require("../../controller/cliente/getClientes.controller");
const { createCliente } = require("../../controller/cliente/createCliente.controller");
const { deleteCliente } = require("../../controller/cliente/deleteCliente.controller")
const { updateCliente } = require("../../controller/cliente/updateCliente.controller")


routerCliente.get("/getClientes", getClientes);
routerCliente.get("/getCliente/:id", getClienteById);
routerCliente.post("/createCliente", createCliente);
routerCliente.put("/updateCliente/:id", updateCliente);
routerCliente.delete("/deleteCliente/:id", deleteCliente);





module.exports = routerCliente;
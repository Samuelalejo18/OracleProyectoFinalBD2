const { Router } = require("express");

const routerProducto = Router();


const { getProductos, getProducto } = require("../../controller/Producto/getProductos.controller");
const { createProducto } = require("../../controller/Producto/createProducto.controller");



const { updateProducto } = require("../../controller/Producto/updateProducto.controller")
const { deleteProducto } = require("../../controller/Producto/deleteProducto.controller")


routerProducto.get("/getProductos", getProductos);
routerProducto.get("/getProducto/:id", getProducto);
routerProducto.post("/createProducto", createProducto);
routerProducto.put("/updateProducto/:id", updateProducto);
routerProducto.delete("/deleteProducto/:id", deleteProducto);


module.exports = routerProducto;
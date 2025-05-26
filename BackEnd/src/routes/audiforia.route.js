const { Router } = require("express");

const routerAuditoria = Router();

const { getAuditorias,
    getAuditoriasFactura,
    getAuditoriasProducto,
    getAuditoriasVendedor,
    getAuditoriasCliente,
    getAuditoriasDetalleFactura,
    getAuditoriasDistrito,
    getAuditoriasProveedor,
    getAuditoriasOrdenCompra,
    getAuditoriasDetalleCompra,
    getAuditoriasAbastecimiento } = require("../controller/auditoria.controller")


routerAuditoria.get("/auditorias", getAuditorias);
routerAuditoria.get("/auditoria/factura", getAuditoriasFactura);
routerAuditoria.get("/auditoria/factura", getAuditoriasFactura);
routerAuditoria.get("/auditoria/producto", getAuditoriasProducto);
routerAuditoria.get("/auditoria/vendedor", getAuditoriasVendedor);
routerAuditoria.get("/auditoria/cliente", getAuditoriasCliente);
routerAuditoria.get("/auditoria/detalle-factura", getAuditoriasDetalleFactura);
routerAuditoria.get("/auditoria/distrito", getAuditoriasDistrito);
routerAuditoria.get("/auditoria/proveedor", getAuditoriasProveedor);
routerAuditoria.get("/auditoria/orden-compra", getAuditoriasOrdenCompra);
routerAuditoria.get("/auditoria/detalle-compra", getAuditoriasDetalleCompra);
routerAuditoria.get("/auditoria/abastecimiento", getAuditoriasAbastecimiento);


module.exports = routerAuditoria;
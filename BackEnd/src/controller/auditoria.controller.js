
const oracledb = require("oracledb");

const getAuditoriasFactura = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'FACTURA');
};

const getAuditoriasProducto = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'PRODUCTO');
};

const getAuditoriasVendedor = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'VENDEDOR');
};

const getAuditoriasCliente = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'CLIENTE');
};

const getAuditoriasDetalleFactura = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'DETALLE_FACTURA');
};

const getAuditoriasDistrito = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'DISTRITO');
};

const getAuditoriasProveedor = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'PROVEEDOR');
};

const getAuditoriasOrdenCompra = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'ORDEN_COMPRA');
};

const getAuditoriasDetalleCompra = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'DETALLE_COMPRA');
};

const getAuditoriasAbastecimiento = async (req, res) => {
    await getAuditoriasPorTabla(req, res, 'ABASTECIMIENTO');
};


const getAuditoriasPorTabla = async (req, res, nombreTabla) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        console.log("Conexión exitosa");

        const result = await connection.execute(
            `SELECT id_audit, nombre_tabla, tipo_operacion, usuario_bdd, fecha_operacion, detalle 
       FROM auditoria 
       WHERE nombre_tabla = :tabla 
       ORDER BY fecha_operacion DESC`,
            [nombreTabla],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `No se encontraron auditorías para la tabla ${nombreTabla}` });
        }

        // Función para leer el CLOB y devolver string
        const readClob = (lob) => {
            return new Promise((resolve, reject) => {
                if (lob === null) {
                    resolve(null);
                    return;
                }
                let clobData = '';
                lob.setEncoding('utf8');
                lob.on('data', (chunk) => clobData += chunk);
                lob.on('end', () => resolve(clobData));
                lob.on('error', (err) => reject(err));
            });
        };

        // Procesar cada fila para convertir el CLOB a string
        const rows = [];
        for (const row of result.rows) {
            const detalleText = await readClob(row.DETALLE);
            rows.push({
                id_audit: row.ID_AUDIT,
                nombre_tabla: row.NOMBRE_TABLA,
                tipo_operacion: row.TIPO_OPERACION,
                usuario_bdd: row.USUARIO_BDD,
                fecha_operacion: row.FECHA_OPERACION,
                detalle: detalleText,
            });
        }

        res.json(rows);

    } catch (err) {
        console.error("Error en la consulta:", err.message);
        res.status(500).send("Error en la base de datos: " + err.message);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error cerrando conexión:", err.message);
            }
        }
    }
};


const getAuditorias = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        console.log("Conexión exitosa");

        // Traemos todos los campos, incluido detalle (CLOB)
        const result = await connection.execute(
            `SELECT  * FROM auditoria`,
            {},
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        // Función para leer CLOB y devolver string
        const readClob = (lob) => {
            return new Promise((resolve, reject) => {
                if (lob === null) {
                    resolve(null);
                    return;
                }
                let clobData = '';
                lob.setEncoding('utf8');
                lob.on('data', (chunk) => clobData += chunk);
                lob.on('end', () => resolve(clobData));
                lob.on('error', (err) => reject(err));
            });
        };

        // Procesar cada fila para convertir el CLOB a string
        const rows = [];
        for (const row of result.rows) {
            const detalleText = await readClob(row.DETALLE);
            rows.push({
                id_audit: row.ID_AUDIT,
                nombre_tabla: row.NOMBRE_TABLA,
                tipo_operacion: row.TIPO_OPERACION,
                usuario_bdd: row.USUARIO_BDD,
                fecha_operacion: row.FECHA_OPERACION,
                detalle: detalleText,
            });
        }

        res.json(rows);

    } catch (err) {
        console.error("Error en la consulta:", err.message);
        res.status(500).send("Error en la base de datos: " + err.message);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error cerrando conexión:", err.message);
            }
        }
    }
};
module.exports = {
    getAuditorias,
    getAuditoriasFactura,
    getAuditoriasProducto,
    getAuditoriasVendedor,
    getAuditoriasCliente,
    getAuditoriasDetalleFactura,
    getAuditoriasDistrito,
    getAuditoriasProveedor,
    getAuditoriasOrdenCompra,
    getAuditoriasDetalleCompra,
    getAuditoriasAbastecimiento
};
const oracledb = require("oracledb");


// PUT - Actualizar detalle
const updateDetalleFactura = async (req, res) => {
    let connection;
    const { num_fac, cod_pro } = req.params;
    const { CAN_VEN, PRE_VEN } = req.body;

    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `UPDATE DETALLE_FACTURA 
       SET CAN_VEN = :1, PRE_VEN = :2
       WHERE TRIM(NUM_FAC) = :3 AND TRIM(COD_PRO) = :4`,
            [CAN_VEN, PRE_VEN, num_fac, cod_pro],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: "Detalle no encontrado" });
        }

        res.status(200).json({ message: "Detalle actualizado exitosamente" });
    } catch (err) {
        console.error("Error al actualizar detalle:", err);
        res.status(500).send("Error en la base de datos");
    } finally {
        if (connection) await connection.close();
    }
};


module.exports = { updateDetalleFactura };
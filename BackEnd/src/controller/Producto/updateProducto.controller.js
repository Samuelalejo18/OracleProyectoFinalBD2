const oracledb = require("oracledb");


const updateProducto = async (req, res) => {
    let connection;
    const { id } = req.params;

    const {
        DES_PRO,
        PRE_PRO,
        SAC_PRO,
        SME_PRO,
        UNI_PRO,
        LIN_PRO,
        IMP_PRO
    } = req.body;

    if (!id || !id.trim()) {
        return res.status(400).json({ message: "Código de producto inválido o no proporcionado" });
    }

    try {
        connection = await oracledb.getConnection();

        await connection.execute(
            `UPDATE PRODUCTO SET
        DES_PRO = :DES_PRO,
        PRE_PRO = :PRE_PRO,
        SAC_PRO = :SAC_PRO,
        SME_PRO = :SME_PRO,
        UNI_PRO = :UNI_PRO,
        LIN_PRO = :LIN_PRO,
        IMP_PRO = :IMP_PRO
      WHERE TRIM(COD_PRO) = :codigo`,
            {
                DES_PRO,
                PRE_PRO,
                SAC_PRO,
                SME_PRO,
                UNI_PRO,
                LIN_PRO,
                IMP_PRO,
                codigo: id.trim()
            },
            { autoCommit: true }
        );

        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (err) {
        console.error("Error al actualizar producto:", err);
        res.status(500).send("Error en la base de datos");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error al cerrar conexión:", err);
            }
        }
    }
};


module.exports = { updateProducto };

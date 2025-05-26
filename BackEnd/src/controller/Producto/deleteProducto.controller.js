const oracledb = require("oracledb");
const deleteProducto = async (req, res) => {
    let connection;
    const { id } = req.params;

    if (!id || !id.trim()) {
        return res.status(400).json({ message: "Código de producto inválido o no proporcionado" });
    }

    try {
        connection = await oracledb.getConnection();

        await connection.execute(
            `DELETE FROM PRODUCTO WHERE TRIM(COD_PRO) = :codigo`,
            [id.trim()],
            { autoCommit: true }
        );

        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar producto:", err);
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

module.exports = { deleteProducto }

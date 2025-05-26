const oracledb = require("oracledb");
const createFactura = async (req, res) => {
    let connection;

    const {
        NUM_FAC,
        FEC_FAC,
        COD_CLI,
        FEC_CAN,
        EST_FAC,
        COD_VEN,
        POR_IGV
    } = req.body;

    if (!NUM_FAC) {
        return res.status(400).json({ message: "El número de factura es requerido" });
    }

    try {
        connection = await oracledb.getConnection();

        // Validar si la factura ya existe
        const check = await connection.execute(
            `SELECT 1 FROM FACTURA WHERE TRIM(NUM_FAC) = :numero`,
            [NUM_FAC.trim()],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (check.rows.length > 0) {
            return res.status(409).json({ message: `Ya existe una factura con el número ${NUM_FAC.trim()}` });
        }

       // Validar que exista el cliente
        const checkCliente = await connection.execute(
            `SELECT 1 FROM CLIENTE WHERE TRIM(COD_CLI) = :codigo`,
            [COD_CLI.trim()],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (checkCliente.rows.length === 0) {
            return res.status(400).json({ message: `El código de cliente ${COD_CLI.trim()} no existe` });
        }

        // Validar que exista el vendedor
        const checkVendedor = await connection.execute(
            `SELECT 1 FROM VENDEDOR WHERE TRIM(COD_VEN) = :codigo`,
            [COD_VEN.trim()],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (checkVendedor.rows.length === 0) {
            return res.status(400).json({ message: `El código de vendedor ${COD_VEN.trim()} no existe` });
        }



        // Insertar la factura
        await connection.execute(
            `
      INSERT INTO FACTURA (
        NUM_FAC, FEC_FAC, COD_CLI, FEC_CAN, EST_FAC, COD_VEN, POR_IGV
      ) VALUES (
        :NUM_FAC, TO_DATE(:FEC_FAC, 'YYYY-MM-DD'), :COD_CLI,
        TO_DATE(:FEC_CAN, 'YYYY-MM-DD'), :EST_FAC, :COD_VEN, :POR_IGV
      )
      `,
            {
                NUM_FAC,
                FEC_FAC,
                COD_CLI,
                FEC_CAN,
                EST_FAC,
                COD_VEN,
                POR_IGV
            },
            { autoCommit: true }
        );

        res.status(201).json({ message: "Factura creada correctamente" });

    } catch (err) {
        console.error("Error al crear factura:", err);
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

module.exports = { createFactura };
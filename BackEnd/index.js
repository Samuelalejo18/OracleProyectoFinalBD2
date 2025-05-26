require("dotenv").config(); // Habilita el uso de variables de entorno

const { PORT } = process.env;
const server = require("./src/app.js");
const connectDB = require("./src/db.js");

// Conectar a Oracle DB
connectDB()
  .then(() => {
    // Iniciar servidor si la conexión fue exitosa
    server.listen(PORT, () => {
      console.log(`Servidor levantado en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos Oracle:", err);
  });
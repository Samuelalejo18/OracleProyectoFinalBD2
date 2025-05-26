import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [clientesLocal, setClientesLocal] = useState([]); // <= para respaldo
  const [busquedaId, setBusquedaId] = useState("");
  const [clienteFiltrado, setClienteFiltrado] = useState(null);
  const [clienteFiltradoLocal, setClienteFiltradoLocal] = useState(null);
  const [errorBusqueda, setErrorBusqueda] = useState(null);
  const [modoEdicionId, setModoEdicionId] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  useEffect(() => {
    // Simulamos datos JSON como si vinieran del backend
    const datosFalsos = [
      {
        COD_CLI: 1,
        RSO_CLI: "Empresa ABC",
        DIR_CLI: "Calle Falsa 123",
        TLF_CLI: "123456789",
        RUC_CLI: "987654321",
        COD_DIS: "LIMA01",
        FEC_REG: "2024-05-01",
        TIP_CLI: "Empresa",
        CON_CLI: "Activo",
      },
      {
        COD_CLI: 2,
        RSO_CLI: "Juan Pérez 2",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
      {
        COD_CLI: 3,
        RSO_CLI: "Juan Pérez 3",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
      {
        COD_CLI: 4,
        RSO_CLI: "Juan Pérez 4",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
      {
        COD_CLI: 5,
        RSO_CLI: "Juan Pérez 5",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
      {
        COD_CLI: 6,
        RSO_CLI: "Juan Pérez 6",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
      {
        COD_CLI: 7,
        RSO_CLI: "Juan Pérez 7",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
      {
        COD_CLI: 8,
        RSO_CLI: "Juan Pérez 8",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
      {
        COD_CLI: 9,
        RSO_CLI: "Juan Pérez 9",
        DIR_CLI: "Av. Siempre Viva 742",
        TLF_CLI: "987654321",
        RUC_CLI: "123456789",
        COD_DIS: "LIMA02",
        FEC_REG: "2023-10-15",
        TIP_CLI: "Persona Natural",
        CON_CLI: "Inactivo",
      },
    ];

    setClientes(datosFalsos);
    setClientesLocal(datosFalsos);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getClientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar clientes desde el backend:", error);
      });
  }, []);

  const buscarClientePorId = () => {
    if (!busquedaId) return;

    axios
      .get(`http://localhost:3000/api/getCliente/${busquedaId}`)
      .then((response) => {
        if (response.data && Object.keys(response.data).length > 0) {
          setClienteFiltrado(response.data);
          setErrorBusqueda(null);
        } else {
          const local = clientesLocal.find(
            (cliente) => cliente.COD_CLI.toString() === busquedaId
          );
          if (local) {
            setClienteFiltrado(local);
            setErrorBusqueda(null);
          } else {
            setClienteFiltrado(null);
            setErrorBusqueda("Cliente no encontrado");
          }
        }
      })
      .catch((error) => {
        const local = clientesLocal.find(
          (cliente) => cliente.COD_CLI.toString() === busquedaId
        );
        if (local) {
          setClienteFiltrado(local);
          setErrorBusqueda(null);
        } else {
          setClienteFiltrado(null);
          setErrorBusqueda("Cliente no encontrado");
        }
        console.error("Error al buscar cliente:", error);
      });
  };

  const actualizarCliente = (id, datosActualizados) => {
    axios
      .put(`http://localhost:3000/api/updateCliente/${id}`, datosActualizados)
      .then((res) => {
        alert("Cliente actualizado correctamente");
        setClienteFiltrado(null);
        setBusquedaId("");
        axios
          .get("http://localhost:3000/api/getClientes")
          .then((r) => setClientes(r.data));
      })
      .catch((err) => {
        console.error("Error al actualizar cliente:", err);
        alert("Error al actualizar cliente");
      });
  };

  const eliminarCliente = (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este cliente?"))
      return;

    axios
      .delete(`http://localhost:3000/api/deleteCliente/${id}`)
      .then(() => {
        alert("Cliente eliminado correctamente");
        // Actualiza la lista de clientes eliminando el cliente localmente
        setClientes((prev) => prev.filter((cli) => cli.COD_CLI !== id));
        setClienteFiltrado(null);
        setBusquedaId("");
      })
      .catch((error) => {
        console.error("Error al eliminar cliente:", error);
        alert("Error al eliminar cliente");
      });
  };

  return (
    <div className="h-full w-full p-20 flex flex-col gap-10">
      <span className="h-fit flex justify-between items-center">
        <h1 className="text-5xl font-bold leading-none">Cliente</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por ID"
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 outline-none"
          />
          <button
            onClick={buscarClientePorId}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </div>
      </span>
      <div className="flex flex-col gap-4 max-h-[591px] h-fit overflow-y-auto">
        <div className="flex justify-center items-center divide-x divide-gray-200 w-[1344px] bg-neutral-900 rounded-xl fixed">
          <span className="px-10 w-1/9 text-center">Nombre</span>
          <span className="px-10 w-1/9 text-center">Direccion</span>
          <span className="px-10 w-1/9 text-center">Telefono</span>
          <span className="px-10 w-1/9 text-center">Identificacion</span>
          <span className="px-10 w-1/9 text-center">Distrito</span>
          <span className="px-10 w-1/9 text-center">Fecha de registro</span>
          <span className="px-10 w-1/9 text-center">Tipo</span>
          <span className="px-10 w-1/9 text-center">Condicion</span>
          <span className="px-10 w-1/9 text-center">Acciones</span>
        </div>
        <div className="flex flex-col gap-4 mt-16">
          {clienteFiltrado ? (
            <div className="flex justify-center items-center divide-x divide-gray-200 w-full bg-neutral-900/50 rounded-xl h-18">
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.RSO_CLI || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      RSO_CLI: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.RSO_CLI}
                </span>
              )}
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.DIR_CLI || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      DIR_CLI: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.DIR_CLI}
                </span>
              )}
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.TLF_CLI || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      TLF_CLI: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.TLF_CLI}
                </span>
              )}
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.RUC_CLI || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      RUC_CLI: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.RUC_CLI}
                </span>
              )}
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.COD_DIS || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      COD_DIS: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.COD_DIS}
                </span>
              )}
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.FEC_REG || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      FEC_REG: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.FEC_REG}
                </span>
              )}
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.TIP_CLI || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      TIP_CLI: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.TIP_CLI}
                </span>
              )}
              {modoEdicionId === clienteFiltrado.COD_CLI ? (
                <input
                  type="text"
                  className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                  value={datosEditados.CON_CLI || ""}
                  onChange={(e) =>
                    setDatosEditados({
                      ...datosEditados,
                      CON_CLI: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="px-10 w-1/9 text-center">
                  {clienteFiltrado.CON_CLI}
                </span>
              )}
              <span className="px-10 h-full flex flex-col justify-evenly w-1/9 text-center">
                {modoEdicionId === clienteFiltrado.COD_CLI ? (
                  <button
                    onClick={() => {
                      actualizarCliente(clienteFiltrado.COD_CLI, datosEditados);
                      setModoEdicionId(null);
                    }}
                    className="bg-green-500/50 text-sm text-white py-1 rounded-xl hover:bg-green-600/50 hover:scale-105 hover:underline transition-all cursor-pointer"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setModoEdicionId(clienteFiltrado.COD_CLI);
                      setDatosEditados({ ...clienteFiltrado }); // Copia datos actuales
                    }}
                    className="bg-green-500/50 text-sm text-white py-1 rounded-xl hover:bg-green-600/50 hover:scale-105 hover:underline transition-all cursor-pointer"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => {
                    eliminarCliente(clienteFiltrado.COD_CLI);
                  }}
                  className="bg-red-500/50 text-sm text-white px-2 py-1 rounded-xl hover:bg-red-600/50 hover:scale-105 hover:underline transition-all cursor-pointer"
                >
                  Eliminar
                </button>
              </span>
            </div>
          ) : errorBusqueda ? (
            <p className="text-red-500">{errorBusqueda}</p>
          ) : (
            // Mostrar todos los clientes si no se ha hecho búsqueda
            clientes.map((cliente) => (
              <div
                key={cliente.COD_CLI}
                className="flex justify-center items-center divide-x divide-gray-200 w-full bg-neutral-900/50 rounded-xl hover:bg-neutral-900/70 transition-all h-18"
              >
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.RSO_CLI || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        RSO_CLI: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.RSO_CLI}
                  </span>
                )}
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.DIR_CLI || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        DIR_CLI: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.DIR_CLI}
                  </span>
                )}
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.TLF_CLI || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        TLF_CLI: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.TLF_CLI}
                  </span>
                )}
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.RUC_CLI || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        RUC_CLI: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.RUC_CLI}
                  </span>
                )}
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.COD_DIS || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        COD_DIS: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.COD_DIS}
                  </span>
                )}
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.FEC_REG || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        FEC_REG: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.FEC_REG}
                  </span>
                )}
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.TIP_CLI || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        TIP_CLI: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.TIP_CLI}
                  </span>
                )}
                {modoEdicionId === cliente.COD_CLI ? (
                  <input
                    type="text"
                    className="px-2 py-1 w-full text-white rounded outline-none bg-transparent border-b"
                    value={datosEditados.CON_CLI || ""}
                    onChange={(e) =>
                      setDatosEditados({
                        ...datosEditados,
                        CON_CLI: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="px-10 w-1/9 text-center">
                    {cliente.CON_CLI}
                  </span>
                )}
                <span className="px-10 h-full flex flex-col justify-evenly w-1/9 text-center">
                  {modoEdicionId === cliente.COD_CLI ? (
                    <button
                      onClick={() => {
                        actualizarCliente(cliente.COD_CLI, datosEditados);
                        setModoEdicionId(null);
                      }}
                      className="bg-green-500/50 text-sm text-white py-1 rounded-xl hover:bg-green-600/50 hover:scale-105 hover:underline transition-all cursor-pointer"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setModoEdicionId(cliente.COD_CLI);
                        setDatosEditados({ ...cliente }); // Copia datos actuales
                      }}
                      className="bg-green-500/50 text-sm text-white py-1 rounded-xl hover:bg-green-600/50 hover:scale-105 hover:underline transition-all cursor-pointer"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => eliminarCliente(cliente.COD_CLI)}
                    className="bg-red-500/50 text-sm text-white px-3 py-1 rounded-xl hover:bg-red-600/50 hover:scale-105 hover:underline transition-all cursor-pointer"
                  >
                    Eliminar
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {clienteFiltrado && (
          <button
            onClick={() => {
              setClienteFiltrado(null);
              setBusquedaId("");
            }}
            className="bg-blue-500/50 text-sm text-white px-2 py-1 rounded-xl hover:bg-blue-600/50 hover:scale-105 hover:underline transition-all mt-2 cursor-pointer"
          >
            Ver todos los clientes
          </button>
        )}
      </div>
    </div>
  );
}

export default Cliente;

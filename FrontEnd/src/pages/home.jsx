import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-10">
      <h1 className="text-6xl font-bold leading-none h-fit">
        Proyecto Final Base De Datos
      </h1>
      <div className="flex justify-center items-center gap-4 w-full">
        <Link
          to="/cliente"
          className="text-2xl cursor-pointer bg-neutral-700 px-4 py-2 rounded-xl hover:scale-105 transition-all"
        >
          Cliente
        </Link>
        <Link
          to="/proveedor"
          className="text-2xl cursor-pointer bg-neutral-700 px-4 py-2 rounded-xl hover:scale-105 transition-all"
        >
          Proveedor
        </Link>
        <Link
          to="/producto"
          className="text-2xl cursor-pointer bg-neutral-700 px-4 py-2 rounded-xl hover:scale-105 transition-all"
        >
          Producto
        </Link>
        <Link
          to="/factura"
          className="text-2xl cursor-pointer bg-neutral-700 px-4 py-2 rounded-xl hover:scale-105 transition-all"
        >
          Factura
        </Link>
      </div>
    </div>
  );
}

export default Home;

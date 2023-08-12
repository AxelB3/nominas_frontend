"use client";

import { useState } from "react";
import * as Mui from "@mui/material";
import * as Fa from "react-icons/fa";
import FormEmpleado from "../components/empleado/FormEmpleado";

function Home() {
  //AGREGAR SOLO SIRVE PARA PODER MOSTRAR EL ACORDION
  //CON EL FORMULARIO DE ALTA DE EMPLEADOS
  const [agregar, setAgregar] = useState(false);

  return (
    <div className="container grid gap-3">
      <h1>Nominas</h1>

      <div className="main-content gap-1">
        <h2>Crear Empleado</h2>
        <Mui.Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => {
            setAgregar(true);
          }}
        >
          <Fa.FaPlus />
        </Mui.Fab>
      </div>
      <div>
        {agregar === true && (
          <FormEmpleado
            titulo="Agregar nuevo empleado"
            active={agregar}
            activeState={setAgregar}
          />
        )}
      </div>
    </div>
  );
}

export default Home;

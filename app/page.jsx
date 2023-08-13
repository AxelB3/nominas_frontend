"use client";

import { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import * as Fa from "react-icons/fa";
import FormEmpleado from "../components/empleado/FormEmpleado";
import FormEmpleados from "../components/empleado/FormEmpleados";
import empleadoService from "../services/empleadoService";

function Home() {
  //AGREGAR SOLO SIRVE PARA PODER MOSTRAR EL ACORDION
  //CON EL FORMULARIO DE ALTA DE EMPLEADOS
  const [agregar, setAgregar] = useState(false);
  const [empleados, setEmpleados] = useState(null)


  useEffect(() => {
    if(empleados == null){

      empleadoService.getEmpleados(setEmpleados, () => {
        Swal.fire("Error", "Ha ocurrido un error al cargar los empleados", "error");
      });
    }
  }, []);

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

      <div className="container grid gap-3">
        {empleados !== null && 
        empleados.map((empleado, index) => {
          return(
            <FormEmpleados key={index} empleado={empleado}/>
          )
        })
      }
      </div>
    </div>
  );
}

export default Home;

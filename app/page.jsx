import React from "react";
import * as Mui from "@mui/material";
import * as Fa from "react-icons/fa";
import FormEmpleado from "@/components/empleado/FormEmpleado";

function Home() {
  return (
    <div className="container grid gap-1">
      <h1>Nominas</h1>

      <div className="main-content grid gap-3">
        <Mui.Grid container spacing={2} direction={"column"}>
          <Mui.Grid item>
            <h2>Crear Empleado</h2>
          </Mui.Grid>
          <Mui.Grid item>
            <Mui.Fab size="small" color="primary" aria-label="add">
              <Fa.FaPlus />
            </Mui.Fab>
          </Mui.Grid>
        </Mui.Grid>

        <FormEmpleado/>
      </div>
    </div>
  );
}

export default Home;

"use client";

import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import React from "react";
import { FormControl, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

function FormEmpleado(props) {
  const [empleado, setEmpleado] = useState({
    nombre: props.empleado !== undefined ? props.empleado.nombre : "",
    ape_pat: props.empleado !== undefined ? props.empleado.nombre : "",
    ape_mat: props.empleado !== undefined ? props.empleado.nombre : "",
    rol_id: props.empleado !== undefined ? props.empleado.nombre : "",
  });

  const inputs = [
    { label: "Nombre(s)", name: "nombre" },
    { label: "Apellido Paterno", name: "ape_pat" },
    { label: "Apellido Paterno", name: "ape_mat" },
  ];
  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{empleado.nombre}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {inputs.map((item) => {
            return (
              <FormControl
                fullWidth
                variant="filled"
                style={{ padding: "5px" }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label={item.label}
                  name={item.name}
                  defaultValue=""
                  variant="filled"
                  margin="normal"
                />
              </FormControl>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FormEmpleado;

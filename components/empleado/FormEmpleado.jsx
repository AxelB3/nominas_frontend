"use client";

import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import React from "react";
import { FormControl, Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import rolesService from "../../services/rolesService";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import empleadoService from "../../services/empleadoService";

function FormEmpleado(props) {
  //VALORES INICIALES DEL OBJETO EMPLEADO
  const [empleado, setEmpleado] = useState({
    nombre: "",
    ape_pat: "",
    ape_mat: "",
    rol_id: "",
  });

  const [roles, setRoles] = useState(null);
  const [errores, setErrores] = useState(null);

  //USEEFFECT ES UNA FUNCION PARA REVIASAR UN CAMBIO DE ESTADO EN UNA VARIABLE
  //AQUI SE UTILIZA PARA TRAER TODOS LOS ROLES QUE EXISTEN
  //DE ESTA MANERA LO PODREMOS UTILIZAR EN UN SELECT COMO OPCIONES
  useEffect(() => {
    rolesService.getRoles(setRoles, () => {
      Swal.fire("Error", "Ha ocurrido un error al cargar los roles", "error");
      props.activeState(false);
    });
  }, []);

  const guardarEmpleado = () => {
    //MENSAJE EMERGENTE PARA REAFIRMAR QUE SE VA A
    //GUARDAR LA INFORMACION DEL EMPLEADO
    Swal.fire({
      title: "¿Desea almacenar los datos?",
      text: "Se almacenará un nuevo empleado",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
      showLoaderOnConfirm: true, // Mostrar el mensaje de carga en el botón de confirmación
      allowOutsideClick: false, // Evitar que se haga clic fuera del cuadro de diálogo
    }).then((result) => {
      if (result.isConfirmed) {
        empleadoService.guardarEmpleado(
          empleado,
          onEmpleadoGuardado,
          (error) => {
            setErrores(error.response.data);
          }
        );
      }
    });
  };


  const onEmpleadoGuardado = (data) => {
    Swal.fire({
      title: "Guardado Éxitoso",
      text: "Los datos se guardarón correctamente",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  const cancelDialog = () => {
    //MENSAJE EMERGENTE PARA REAFIRMAR QUE SE VA A
    //CANCELAR EL PROCESO DE GUARDADO
    Swal.fire({
      title: "¿Desea cancelar el proceso?",
      text: "Se eliminarán los datos ingresados",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        props.activeState(false);
      }
    });
  };

  return (
    <div>
      {roles !== null && (
        <Accordion expanded={props.active}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>{props.titulo}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form style={{ padding: "5px" }}>
              <TextField
                required
                id="outlined-required"
                label="Nombre(s)"
                name="nombre"
                defaultValue=""
                variant="filled"
                margin="normal"
                fullWidth
                onChange={(e) => {
                  setEmpleado({ ...empleado, nombre: e.target.value });
                }}
              />
              {errores !== null &&
                errores.errors
                  .filter((item) => item.campo === "nombre")
                  .map((errores) => {
                    return errores.errores.map((error) => {
                      return <p className="errores">{error}</p>;
                    });
                  })}

              <TextField
                required
                id="outlined-required"
                label="Apellido Paterno"
                name="ape_pat"
                defaultValue=""
                variant="filled"
                margin="normal"
                fullWidth
                onChange={(e) => {
                  setEmpleado({ ...empleado, ape_pat: e.target.value });
                }}
              />

              {errores !== null &&
                errores.errors
                  .filter((item) => item.campo === "ape_pat")
                  .map((errores) => {
                    return errores.errores.map((error) => {
                      return <p className="errores">{error}</p>;
                    });
                  })}

              <TextField
                required
                id="outlined-required"
                label="Apellido Materno"
                name="ape_mat"
                defaultValue=""
                variant="filled"
                margin="normal"
                fullWidth
                onChange={(e) => {
                  setEmpleado({ ...empleado, ape_mat: e.target.value });
                }}
              />
              {errores !== null &&
                errores.errors
                  .filter((item) => item.campo === "ape_mat")
                  .map((errores) => {
                    return errores.errores.map((error) => {
                      return <p className="errores">{error}</p>;
                    });
                  })}

              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Rol"
                  name="rol_id"
                  onChange={(e) => {
                    setEmpleado({ ...empleado, rol_id: e.target.value});
                  }}
                >
                  {roles.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        inputMode="id"
                        value={item.id}
                      >
                        {item.descripcion}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {errores !== null &&
                errores.errors
                  .filter((item) => item.campo === "rol_id")
                  .map((errores) => {
                    return errores.errores.map((error) => {
                      return <p className="errores">{error}</p>;
                    });
                  })}
              <div
                className="gap-1 left-flex"
                style={{ padding: "5px", gridAutoFlow: "column", margin: "16px 0" }}
              >
                <Button
                  variant="outlined"
                  style={{ width: "20%" }}
                  onClick={() => {
                    guardarEmpleado();
                  }}
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  style={{ width: "20%" }}
                  onClick={() => {
                    cancelDialog();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default FormEmpleado;

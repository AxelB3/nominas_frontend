"use client";

import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import React from "react";
import Swal from "sweetalert2";
import rolesService from "../../services/rolesService";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import empleadoService from "../../services/empleadoService";
import { FormControl, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

function FormEmpleados(props) {
  //VALORES INICIALES DEL OBJETO EMPLEADO
  const { empleado: empleado } = props;

  const [errores, setErrores] = useState(null);
  const [seleccionado, setSeleccionado] = useState("b");
  const [guardarNomina, setGuardarNomina] = useState(false);
  const meses = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  const [params, setParams] = useState({
    id_empleado: empleado.id,
    rol_id: empleado.rol_id,
    entregas: 0,
    mes: "",
  });
  const [mesSelect, setMesSelect] = useState(null);
  const [mesNomina, setMesNomina] = useState(null);
  const [anioNomina, setAnioNomina] = useState(null);
  const [anioSelect, setAnioSelect] = useState(null);
  const [nomina, setNomina] = useState(null);

  //USEEFFECT ES UNA FUNCION PARA REVIASAR UN CAMBIO DE ESTADO EN UNA VARIABLE
  //AQUI SE UTILIZA PARA TRAER TODOS LOS ROLES QUE EXISTEN
  //DE ESTA MANERA LO PODREMOS UTILIZAR EN UN SELECT COMO OPCIONES
  const buscarFechas = () => {
    if (anioNomina === null && mesNomina === null) {
      empleadoService.getFecha(
        empleado.id,
        (data) => {
          setAnioNomina(data.anios);
          setMesNomina(data.meses);
        },
        () => {
          Swal.fire(
            "Error",
            "Ha ocurrido un error al cargar las fechas",
            "error"
          );
        }
      );
    }
  };

  const guardarNominaF = () => {
    //MENSAJE EMERGENTE PARA REAFIRMAR QUE SE VA A
    //GUARDAR LA INFORMACION DEL EMPLEADO
    Swal.fire({
      title: "¿Desea almacenar los datos?",
      text: "Se almacenará una nomina",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      denyButtonText: `Cancelar`,
      showLoaderOnConfirm: true, // Mostrar el mensaje de carga en el botón de confirmación
      allowOutsideClick: false, // Evitar que se haga clic fuera del cuadro de diálogo
    }).then((result) => {
      if (result.isConfirmed) {
        empleadoService.guardarNomina(params, onNominaGuardada, (error) => {
          setErrores(error.response.data);
        });
      }
    });
  };

  const onNominaGuardada = (data) => {
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
        setGuardarNomina(false);
        limpiarDatos();
      }
    });
  };

  const limpiarDatos = () => {
    setParams({
      id_empleado: empleado.id,
      rol_id: empleado.rol_id,
      entregas: "",
      mes: "",
    });
    setErrores(null)
    setMesSelect(null)
    setAnioSelect(null)
  };

  const buscarNominaEmp = () => {
    empleadoService.getNominaByEmp(
      { id_empleado: empleado.id, mes: mesSelect, anio: anioSelect },
      (data) => {
        setNomina(data), setErrores(null);
      },
      (error) => {
        setErrores(error.response.data);
      }
    );
  };

 const formatNumero = (n, currency) => {
    if (n == null || n == "" || n == "undefined") {
        return 0;
    } else if (parseFloat(n) >= 0) {
        return currency + "" + parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
    else if (parseFloat(n) < 0) {
        return "(" + currency + "" + (parseFloat(n) * -1).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + ")";
    }
    else {
        return 'NaN';
    }
}

  return (
    <div>
      {empleado !== null && (
        <Accordion
          expanded={guardarNomina}
          onChange={() => {
            setGuardarNomina(true);
            buscarFechas();
          }}
        >
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>
              {`${empleado.nombre} ${empleado.ape_pat} ${empleado.ape_mat} `}{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="grid gap-2">
            <Typography>{`${empleado.descripcion} `} </Typography>

            <div className="grid gap-3">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className="flex"
              >
                <FormControlLabel
                  value="a"
                  checked={seleccionado === "a"}
                  control={<Radio />}
                  label="Detalles de nomina"
                  onChange={(e) => {
                    setSeleccionado(e.target.value);
                    limpiarDatos();
                  }}
                />
                <FormControlLabel
                  value="b"
                  checked={seleccionado === "b"}
                  control={<Radio />}
                  label="Guardar Nomina"
                  onChange={(e) => {
                    setSeleccionado(e.target.value);
                    limpiarDatos();
                  }}
                />
              </RadioGroup>

              {seleccionado === "a" && (
                <div>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Mes"
                      name="mes"
                      value={mesSelect}
                      onChange={(e) => {
                        setMesSelect(e.target.value);
                      }}
                    >
                      {mesNomina.map((item, index) => {
                        return (
                          <MenuItem key={index} inputMode="id" value={item.mes}>
                            {item.mes}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {errores !== null &&
                    errores.errors
                      .filter((item) => item.campo === "mes")
                      .map((errores) => {
                        return errores.errores.map((error) => {
                          return <p className="errores">{error}</p>;
                        });
                      })}

                  <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Año</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Año"
                      name="anio"
                      value={anioSelect}
                      onChange={(e) => {
                        setAnioSelect(e.target.value);
                      }}
                    >
                      {anioNomina.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            inputMode="id"
                            value={item.anio}
                          >
                            {item.anio}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {errores !== null &&
                    errores.errors
                      .filter((item) => item.campo === "anio")
                      .map((errores) => {
                        return errores.errores.map((error) => {
                          return <p className="errores">{error}</p>;
                        });
                      })}

                  <div
                    className="gap-1 left-flex"
                    style={{
                      padding: "5px",
                      gridAutoFlow: "column",
                      margin: "16px 0",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{ width: "20%" }}
                      onClick={() => {
                        buscarNominaEmp();
                      }}
                    >
                      Buscar
                    </Button>
                  </div>

                  {nomina !== null && (
                    <div className="grid gap-1">
                      <span>
                        <p><b style={{color: '#0957c3'}}>Sueldo Base:</b> {formatNumero(nomina.sueldo_base,"$")}</p>
                      </span>
                      
                      <span>
                        <p><b style={{color: '#0957c3'}}>Adicional Por Entregas:</b> {formatNumero(nomina.adicional,"$")}</p>
                      </span>

                      <span>
                        <p><b style={{color: '#0957c3'}}>Bono:</b> {formatNumero(nomina.bono,"$")}</p>
                      </span>
  
                      <span>
                        <p><b style={{color: '#0957c3'}}>Descuento ISR:</b> {formatNumero(nomina.descuento_imp,"$")}</p>
                      </span>
                     
                      <span>
                        <p><b style={{color: '#0957c3'}}>Total Bruto:</b> {formatNumero(nomina.total_bruto,"$")}</p>
                      </span>

                      <span>
                        <p><b style={{color: '#0957c3'}}>Total Neto:</b> {formatNumero(nomina.total_neto,"$")}</p>
                      </span>
                      
                      <span>
                        <p><b style={{color: '#0957c3'}}>Importe De Vale De Despensa:</b> {formatNumero(nomina.vale_despensa,"$")}</p>
                      </span>
                     
                    </div>
                  )}
                </div>
              )}

              {seleccionado === "b" && (
                <div>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Mes"
                      name="mes"
                      value={params.mes}
                      onChange={(e) => {
                        setParams({ ...params, mes: e.target.value });
                      }}
                    >
                      {meses.map((item, index) => {
                        return (
                          <MenuItem key={index} inputMode="id" value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {errores !== null &&
                    errores.errors
                      .filter((item) => item.campo === "mes")
                      .map((errores) => {
                        return errores.errores.map((error) => {
                          return <p className="errores">{error}</p>;
                        });
                      })}
                  <TextField
                    required
                    id="outlined-required"
                    label="Entregas"
                    name="entregas"
                    variant="filled"
                    margin="normal"
                    value={params.entregas}
                    type="number"
                    fullWidth
                    onChange={(e) => {
                      setParams({ ...params, entregas: e.target.value });
                    }}
                  />

                  <div
                    className="gap-1 left-flex"
                    style={{
                      padding: "5px",
                      gridAutoFlow: "column",
                      margin: "16px 0",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{ width: "20%" }}
                      onClick={() => {
                        guardarNominaF();
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
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default FormEmpleados;

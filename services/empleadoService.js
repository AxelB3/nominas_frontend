import http from "../services/axiosService.js";
import axios from "axios";

class empleadoService {
  getEmpleados(callback, error) {
    return http
      .get("empleados")
      .then((response) => {
        callback(response.data);
      })
      .catch((er) => {
        try {
          error(er.response);
        } catch (err) {
          console.error("Error Handled", err);
        }
      });
  }

  guardarEmpleado(params, callback, error) {
    var call;
    if (call) {
      call.cancel();
    }
    const CancelToken = axios.CancelToken;
    call = CancelToken.source();
    return http
      .post("empleados/crear", params, { cancelToken: call.token })
      .then((response) => {
        callback(response.data);
      })
      .catch((response) => {
        try {
          if (axios.isCancel(response)) {
            console.log("Peticion Cancelada");
          } else {
            error(response);
          }
        } catch (err) {
          console.error("Error Handled", err);
        }
      });
  }

  guardarNomina(params, callback, error) {
    var call;
    if (call) {
      call.cancel();
    }
    const CancelToken = axios.CancelToken;
    call = CancelToken.source();
    return http
      .post("nomina/crear", params, { cancelToken: call.token })
      .then((response) => {
        callback(response.data);
      })
      .catch((response) => {
        try {
          if (axios.isCancel(response)) {
            console.log("Peticion Cancelada");
          } else {
            error(response);
          }
        } catch (err) {
          console.error("Error Handled", err);
        }
      });
  }

  getFecha(params, callback, error) {
    return http
      .get(`nomina/fechas/${params}`)
      .then((response) => {
        callback(response.data);
      })
      .catch((er) => {
        try {
          error(er.response);
        } catch (err) {
          console.error("Error Handled", err);
        }
      });
  }

  getNominaByEmp(params, callback, error) {
    var call;
    if (call) {
      call.cancel();
    }
    const CancelToken = axios.CancelToken;
    call = CancelToken.source();
    return http
      .post(`nomina/${params.id_empleado}`, params, { cancelToken: call.token })
      .then((response) => {
        callback(response.data);
      })
      .catch((response) => {
        try {
          if (axios.isCancel(response)) {
            console.log("Peticion Cancelada");
          } else {
            error(response);
          }
        } catch (err) {
          console.error("Error Handled", err);
        }
      });
  }
}

export default new empleadoService();

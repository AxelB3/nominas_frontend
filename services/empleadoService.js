import http from '../services/axiosService.js';
import axios from 'axios';

class empleadoService {

    getIEmpleados( callback, error) {
        return (
            http.get(
                ('getEmpleados')
            )
                .then((response) => { callback(response.data) })
                .catch((er) => {
                    try {
                        error(er.response)
                    } catch (err) {
                        console.error('Error Handled', err);
                    }
                })
        )
    }

    guardarEmpleado(params, callback, error) {
     var call;
     if (call) {
         call.cancel();
     }
     const CancelToken = axios.CancelToken;
     call = CancelToken.source();
     return (
         http.post(
             ('empleados/crear'),
             params,
             { cancelToken: call.token }
         )
             .then((response) => {
                 callback(response.data);
             })
             .catch((response) => {
                 try {
                     if (axios.isCancel(response)) {
                         console.log('Peticion Cancelada');
                     } else {
                         error(response);
                     }
                 } catch (err) {
                     console.error('Error Handled', err);
                 }
             })
     )
 }
}
export default new empleadoService();
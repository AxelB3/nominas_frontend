import http from '../services/axiosService.js';
import axios from 'axios';

class rolesService {

    getRoles( callback, error) {
        return (
            http.get(
                ('roles')
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
}
export default new rolesService();
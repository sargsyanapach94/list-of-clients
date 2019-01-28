import axios from 'axios'

export default {
    getClients() {
        return axios.get( '/clients' ).then( response => response.data );
    }
}

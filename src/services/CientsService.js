import axios from 'axios'
const basePath = '/clients'

export default {
    getClients() {
        return axios.get( basePath ).then( response => response.data );
    },

    addClient( data ) {
        return axios.post( basePath, data ).then( response => response.data );
    },
    updateClient( id, data ) {
        return axios.put( `${ basePath}/${ id }`, data ).then( response => response.data );
    },
    deleteClient( id ) {
        return axios.delete( `${ basePath}/${ id }` ).then( response => response.data );
    }
}

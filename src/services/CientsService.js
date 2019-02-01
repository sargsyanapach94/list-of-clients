import axios from 'axios'

export default {
    getClients() {
        return axios.get( '/clients' ).then( response => response.data );
    },

    addClient( data ) {
        return axios.post( '/clients', data ).then( response => response.data );
    },
    updateClient( id, data ) {
        return axios.put( `/clients/${ id }`, data ).then( response => response.data );
    },
    deleteClient( id ) {
        return axios.delete( `/clients/${ id }` ).then( response => response.data );
    }
}

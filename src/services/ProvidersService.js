import axios from 'axios'
const basePath = '/providers'

export default {
    getProviders() {
        return axios.get( basePath ).then( response => response.data );
    },
    addProvider( data ) {
        return axios.post( basePath, data ).then( response => response.data );
    },
    updateProvider( id, data ) {
        return axios.put( `${ basePath}/${ id }`, data ).then( response => response.data );
    },
    deleteProvider( id ) {
        return axios.delete( `${ basePath}/${ id }` ).then( response => response.data );
    }
}

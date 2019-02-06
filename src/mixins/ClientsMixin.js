import axios from 'axios'
const basePath = '/clients'

export default {
    data() {
        return {}
    },
    methods: {
        $_getClients_mixin() {
            return axios.get(basePath).then(response => response.data);
        },
        $_addClient_mixin(data) {
            return axios.post(basePath, data).then(response => response.data);
        },
        $_updateClient_mixin(id, data) {
            return axios.put(`${basePath}/${ id }`, data).then(response => response.data);
        },
        $_deleteClient_mixin(id) {
            return axios.delete(`${basePath}/${ id }`).then(response => response.data);
        }
    }
}

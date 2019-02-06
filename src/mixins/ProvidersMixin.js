import axios from 'axios'
const basePath = '/providers'
export default {
    data() {
        return {}
    },
    methods: {
        $_getProviders_mixin() {
            return axios.get(basePath).then(response => response.data);
        },
        $_addProvider_mixin(data) {
            return axios.post(basePath, data).then(response => response.data);
        },
        $_updateProvider_mixin(id, data) {
            return axios.put(`${basePath}/${ id }`, data).then(response => response.data);
        },
        $_deleteProvider_mixin(id) {
            return axios.delete(`${basePath}/${ id }`).then(response => response.data);
        }
    }
}

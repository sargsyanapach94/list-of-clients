import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faEdit, faTrashAlt, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faCoffee, faEdit, faTrashAlt, faSpinner, faTimes )
Vue.component( 'font-awesome-icon', FontAwesomeIcon )
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/api'
Vue.use( BootstrapVue )


import ConfirmModal from './modals/ConfirmModal.vue'
Vue.component( 'confirm-modal', ConfirmModal )


import ClientsMixin from './mixins/ClientsMixin.js'
import ProvidersMixin from './mixins/ProvidersMixin.js'

Vue.mixin(ClientsMixin)
   .mixin(ProvidersMixin);

new Vue( {
    el: '#app',
    // mixins: [CientsMixin, ProvidersMixin],
    render: h => h( App )
} )

<template>
<b-modal ref="clientModalRef" v-model="showModal" hide-header-close no-close-on-backdrop no-close-on-esc>
	<div slot="modal-header" class="w-100">
		<span class="float-left">{{headerText}} Clients</span>
		<font-awesome-icon :icon="['fas', 'times']" @click="hideModal()" class="float-right font-weight-bold cursor-pointer"></font-awesome-icon>
	</div>
	<b-container fluid>
		<b-form-group horizontal :label-cols="2" label-size="sm" label="Name:" label-for="input_sm">
			<b-form-input id="input_sm" :maxlength="35" size="sm" v-model="form.name"></b-form-input>
		</b-form-group>
		<b-form-group horizontal :label-cols="2" label-size="sm" label="Email:" label-for="input_sm">
			<b-form-input id="input_sm" :maxlength="60" size="sm" v-model="form.email"></b-form-input>
		</b-form-group>
		<b-form-group horizontal :label-cols="2" label-size="sm" label="Phone:" label-for="input_sm">
			<b-form-input id="input_sm" :maxlength="35" size="sm" v-model="form.phone"></b-form-input>
		</b-form-group>
		<b-form-group horizontal :label-cols="2" label-size="sm" label="Providers:" label-for="input_sm">
			<providers-list :client-providers="form.providers"></providers-list>
		</b-form-group>

		<div class="err-container" v-if="errorMsg && errorMsg.length">
			<p class="text-danger" v-for="err in errorMsg">{{err.message || err.errmsg}}</p>
		</div>
	</b-container>

	<div slot="modal-footer" class="w-100 text-right">
		<confirm-modal v-if="headerText === 'Edit'" class="d-inline float-left" :deleteFunction="deleteClientMethod" :item-to-delete="client" itemType="client" :use-button="true" @close-confirm-modal="hideModal()"></confirm-modal>
		<b-btn size="sm m-r-1" variant="outline-secondary" @click="hideModal()">Cancel</b-btn>
		<b-btn size="sm" v-if="headerText === 'New'" variant="outline-primary" @click="saveClient()">Add Client</b-btn>
		<b-btn size="sm" v-if="headerText === 'Edit'" variant="outline-primary" @click="updateClient()">Edit Client</b-btn>
	</div>
</b-modal>
</template>

<script>
import ClientsService from '../services/CientsService.js'
import ProvidersList from '../components/ProvidersList.vue'

export default {
	name: 'ClientModal',
	components: {
		'providers-list': ProvidersList
	},
	props: {
		headerText: String,
		showModal: Boolean,
		client: Object,
	},
	data() {
		return {
			loading: false,
			form: this.client || {
				providers: []
			},
			errorMsg: []
		}
	},
	methods: {
		deleteClientMethod: ClientsService.deleteClient,
		hideModal() {
			this.form = {
				email: '',
				name: '',
				phone: '',
				providers: []
			};
			this.$emit('close-client-modal');
		},
		saveClient() {
			this.loading = true;
			this.errorMsg = [];
			ClientsService.addClient(this.form).then(data => {
					this.form = {
						email: '',
						name: '',
						phone: '',
						providers: []
					};

					this.hideModal();
				})
				.catch(error => {
					this.errorMsg.push(error.response.data);
				})
				.finally(() => this.loading = false)
		},
		updateClient() {
			this.loading = true;
			this.errorMsg = [];
			ClientsService.updateClient(this.client._id, this.form).then(data => {
					this.form = {
						email: '',
						name: '',
						phone: '',
						providers: []
					};

					this.hideModal();
				})
				.catch(error => {
					this.errorMsg.push(error.response.data);
				})
				.finally(() => this.loading = false)
		}
	}
}
</script>

<style>
.modal-dialog .modal-header .close-modal {
	cursor: pointer;
}
</style>

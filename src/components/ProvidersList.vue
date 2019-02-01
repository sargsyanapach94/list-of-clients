<template >
<div class="providers-container">
	<b-form-input ref="focusThis" id="input_sm" class="d-inline-block col-sm-8" size="sm" v-model="providerName"></b-form-input>

	<b-btn size="sm ml-1" v-if="!providerToEdit._id" class="align-top" variant="outline-primary" @click="addProvider()"> Add provider </b-btn>
	<span v-else>
		<b-btn size="sm ml-1" class="align-top" variant="outline-primary" @click="editProvider()"> Edit </b-btn>
		<b-btn size="sm mr-1" class="align-top" variant="outline-secondary" @click="cancel()">Cancel</b-btn>
	</span>

	<div class="providers-list-container border border-secondary col-sm-8 rounded mt-2 p-1">
		<div v-for="provider in providersList" class="custom-control custom-checkbox" :class="{'text-warning': providerToEdit._id === provider._id }">
			<input type="checkbox" class="custom-control-input" :checked="clientProviderIds.indexOf(provider._id) > -1" :id="provider._id" @change="checkProvider($event, provider)" />
			<label class="custom-control-label" :for="provider._id">
				{{provider.name.slice(0, 17)}}
				<span v-if="provider.name.length > 17">...</span>
			</label>
			<div class=" float-right d-inline">
				<font-awesome-icon :icon="['fas', 'edit']" class="mr-1" @click="chooseToEditProvider(provider)"></font-awesome-icon>
                <span @click="cancel()">
                    <confirm-modal class="d-inline text-danger" :deleteFunction="deleteProviderMethod" :item-to-delete="provider" itemType="provider" :use-icon="true" @close-confirm-modal="getProvidersList"></confirm-modal>
                </span>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import ProvidersService from '../services/ProvidersService.js'

export default {
	name: 'ProvidersList',
	props: {
		clientProviders: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			providerName: '',
			loading: false,
			providersList: [],
			clientProviderIds: this.clientProviders.map(item => item._id),
			errorMsg: [],
			providerToEdit: {}
		}
	},
	methods: {
		deleteProviderMethod: ProvidersService.deleteProvider,
		addProvider() {
			ProvidersService.addProvider({
					name: this.providerName
				}).then(data => {
					this.providersList.push(data);
					this.providerName = '';
				})
				.catch(error => {
					this.errored = true
				})
				.finally(() => this.loading = false)
		},
		editProvider() {
			ProvidersService.updateProvider(this.providerToEdit._id, {
					name: this.providerName
				}).then(data => {
					this.providerToEdit.name = data.name;
					this.cancel();
				})
				.catch(error => {
					this.errored = true
				})
				.finally(() => this.loading = false)
		},
		checkProvider($event, provider) {
			let index = -1;
			this.clientProviders.forEach((item, i) => {
				if (item._id === provider._id) {
					index = i;
				}
			});

			if (index === -1 && $event.target.checked) {
				this.clientProviders.push(provider);
			} else {
				this.clientProviders.splice(index, 1);
			}
		},
		getProvidersList() {
			ProvidersService.getProviders()
				.then(data => {
					this.providersList = data;
				})
				.catch(error => {
					this.errored = true
				})
				.finally(() => this.loading = false);
		},
		chooseToEditProvider(provider) {
			this.providerToEdit = provider;
			this.providerName = provider.name;
			this.$refs.focusThis.focus()
		},
		cancel() {
			this.providerToEdit = {};
			this.providerName = '';
		}
	},
	computed: {},
	created() {
		this.getProvidersList();
	}
}
</script>

<style  scoped>
.providers-list-container {
	background-color: #edf0f3;
}
</style>

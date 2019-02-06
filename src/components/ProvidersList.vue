<template >
<div class="providers-container">
	<b-form-input ref="focusThis" id="input_sm" :maxlength="35" class="d-inline-block col-sm-8" size="sm" v-model="providerName"></b-form-input>

	<b-btn size="sm ml-1" v-if="!providerToEdit._id" :disabled="!providerName || providerName.length < 3" class="align-top" variant="outline-primary" @click="addProvider()"> Add provider </b-btn>
	<span v-else>
		<b-btn size="sm ml-1" class="align-top" variant="outline-primary" @click="editProvider()" :disabled="!providerName || providerName.length < 3"> Edit </b-btn>
		<b-btn size="sm" class="align-top" variant="outline-secondary" @click="cancel()">Cancel</b-btn>
	</span>

	<div class="providers-list-container bg-light border border-secondary col-sm-8 rounded mt-2 p-1">
		<div v-for="provider in providersList" :key="provider._id" class="custom-control custom-checkbox" :class="{'text-warning': providerToEdit._id === provider._id }">
			<input type="checkbox" class="custom-control-input cursor-pointer" :checked="clientProviderIds.indexOf(provider._id) > -1" :id="provider._id" @change="checkProvider($event, provider)" />
			<label class="custom-control-label" :for="provider._id">
				{{provider.name.slice(0, 12)}}
				<span v-if="provider.name.length > 12">...</span>
			</label>
			<div class="float-right d-inline">
				<font-awesome-icon :icon="['fas', 'edit']" class="mr-1 cursor-pointer" @click="chooseToEditProvider(provider)"></font-awesome-icon>
				<span @click="cancel()">
					<confirm-modal class="d-inline text-danger cursor-pointer" :deleteFunction="$_deleteProvider_mixin" :item-to-delete="provider" itemType="provider" :use-icon="true" @close-confirm-modal="getProvidersList"></confirm-modal>
				</span>
			</div>
		</div>
	</div>
</div>
</template>

<script>
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
		addProvider() {
			this.$_addProvider_mixin({
					name: this.providerName
				}).then(data => {
					this.providersList.push(data);
					this.providerName = '';
				})
				.catch(error => {
					this.errored = true;
				})
				.finally(() => this.loading = false)
		},
		editProvider() {
			this.$_updateProvider_mixin(this.providerToEdit._id, {
					name: this.providerName
				}).then(data => {
					this.providerToEdit.name = data.name;
					this.cancel();
				})
				.catch(error => {
					this.errored = true;
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
			this.$_getProviders_mixin()
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

</style>

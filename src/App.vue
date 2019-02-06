<template>
<div id="app">
	<div>
		<!-- As a heading -->
		<b-navbar variant="dark" type="dark">
			<b-navbar-brand tag="h1" class="mb-0">List Of Clients</b-navbar-brand>
		</b-navbar>
	</div>
	<b-container class="bv-example-row">
		<b-row class="bg-light mx-0 py-2">
			<b-col tag="h5" class="text-info">Clients</b-col>
			<b-col>
				<b-btn class="float-right" id="show-modal" @click="openClientModal('New')" size="sm" variant="outline-primary"> New Client </b-btn>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-table bordered hover :items="clientsList" :fields="fields" :fixed="true">
					<template slot="providers" slot-scope="row">
						<span v-for="(provider, index) in row.item.providers"  :key="provider._id">
							{{provider.name.slice(0, 15)}}
							<span v-if="provider.name.length > 15">...</span>
							{{index !== row.item.providers.length -1 ? ',': ''}}
						</span>
					</template>
					<template slot="actions" slot-scope="row">
						<b-button size="sm" variant="outline-primary" @click="openClientModal('Edit', row.item)">Edit</b-button>
						<confirm-modal class="d-inline" :deleteFunction="$_deleteClient_mixin" :item-to-delete="row.item" itemType="client" :use-button="true" @close-confirm-modal="getClientsList"></confirm-modal>
					</template>
				</b-table>
			</b-col>
		</b-row>
	</b-container>

	<client-modal v-if="clientForEdit || headerText === 'New'" :showModal="showModal" @close-client-modal="closeClientModal();" :header-text="headerText" :client="clientForEdit"></client-modal>
</div>
</template>

<script>
import ClientModal from './modals/ClientModal.vue'

export default {
	name: 'app',
	components: {
		'client-modal': ClientModal
	},
	data() {
		return {
			clientsList: [],
			showModal: false,
			showConfirmModal: false,
			headerText: '',
			fields: [{
				key: 'name',
				sortable: true,
				class: ['text-truncate', 'col']
			}, {
				key: 'email',
				class: ['text-truncate', 'col']
			}, {
				key: 'phone',
				class: ['text-truncate', 'col']
			}, {
				key: 'providers',
				class: ['col']
			}, {
				key: 'actions',
				class: ['text-center', 'col', 'actions-col-width']
			}],
			clientForEdit: null,
			errored: false
		}
	},
	methods: {
		openClientModal(text, client) {
			this.headerText = text;
			this.showModal = true;
			if (client) {
				this.clientForEdit = client;
			}
		},
		closeClientModal() {
			this.getClientsList();
			this.showModal = false;
			this.headerText = null;
			this.clientForEdit = null;
		},
		getClientsList() {
			this.$_getClients_mixin()
				.then(data => {
					this.clientsList = data.map(client => {
						return client;
					});
				})
				.catch(error => {
					this.errored = true;
				});
		}
	},
	created() {
		this.getClientsList();
	}
}
</script>

<style>
.actions-col-width {
	width: 132px;
}

.cursor-pointer {
	cursor: pointer;
}
</style>

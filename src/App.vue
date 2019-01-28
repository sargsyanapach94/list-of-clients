<template>
<div id="app">
	<div>
		<!-- As a heading -->
		<b-navbar variant="dark" type="dark">
			<b-navbar-brand tag="h1" class="mb-0">List Of Clients</b-navbar-brand>
		</b-navbar>
	</div>
	<b-container class="bv-example-row">
		<b-row bg-variant="secondary">
			<b-col>Clients</b-col>
			<b-col>
				<b-btn class="float-right" id="show-modal" @click="openClientModal('Add')" size="sm" variant="outline-secondary">
					New Client
				</b-btn>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-table bordered hover :items="items"></b-table>
			</b-col>
		</b-row>
	</b-container>

	<client-modal :header-text="headerText">
		<!--
      you can use custom content here to overwrite
      default content
    -->
		<!-- <h3 slot="header">custom header</h3> -->
	</client-modal>
</div>
</template>

<script>
import ClientsService from './services/CientsService.js'
import ClientModal from './modals/ClientModal.vue'
const items = [{
		isActive: true,
		age: 40,
		first_name: 'Dickerson',
		last_name: 'Macdonald'
	},
	{
		isActive: false,
		age: 21,
		first_name: 'Larsen',
		last_name: 'Shaw'
	},
	{
		isActive: false,
		age: 89,
		first_name: 'Geneva',
		last_name: 'Wilson'
	},
	{
		isActive: true,
		age: 38,
		first_name: 'Jami',
		last_name: 'Carney'
	}
]

export default {
	name: 'app',
	components: {
		'client-modal': ClientModal
	},
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
			items: items,
			showModal: false,
			headerText: ''
		}
	},
	methods: {
		openClientModal(text) {
			// this.headerText = text;
			// this.showModal = true;
            // console.log(this.showModal);
			// this.$refs.clientModalRef.show()
            this.$emit('open-client-modal');
		}
	},
	created() {
		ClientsService.getClients()
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
	}
}
</script>

<style scoped="">
</style>

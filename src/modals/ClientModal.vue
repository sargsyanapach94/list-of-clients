<template>
<b-modal ref="clientModalRef" :title="headerText + ' Clients'">
	<b-container fluid>
		<b-row class="mb-1">
			<b-col cols="3">Name: </b-col>
			<b-col>
				<!-- <b-form-select :options="variants" v-model="headerBgVariant" /> -->
			</b-col>
		</b-row>
		<b-row class="mb-1">
			<b-col cols="3">Email: </b-col>
			<b-col>
				<!-- <b-form-select :options="variants" v-model="bodyBgVariant" /> -->
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="3">Phone: </b-col>
			<b-col>
				<!-- <b-form-select :options="variants" v-model="footerBgVariant" /> -->
			</b-col>
		</b-row>
	</b-container>
	<div slot="modal-footer" class="w-100">
		<p class="float-left">Modal Footer Content</p>
		<b-btn size="sm" class="float-right" variant="primary" @click="hideModal()">
			Close
		</b-btn>
	</div>
</b-modal>
</template>

<script>
export default {
	name: 'ClientModal',
	props: {
		headerText: String,
		// showModal: Boolean
	},
	data() {

        this.$on('open-client-modal', this.showModal);

		return {
			// show: this.showModal
		}
	},
	methods: {
		hideModal() {
			// this.show = false;
			this.$refs.clientModalRef.hide();
		},
        showModal(){
            this.$refs.clientModalRef.show();
        }
	},
	computed: {
		// show: {
		// 	// getter
		// 	get() {
        //         console.log('aaaaaaa');
		// 		return this.showModal;
		// 	},
		// 	// setter
		// 	set(newValue) {
        //         console.log(arguments);
        //     }
		// }
	}
}
</script>

<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

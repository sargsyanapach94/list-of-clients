<template>
<div class="">
	<b-btn v-if="useButton" @click="modalShow = !modalShow" size="sm" variant="outline-danger">Delete</b-btn>
	<font-awesome-icon v-if="useIcon" :icon="['fas', 'trash-alt']" @click="modalShow = !modalShow" class="cursor-pointer"></font-awesome-icon>

	<transition name="modal" v-if="modalShow">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header text-dark">
						<slot name="header">
							Confirm operation
							<font-awesome-icon :icon="['fas', 'times']" @click="cancel()" class="float-right font-weight-bold cursor-pointer"></font-awesome-icon>
						</slot>
					</div>
					<div class="modal-body">
						<slot name="body">
							<div class="text-danger text-left">Are you sure to delete '{{itemToDelete.name}}' {{itemType}}!</div>
						</slot>
					</div>
					<div class="modal-footer">
						<slot name="footer">
							<font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" role="status" class="float-left text-success font-weight-bold"></font-awesome-icon>
							<b-btn size="sm" variant="outline-primary" @click="confirm()">OK</b-btn>
							<b-btn size="sm m-r-1" variant="outline-secondary" @click="cancel()">Cancel</b-btn>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>

</div>
</template>

<script>
export default {
	name: 'ConfirmDeletionModal',
	props: {
		itemToDelete: Object,
		deleteFunction: Function,
		itemType: String,
		useButton: Boolean,
		useIcon: Boolean
	},
	data() {
		return {
			loading: false,
			errored: '',
			modalShow: false
		}
	},
	methods: {
		cancel() {
			this.modalShow = false;
		},
		confirm() {
			this.loading = true;
			this.deleteFunction(this.itemToDelete._id).then(data => {
					this.$emit('close-confirm-modal');
					this.cancel();
				})
				.catch(error => {
					this.errored = true;
				})
				.finally(() => {
					this.loading = false;
				});
		}
	},
	computed: {}
}
</script>

<style  scoped>
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
	width: 400px;
	margin: 0px auto;
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

@keyframes spinner {
	to {
		transform: rotate(360deg);
	}
}

/* This is the class name given by the Font Awesome component when icon contains 'spinner' */
.fa-spinner {
	/* Apply 'spinner' keyframes looping once every second (1s)  */
	animation: spinner 1s linear infinite;
	font-size: 22px;
	line-height: 22px;
}
</style>

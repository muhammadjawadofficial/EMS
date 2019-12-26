import 'vue'
// import VModal from 'vue-js-modal'
// Vue.use(VModal)

const ModalService = {
  hide(modal, modalName) {
    console.log('hiding modal: ' + modalName)
    console.log(this.$modal)
    modal.hide(modalName);
  },
}

export default ModalService
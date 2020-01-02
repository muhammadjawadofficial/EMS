<template>
  <b-modal id="edit-password" title="Edit Password" hide-footer>
    <template v-slot:default>
        <TheCredentialForm v-if="email" :email="email" :isPasswordCorrect="wrongPassword" @return="changePassword"/>
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import TheCredentialForm from './TheCredentialForm'
export default {
    data() {
        return {
            email: null,
            wrongPassword: false
        }
    },
    components:{
        TheCredentialForm
    },
    mounted() {
        this.email = this.$store.getters.USEREMAIL
    },
    methods: {
        async changePassword(loginInformation){
            this.wrongPassword = false
            doconsole(loginInformation)
            const response = await UserService.updateCredentials(loginInformation, this.$store.getters.USERID)
            if (response) {
                loginInformation = ''
                this.$store.dispatch('RESET_USER_INFO')
                this.$store.dispatch('SET_USER_INFO')
                this.$bvModal.hide('edit-password')
            }
            else{
                this.wrongPassword = true
            }
        }
    },
}
</script>

<style>

</style>
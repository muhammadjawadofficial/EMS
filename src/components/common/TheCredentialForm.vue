<template>
<div :class="styleAdmin? 'card' : ''">
    <div :class="styleAdmin? 'card-body' : ''">
        <form @submit.prevent="submitForm">
            <legend v-if="styleAdmin">Edit Login Information</legend>
            <div class="row">
                <div :class="colStyle ? 'col-md-6 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label>Email address</label>
                        <input :disabled="canChangeEmail" v-model="newLoginInformation.email" type="email" class="form-control" autocomplete="username" />
                    </div>
                </div>
                <div v-if="!colStyle" :class="colStyle ? 'col-md-6 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label :class="isPasswordCorrect?'text-danger':''">Current Password{{isPasswordCorrect?' *':''}}</label>
                        <input v-model="newLoginInformation.currentPassword" type="password" class="form-control" autocomplete="current-password" />
                    </div>
                </div>
                <div :class="colStyle ? 'col-md-6 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label :class="isPasswordMatched?'text-danger':''">New Password{{isPasswordMatched?' *':''}}</label>
                        <input v-model="newLoginInformation.password" type="password" class="form-control" autocomplete="new-password" />
                    </div>
                </div>
                <div v-if="!colStyle" :class="colStyle ? 'col-md-6 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label :class="isPasswordMatched?'text-danger':''">Retype New Password{{isPasswordMatched?' *':''}}</label>
                        <input v-model="newLoginInformation.reTypePassword" type="password" class="form-control" autocomplete="new-password" />
                    </div>
                </div>
            </div>

            <div :class="styleAdmin? 'add-button': 'modal-footer'">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import {
    TokenService
} from '@/services/storage.service'

export default {
    props: ['email', 'styleAs', 'isPasswordCorrect'],
    mounted() {
        if (TokenService.getIsAdmin() == 'false' || ((this.$route.params.id == undefined) || (this.$route.params.id == TokenService.getCurrentEmployeeId()))) {
            this.colStyle = false
            this.$set(this.newLoginInformation, 'currentPassword', '')
            this.$set(this.newLoginInformation, 'reTypePassword', '')
        }
    },
    data() {
        return {
            newLoginInformation: {
                email: this.email ? this.email : '',
                password: '',
            },
            styleAdmin: this.styleAs == 'admin' ? true : false,
            colStyle: true,
            canChangeEmail: TokenService.getIsAdmin() != 'true',
            isPasswordMatched: false
        }
    },
    methods: {
        submitForm() {
            if (TokenService.getIsAdmin()=='true' || this.newLoginInformation.password == this.newLoginInformation.reTypePassword){
                this.isPasswordMatched = false
                this.$emit('return', this.newLoginInformation)
            }
            else {
                this.isPasswordMatched = true
                this.$toasted.global.error({
                    message: "Password don't match"
                })
            }
        }
    },
}
</script>

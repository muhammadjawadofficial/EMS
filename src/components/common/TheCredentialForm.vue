<template>
<div :class="styleAdmin? 'card' : ''">
    <div :class="styleAdmin? 'card-body' : ''">
        <form @submit.prevent="$emit('return', newLoginInformation)">
            <legend v-if="styleAdmin">Edit Login Information</legend>
            <div class="row">
                <div :class="colStyle ? 'col-md-6 col-sm-6' : 'col-md-4'">
                    <div class="form-group">
                        <label>Email address</label>
                        <input v-model="newLoginInformation.email" type="email" class="form-control" autocomplete="username"/>
                    </div>
                </div>
                <div v-if="!colStyle" :class="colStyle ? 'col-md-6 col-sm-6' : 'col-md-4'">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input v-model="newLoginInformation.currentPassword" type="password" class="form-control" autocomplete="new-password"/>
                    </div>
                </div>
                <div :class="colStyle ? 'col-md-6 col-sm-6' : 'col-md-4'">
                    <div class="form-group">
                        <label>New Password</label>
                        <input v-model="newLoginInformation.password" type="password" class="form-control" autocomplete="current-password"/>
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
    props: ['email', 'styleAs'],
    mounted() {
        if (TokenService.getIsAdmin() == 'false' || (this.$route.params.id) == TokenService.getCurrentEmployeeId()) {
            this.colStyle = false
            this.$set(this.newLoginInformation, 'currentPassword', '')
        }

    },
    data() {
        return {
            newLoginInformation: {
                email: this.email ? this.email : '',
                password: '',
            },
            styleAdmin: this.styleAs == 'admin' ? true : false,
            colStyle: true
        }
    },
}
</script>

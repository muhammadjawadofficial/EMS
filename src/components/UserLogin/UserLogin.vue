<template>
<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <div class="login100-form-title background-image">
                <span class="login100-form-title-1">
                    Sign In
                </span>
            </div>
            <form class="login100-form validate-form" @submit.prevent="signIn">
                <p class="text-danger">{{error}}</p>
                <div class="wrap-input100 validate-input mb-3">
                    <span class="label-input100">Email</span>
                    <input class="input100" v-model="loginInformation.email" type="email" placeholder="Enter username" autocomplete="username" required>
                    <span class="focus-input100"></span>
                </div>
                <div class="wrap-input100 validate-input mb-2">
                    <span class="label-input100">Password</span>
                    <input class="input100" v-model="loginInformation.password" type="password" placeholder="Enter password" autocomplete="current-password" required>
                    <span class="focus-input100"></span>
                </div>
                <div class="container-login100-form-btn d-flex justify-content-end">
                    <button v-if="isPressed" disabled class="login100-form-btn">
                        <b-spinner></b-spinner>
                    </button>
                    <button v-else type="submit" class="login100-form-btn">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import {
    TokenService
} from '@/services/storage.service'
import {
    login,
    network_error,
} from "@/constants"
export default {
    data() {
        return {
            loginInformation: {
                email: null,
                password: null
            },
            error: '',
            isPressed: false
        }
    },
    mounted() {
        if (!TokenService.getToken()) {
            this.$store.dispatch('RESET_USER_INFO')
        }
        doconsole('userlogin')
        doconsole(this.$store.getters.USERID)
    },
    methods: {
        async signIn() {
            // this.error = login.check
            this.isPressed = true
            const response = await UserService.login(this.loginInformation)

            if (!response) {
                this.error = network_error
                this.isPressed = false
            } else {
                if (!response.data.success) {
                    this.error = login.failure
                    this.loginInformation.password = ''
                    this.isPressed = false
                } else {
                    this.error = login.success
                    TokenService.saveToken(response.data.token)
                    TokenService.saveCurrentEmployeeId(response.data.id)
                    TokenService.saveIsAdmin(response.data.isAdmin)

                    const res = await UserService.getUserDetails(response.data.id)
                    if (res) {
                        const data = res.data.data

                        TokenService.saveEmployeeEmail(data.employeeLogin.email)
                        TokenService.saveEmployeeImage(data.image.data)
                    }

                    this.$toasted.global.success()
                    if (response.data.isAdmin)
                        this.$router.replace({
                            path: '/admin'
                        })
                    else
                        this.$router.replace({
                            path: '/pageProfile/?id=' + response.data.id
                        })
                }
            }
        }
    },
}
</script>

<style scoped>
@import url('./UserLogin.css');
</style>

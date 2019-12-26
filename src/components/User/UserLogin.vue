<template>
<div class="mb-5" style="margin-top:70px">
    <login-form :data="loginData" @sign-in="signIn">
        <!-- <p style="text-align: center;"><a href="#">Forget Password？</a></p> -->
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" :key="error.key">{{ error }}</li>
            </ul>
        </p>

    </login-form>
</div>
</template>

<script>
import Vue from 'vue'
import LoginForm from 'vue-login-form'
import UserService from '@/services/user.service'
import {
    TokenService
} from '@/services/storage.service'

export default {
    data() {
        return {
            errors: [],

            loginData: {
                title: 'Account Login',
                form: true,
                buttonText: 'SIGN IN',
                inputList: [{
                        id: 'email',
                        label: 'Email',
                        type: 'email',
                        placehold: 'Email',
                        auto: 'email',
                        value: null
                    },
                    {
                        id: 'password',
                        label: 'Password',
                        type: 'password',
                        placehold: 'Password',
                        auto: 'current-password',
                        value: null
                    },
                ]
            }
        }
    },
    components: {
        LoginForm,
    },
    methods: {
        checkForm() {
            if (this.loginData.inputList[0].value && this.loginData.inputList[1].value) {
                return true;
            }

            this.errors = [];

            if (!this.loginData.inputList[0].value) {
                this.errors.push('Email required.');
            }
            if (!this.loginData.inputList[1].value) {
                this.errors.push('Password required.');
            }
            return false;
            // e.preventDefault();
        },
        async signIn(e) {
            // e.preventDefault
            this.errors = []
            if (this.checkForm()) {
                // const check = await UserService.login(this.loginData.inputList[0].value, this.loginData.inputList[1].value)
                // console.log(check)
                // console.log(await UserService.login(this.loginData.inputList[0].value, this.loginData.inputList[1].value))
                if (await UserService.login(this.loginData.inputList[0].value, this.loginData.inputList[1].value)) {
                    // console.log('success')
                    this.$router.replace({
                        path: '/list'
                    })
                } else {
                    this.errors.push("Email or Password is incorrect")
                }
                // .then(response => {
                //     TokenService.saveToken(response.data.token)
                //     TokenService.saveCurrentEmployeeId(response.data.id)
                //     TokenService.saveIsAdmin(response.data.isAdmin)
                //     this.$router.replace({
                //         path: '/list'
                //     })
                // })
                // .catch(e => {
                //     // e.response.data.error? console.log(e.response.data.error):''
                //     // e.response.data.email? console.log(e.response.data.email):''
                //     console.log(e.response.data)
                //     this.errors.push("Email or Password is incorrect")
                // })
                // if (response.status == 200) {
                //     console.log('ss')
                //     TokenService.saveToken(response.data.token)
                //     TokenService.saveCurrentEmployeeId(response.data.id)
                //     TokenService.saveIsAdmin(response.data.isAdmin)
                //     this.$router.replace({
                //         path: '/list'
                //     })
                // }
                // else{
                //     this.errors.push("Wrong Email or Password")
                // }
                // axios.post(server + 'auth/login', {
                //         email: this.loginData.inputList[0].value,
                //         password: this.loginData.inputList[1].value
                //     })
                //     .then((response) => {
                //         // console.log(response.status + response.data.data.firstName )
                //         // console.log(response)
                //         console.log((response))

                //         var user = response.data

                //         localStorage.setItem('token', user.token)
                //         localStorage.setItem('currentEmployeeId', user.id)
                //         localStorage.setItem('isAdmin', user.isAdmin)

                //         console.log(typeof(user._id));
                //         console.log(typeof(localStorage.getItem('currentEmployeeId')));

                //         this.$router.replace({
                //             path: '/list'
                //         })
                //         // this.$router.replace({
                //         //     path: `profile/${localStorage.getItem('currentEmployeeId')}`
                //         // });
                //         // if (response.data.data.isAdmin) {
                //         //     this.$router.replace({
                //         //         path: `listUsers`
                //         //     });
                //         // } else {
                //         //     this.$session.set('currentEmployeeId', response.data.data._id)
                //         //     this.$router.replace({
                //         //         path: `profile/${response.data.data._id}`
                //         //     });
                //         // }
                //     })
                //     .catch((e) => {
                //         this.errors.push('Email or Password Incorrect')
                //         console.log(e)
                //         console.log('error')
                //     })
            }
        }
    },
}
</script>

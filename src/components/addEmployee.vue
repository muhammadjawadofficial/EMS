<template>
<div >
    <button @click="backToUserList" class="btn btn-warning m-3" width="30px">
        <img src="../assets/back.png" width="20px"> Back to Employee List</button>
    <login-form :data="loginData" @sign-in="signIn">
        <!-- <p style="text-align: center;">Already had an account? <a @click="signInForm">Login</a></p> -->
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

export default {
    data() {
        return {
            errors: [],
            loginData: {
                title: 'Register an Employee',
                form: true,
                buttonText: 'Register',
                // image: {
                //     url: 'https://www.logostack.com/wp-content/uploads/designers/eclipse42/small-panda-01-600x420.jpg',
                //     alt: 'test logo'
                // },
                inputList: [{
                        id: 'firstName',
                        label: 'First Name *',
                        type: 'text',
                        placehold: 'First Name',
                        auto: 'firstName',
                        value: null
                    },
                    {
                        id: 'lastName',
                        label: 'Last Name',
                        type: 'text',
                        placehold: 'Last Name',
                        auto: 'lastName',
                        value: null
                    },
                    {
                        id: 'email',
                        label: 'Email *',
                        type: 'email',
                        placehold: 'Email',
                        auto: 'email',
                        value: null
                    },
                    {
                        id: 'password',
                        label: 'Password *',
                        type: 'password',
                        placehold: 'Password',
                        auto: 'current-password',
                        value: null
                    }, {
                        id: 'repeatpassword',
                        label: 'Repeat Password *',
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
    beforeMount() {
        if (this.$session.exists()) {
            if (!this.$session.get('isAdmin')) {
                this.$router.replace({
                    path: `/profile/${this.$session.get('currentEmployeeId')}`
                })
            }
        } else {
            this.goBackToLogin();
        }
    },
    methods: {
        backToUserList() {
            this.$router.replace({
                path: '/listUsers'
            })
        },
        checkForm: function (e) {
            if (this.loginData.inputList[0].value &&
                this.loginData.inputList[2].value &&
                this.loginData.inputList[3].value &&
                this.loginData.inputList[3].value == this.loginData.inputList[4].value) {
                return true;
            }

            this.errors = [];

            if (!this.loginData.inputList[0].value) {
                this.errors.push('First Name required');
            }
            if (!this.loginData.inputList[2].value) {
                this.errors.push('Email required');
            }
            if (!this.loginData.inputList[3].value) {
                this.errors.push('Password required');
            }
            if (this.loginData.inputList[3].value != this.loginData.inputList[4].value) {
                this.loginData.inputList[3].value = null;
                this.loginData.inputList[4].value = null;
                this.errors.push('Password doesn\'t match. Please type same passwords in both fields');
            }
        },
        signIn() {
            this.errors = []

            if (this.checkForm()) {

                axios.post('http://localhost:5000/api/user/signup', {
                        firstName: this.loginData.inputList[0].value,
                        lastName: this.loginData.inputList[1].value,
                        email: this.loginData.inputList[2].value,
                        password: this.loginData.inputList[3].value,
                        // isAdmin: true
                    })
                    .then((response) => {
                        console.log("success" + this.loginData.length)
                        console.log(response);
                        this.$router.replace({
                            path: '/listusers'
                        });
                    })
                    .catch((e) => {
                        console.log("error" + this.loginData)
                        console.log(e)
                    })
            }
        },
        goBackToLogin() {
            this.$router.replace({
                path: '/'
            });
        }
    }
}
</script>
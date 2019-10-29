<template>
<div>
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

export default {
    data() {
        return {
            errors: [],
            loginData: {
                title: 'Account Login',
                form: true,
                buttonText: 'SIGN IN',
                // image: {
                //     url: 'https://www.logostack.com/wp-content/uploads/designers/eclipse42/small-panda-01-600x420.jpg',
                //     alt: 'test logo'
                // },
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
        signIn() {
            this.errors = []
            if (this.checkForm()) {
                axios.post('http://localhost:5000/auth/login', {
                        email: this.loginData.inputList[0].value,
                        password: this.loginData.inputList[1].value
                    })
                    .then((response) => {
                        // console.log(response.status + response.data.data.firstName )
                        // console.log(response)
                        console.log((response))

                        var token = response.data.token
                        var user = jwtDecode(token).user

                        localStorage.setItem('token', token)
                        localStorage.setItem('currentEmployeeId', user._id)
                        localStorage.setItem('isAdmin', user.isAdmin)

                        console.log(typeof(user._id));
                        console.log(typeof(localStorage.getItem('currentEmployeeId')));

                        
                        this.$router.replace({
                            path: `profile/${localStorage.getItem('currentEmployeeId')}`
                        });
                        // if (response.data.data.isAdmin) {
                        //     this.$router.replace({
                        //         path: `listUsers`
                        //     });
                        // } else {
                        //     this.$session.set('currentEmployeeId', response.data.data._id)
                        //     this.$router.replace({
                        //         path: `profile/${response.data.data._id}`
                        //     });
                        // }
                    })
                    .catch((e) => {
                        this.errors.push('Email or Password Incorrect')
                        console.log(e)
                        console.log('error')
                    })
            }
        }
    },
    beforeMount(){
        if(localStorage.getItem('token'))
        {
            this.$router.replace({
                path: `/profile/${localStorage.getItem('currentEmployeeId')}`
            });
        }
    }
}
</script>

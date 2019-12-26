<template>
<!-- 
        <div class="mb-1" style="margin-top:70px">
        <button @click="backToUserList" class="btn btn-warning m-3" width="30px">
        <img src="../assets/back.png" width="20px"> Back to Employee List</button>
        <login-form :data="loginData" @sign-in="addEmployee">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" :key="error.key">{{ error }}</li>
            </ul>
        </p>
    </login-form> -->

<div class="page-wrapper bg-gra-02 p-t-90 pb-4 font-poppins">
    <div class="wrapper wrapper--w680">
        <div class="card card-4">
            <div class="card-body">
                <h2 class="title">Registration Form</h2>
                <form @submit.prevent="addUser()">
                    <div class="row row-space">
                        <div class="col-md-5 col-sm-12">
                            <div class="input-group">
                                <label class="label">First Name</label>
                                <input v-model="newUser.firstName" required class="input--style-4" type="text">
                            </div>
                        </div>
                        <div class="col-md-5 col-sm-12">
                            <div class="input-group">
                                <label class="label">Last Name</label>
                                <input v-model="newUser.lastName" required class="input--style-4" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="row row-space">
                        <div class="col-md-5 col-sm-12">
                            <div class="input-group">
                                <label class="label">Email</label>
                                <input v-model="newUser.email" required class="input--style-4" autocomplete="username" type="email">
                            </div>
                        </div>
                        <div class="col-md-5 col-sm-12">
                            <div class="input-group">
                                <label class="label">Password</label>
                                <input v-model="newUser.password" required class="input--style-4" autocomplete="current-password" type="password">
                            </div>
                        </div>
                    </div>
                    <div class="row row-space">
                        <div class="col-md-5 col-sm-12">
                            <div class="input-group">
                                <label class="label col-12">Country</label>
                                <select v-model="selectedCountry" class="custom-select" required>
                                    <option disabled selected value="">Please select one</option>
                                    <option v-for="country in selectCountries" :key="country.id" :value="country.id">{{country.country}}</option>
                                    <!-- <option>B</option>
                                        <option>C</option> -->
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5 col-sm-12">
                            <div class="input-group">
                                <label class="label col-12">City</label>
                                <select v-model="newUser.cityId" class="custom-select" required>
                                    <option disabled selected value="">Please select one</option>
                                    <option v-for="city in selectCities" :key="city.id" :value="city.id">{{city.city}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <div class="col-md-5 col-sm-12">
                            <div class="input-group">
                                <label class="label">Gender</label>
                                <div class="p-t-10">
                                    <!-- <label class="radio-container">Female
                                            <input type="radio" name="gender" value="female" v-model="checkData">
                                            <span class="checkmark"></span>
                                        </label> -->
                                    <label class="radio-container mr-4" v-for="gender in selectGenders" :key="gender.id">{{gender.gender}}
                                        <input type="radio" required name="gender" checked="checked" :value="gender.id" v-model="newUser.genderId">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="p-t-15">
                        <button class="btn btn--radius-2 btn--blue" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import LoginForm from 'vue-login-form'
import UserService from '@/services/user.service'
import {
    server
} from '@/constants'
export default {
    data() {
        return {
            errors: [],
            checkData: '',
            newUser: {
                firstName: null,
                lastName: null,
                email: null,
                password: null,
                cityId: null,
                countryId: null,
                genderId: null
            },

            selectedCountry: '',
            selectGenders: [],
            selectCities: [],
            selectCountries: [],

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
    methods: {
        // backToUserList() {
        //     this.$router.replace({
        //         path: '/listUsers'
        //     })
        // },
        check(asdf) {
            console.log(asdf)
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
        async addEmployee() {
            this.errors = []

            if (this.checkForm()) {

                // const response = await axios.post('http://192.168.0.29:2000/employee/signup',{

                // })
                // //working API
                // const response = await UserService.addUser(this.loginData.inputList[0].value,this.loginData.inputList[1].value,this.loginData.inputList[2].value,this.loginData.inputList[3].value)
                // console.log(response.status)
                // console.log(response.data)
                // if(response.status == 201)
                // {
                //     this.$router.push({
                //         path:'/list'
                //     })
                // }
                // else{
                //     this.errors.push(response.data)
                // }

                // axios.post(server + 'auth/signup', {
                //         firstName: this.loginData.inputList[0].value,
                //         lastName: this.loginData.inputList[1].value,
                //         email: this.loginData.inputList[2].value,
                //         password: this.loginData.inputList[3].value,
                //         // isAdmin: true
                //     }, headers)
                //     .then((response) => {
                //         console.log("success" + this.loginData.length)
                //         console.log(response);
                //         this.$router.replace({
                //             path: '/list'
                //         });
                //     })
                //     .catch((e) => {
                //         console.log("error" + this.loginData)
                //         console.log(e)
                //     })
            }
        },
        // goBackToLogin() {
        //     this.$router.replace({
        //         path: '/'
        //     });
        // }
        async getSelectData() {
            // await axios.get(server + 'gender/getGenders')
            //     .then(response => this.selectGenders = response.data.genders)
            this.selectGenders = await UserService.getGenders();
            // await axios.get(server + 'country/getCountries')
            //     .then(response => this.selectCountries = response.data.countries)
            this.selectCountries = await UserService.getCountries();
        },

        async getCities(){
            this.selectCities = await UserService.getCities(this.newUser.countryId)
        },

        addUser() {
            if (this.newUser.firstName &&
                this.newUser.lastName &&
                this.newUser.email &&
                this.newUser.genderId &&
                this.newUser.cityId &&
                this.newUser.countryId &&
                this.newUser.password) {
                axios.post(server + 'employee/signup', this.newUser)
                    .then(response => console.log(response))
                    .catch(e => console.log(e.response))
            } else {
                console.log('fix errors')
            }
        },
    },
    beforeMount() {
        this.getSelectData()
    },
    beforeUpdate() {
        if (this.selectedCountry && (this.selectedCountry != this.newUser.countryId)) {
            this.newUser.countryId = this.selectedCountry
            this.getCities();
            // axios.get(`${server}country/${this.newUser.countryId}/getCities`)
            //     .then(response => {
            //         this.selectCities = response.data.countries.cities
            //         console.log(response)
            //     })
        }
    }
}
</script>

<style scoped>
@import url('./main.css');
@import url('./select2.min.css');
</style>

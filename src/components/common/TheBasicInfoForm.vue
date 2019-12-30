<template>
<div :class="styleAdmin? 'card' : ''">
    <div :class="styleAdmin? 'card-body' : ''">
        <form @submit.prevent="$emit('return',basicInformation)">
            <legend v-if="styleAdmin">Edit Basic Information</legend>
            <div class="row row-space">
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-6'">
                    <div class="form-group">
                        <label>First Name</label>
                        <input v-model="basicInformation.firstName" type="text" class="form-control" required>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-6'">
                    <div class="form-group">
                        <label>Last Name</label>
                        <input v-model="basicInformation.lastName" type="text" class="form-control" required>
                    </div>
                </div>
                <div v-if="styleAdmin" class="col-md-3 col-sm-6">
                    <div class="form-group">
                        <label>Designation</label>
                        <select v-model="basicInformation.designationId" class="custom-select">
                            <option selected value=null>Please select one</option>
                            <option v-for="designation in selectDesignations" :key="designation.id" :value="designation.id">{{designation.designation}}</option>
                        </select>
                    </div>
                </div>
                <!-- <div class="col-md-3 col-sm-6">
                    <div class="form-group">
                        <label>Role</label>
                        <select v-model="basicInformation.isAdmin" class="custom-select" required>
                            <option selected value=0>Employee</option>
                            <option selected value=1>Admin</option>
                        </select>
                    </div>
                </div> -->
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-sm-6 col-12'">
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input v-model="basicInformation.contactNumber" placeholder="03XXXXXXXXX" type="tel" class="form-control" pattern="03[0-9]{2}[0-9]{7}">
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-6'">
                    <div class="form-group">
                        <label>Gender</label>
                        <select v-model="basicInformation.genderId" class="custom-select">
                            <option selected value=null>Please select one</option>
                            <option v-for="gender in selectGenders" :key="gender.id" :value="gender.id">{{gender.gender}}</option>
                        </select>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-sm-3 col-6'">
                    <div class="form-group">
                        <label>Age</label>
                        <input v-model="basicInformation.age" type="number" class="form-control" min="20" max="65">
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-sm-5 col-6'">
                    <div class="form-group">
                        <label>Country</label>
                        <select v-model="basicInformation.countryId" class="custom-select" @change="getCities(basicInformation.countryId)">
                            <option selected value=null>Please select one</option>
                            <option v-for="country in selectCountries" :key="country.id" :value="country.id">{{country.country}}</option>
                        </select>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : ' col-sm-4 col-6'">
                    <div class="form-group">
                        <label>City</label>
                        <select v-model="basicInformation.cityId" class="custom-select">
                            <option disabled selected value=null>Please select one</option>
                            <option v-for="city in selectCities" :key="city.id" :value="city.id">{{city.city}}</option>
                        </select>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-6 col-sm-12' : 'col-12'">
                    <div class="form-group">
                        <label>Address</label>
                        <textarea v-model="basicInformation.address" rows="3" class="form-control"></textarea>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-6 col-sm-12' : 'col-12'">
                    <div class="form-group">
                        <label>Description/About Me</label>
                        <textarea v-model="basicInformation.description" rows="3" class="form-control"></textarea>
                    </div>
                </div>
            </div>
            <div :class="styleAdmin? 'add-button' :'modal-footer'">
                <button type="submit" class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
export default {
    props: ['userData', 'styleAs'],
    data() {
        return {
            basicInformation: this.userData,
            selectGenders: [],
            selectCountries: [],
            selectCities: [],
            selectDesignations: [],
            styleAdmin: this.styleAs == 'admin' ? true : false
        }
    },
    methods: {
        async getGenders() {
            const response = await UserService.getGenders();
            this.selectGenders = response.data.data
            // doconsole(this.selectGenders)
        },

        async getDesignations() {
            const response = await UserService.getDesignations()
            this.selectDesignations = response.data.data
        },

        async getCountries() {
            const response = await UserService.getCountries()
            this.selectCountries = response.data.data
        },

        async getCities(countryId) {
            // doconsole(!countryId)
            if (countryId != 'null') {
                const response = await UserService.getCities(countryId)
                this.selectCities = response.data.data.cities
            } else {
                this.selectCities = []
                this.basicInformation.cityId = null
            }
        },
    },
    watch:{
        userData(){
            this.basicInformation = this.userData
        }
    },
    mounted() {
        doconsole('inside form')
        doconsole(this.userData)
        this.getGenders();
        this.getCountries();
        this.getDesignations();
        this.basicInformation.countryId ? this.getCities(this.basicInformation.countryId) : ''
    },
}
</script>

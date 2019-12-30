<template>
<b-modal id="edit-about" title="Edit About" hide-footer>
    <template v-slot:default>
        <TheBasicInfoForm :userData="updatedInformation" @return="edit"/>
        <!-- <form @submit.prevent="edit()">
            <div class="row row-space">
                <div class="col-6">
                    <div class="form-group">
                        <label>First Name</label>
                        <input v-model="updatedInformation.firstName" type="text" class="form-control ">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Last Name</label>
                        <input v-model="updatedInformation.lastName" type="text" class="form-control">
                    </div>
                </div>
            </div>

            <div class="row row-space">
                <div class="col-12">
                    <div class="form-group">
                        <label>Designation</label>
                        <input v-model="updatedInformation.designation" type="text" class="form-control">
                    </div>
                </div>
            </div>

            <div class="row row-space">

                <div class="col-3">
                    <div class="form-group">
                        <label>Age</label>
                        <input v-model="updatedInformation.age" type="number" class="form-control" min="20" max="65">
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label>Gender</label>
                        <select v-model="updatedInformation.genderId" class="custom-select" required>
                            <option disabled selected value="">Please select one</option>
                            <option v-for="gender in selectGenders" :key="gender.id" :value="gender.id">{{gender.gender}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input v-model="updatedInformation.contactNumber" placeholder="03XXXXXXXXX" type="tel" class="form-control" pattern="03[0-9]{2}[0-9]{7}">
                    </div>
                </div>
            </div>

            <div class="row row-space">
                <div class="col-6">
                    <div class="form-group">
                        <label>Country</label>
                        <select v-model="updatedInformation.countryId" class="custom-select" @change="getCities(updatedInformation.countryId), updatedInformation.cityId = ''" required>
                            <option disabled selected value="">Please select one</option>
                            <option v-for="country in selectCountries" :key="country.id" :value="country.id">{{country.country}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>City</label>
                        <select v-model="updatedInformation.cityId" class="custom-select" required>
                            <option disabled selected value="">Please select one</option>
                            <option v-for="city in selectCities" :key="city.id" :value="city.id">{{city.city}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Address</label>
                <textarea v-model="updatedInformation.address" rows="2" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea v-model="updatedInformation.description" rows="3" class="form-control"></textarea>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-warning">Update</button>
            </div>
        </form> -->
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import {
    basicInfo
} from '@/constants'
import TheBasicInfoForm from '@/components/common/TheBasicInfoForm'
export default {
    data() {
        return {
            updatedInformation: basicInfo.get(),
            // selectGenders: [],
            // selectCountries: [],
            // selectCities: [],
            // updated: true
        }
    },
    components: {
        TheBasicInfoForm
    },
    props: ['userData'],
    methods: {
        async edit(updatedInformation) {
            const response = await UserService.editProfile(updatedInformation, this.$route.query.id)
            if (response) {
                this.$emit('update')
                this.$bvModal.hide('edit-about')
            }
        },

        // async getGenders() {
        //     const response = await UserService.getGenders();
        //     this.selectGenders = response.data.data
        // },

        // async getCountries() {
        //     const response = await UserService.getCountries()
        //     this.selectCountries = response.data.data
        // },

        // async getCities(countryId) {
        //     const response = await UserService.getCities(countryId)
        //     this.selectCities = response.data.data.cities
        // },
    },
    mounted() {
        // this.getGenders();
        // this.getCountries();
        // this.getCities(this.userData.countryId)
        doconsole('inside modal')
        doconsole(this.userData)
        this.updatedInformation = basicInfo.set(this.userData)
        doconsole(this.updatedInformation)
    }
}
</script>

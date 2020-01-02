<template>
<div class="card">
    <div class="card-body">
        <form @submit.prevent="updateCountry()">
            <legend>{{formLegend}}</legend>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <label>Country Name</label>
                        <div class="d-flex">
                            <input type="text" class="form-control col-md-10" v-model="countryDetails.country" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Cities</label>
                        <div class="row">
                            <div class="col-md-6 col-sm-6" v-for="(city, index) in countryDetails.cities" :key="index">
                                <div class="d-flex">
                                    <input type="text" class="col-8 form-control mt-1" v-model="countryDetails.cities[index].city">
                                    <div class="col-4 px-0 mt-2">
                                        <a @click="deleteCity(index)"><i class="fas fa-minus-circle custom-icon"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
                <div class="col-md-4 add-city-section">
                    <div class="card">
                        <div style="text-align: center;margin-top: 20px;">
                            <a class="card-link" data-toggle="collapse" href="#card-element-747447">Add City</a>
                            <hr>
                        </div>
                        <div id="card-element-747447" class="collapse">
                            <div class="card-body">
                                <form @submit.prevent="addACity()">
                                    <label>Enter City</label>
                                    <div class="d-flex flex-row">
                                        <input type="text" placeholder="City Name" class="form-control col-10" v-model="newCity" required>
                                        <button class="" type="submit"><i class="far fa-save custom-icon"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
export default {
    data() {
        return {
            formLegend: '',
            countryDetails: {
                country: '',
                cities: []
            },
            newCity: '',
            isNewCountry: this.$route.params.id == 'new'
        }
    },
    mounted() {
        if (!this.isNewCountry)
            this.getCountryDetails()
    },
    methods: {
        async getCountryDetails() {
            const response = await UserService.getCities(this.$route.params.id)
            doconsole(response)
            if (response)
                this.countryDetails = response.data.data
            this.formLegend = this.countryDetails.country
        },
        addCity(x) {
            this.countryDetails.cities.push({
                city: x
            })

        },
        async addACity() {
            if (this.isNewCountry) {
                this.addCity(this.newCity)
                this.newCity = ''
            } else {
                const cityObject = {
                    countryId: this.countryDetails.id,
                    city: this.newCity
                }

                const response = await UserService.addACityToExistingCountry(cityObject)
                if (response) {
                    this.$toasted.global.success()
                    this.newDegree = ''
                    this.getCountryDetails()
                }
            }
        },
        async updateCountry() {
            if (this.isNewCountry) {
                if (this.countryDetails.cities.length < 1) {
                    this.$toasted.global.error({
                        message: 'Please add atleast one city against "' + this.countryDetails.country + '"'
                    })
                    return;
                }
                var newCountry = {
                    country: this.countryDetails.country,
                    cities: []
                }
                this.countryDetails.cities.forEach(city => {
                    newCountry.cities.push(city.city)
                })

                const response = await UserService.addCountryWithCities(newCountry)
                if (response) {
                    this.$toasted.global.success({
                        message: 'Country added Successfully!'
                    })
                    this.$router.push({
                        path: '/admin/listCountry'
                    })
                }
            } else {
                doconsole(this.countryDetails)
                const response = await UserService.updateCountry(this.countryDetails)
                if (response)
                    this.getCountryDetails()

            }
        },
        deleteCity(index) {
            this.countryDetails.cities.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.custom-icon {
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
}

fieldset {
    border: 1px solid #999;
    border-radius: 8px;
    box-shadow: rgb(230, 153, 153) 1px 1px 10px 0px;
    padding: 15px;
    margin-top: 15px;
}

@media (min-width: 768px) {
    .add-city-section {
        border-left: 2px solid #f4d0d0;
    }
}

@media (max-width: 767px) {
    .add-city-section {
        border-top: 2px solid #f4d0d0;
        margin-top: 20px;
        padding-top: 15px;
    }
}
</style>

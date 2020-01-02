<template>
<div>
    <b-button class="add-button" @click="editCountry('new')" variant="primary">Add Education</b-button>
    <div class="card">
        <div class="card-body">
            <b-table primary-key="id" sort-by="id" :tbody-transition-props="tableTransition" sort-icon-left responsive striped hover :busy="busy" :items="countries" :fields="tableCountriesFields">
                <template v-slot:cell(cities)="data">
                    {{data.item.cities.length}}
                </template>

                <template v-slot:cell(actions)="data">
                    <a @click="editCountry(data.item.id)"><i class="far fa-edit"></i></a>
                    <a @click="deleteCountry(data.item.id)"><i class="fas fa-trash"></i></a>
                </template>

                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import {
    adminPanelTableTransition
} from '@/constants'
export default {
    data() {
        return {
            countries: null,
            tableCountriesFields: [{
                key: 'id',
                label: '#',
                'class': 'width10 text-indent text-center',
                sortable: true
            }, {
                key: 'country',
                label: 'Country',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'cities',
                label: 'No. of Cities',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'actions',
                label: 'Actions',
                'class': 'width15 text-center'
            }],
            busy: true,
            tableTransition: adminPanelTableTransition,
        }
    },
    mounted() {
        this.getCountries();
    },
    methods: {
        async getCountries() {
            const res = await UserService.getCities('1')
            doconsole(res)
            const response = await UserService.getCountries();
            // doconsole(response)
            if(response) {
                this.countries = response.data.data
                this.educations = response.data.data
                this.busy = false
            }
        },
        editCountry(countryId) {
            this.$router.push({
                path: 'editCountry/' + countryId
            })
        },
        async deleteCountry(countryId){
            const response = await UserService.deleteCountry(countryId)
            if(response)
                {
                    this.$toasted.global.success({message: 'Degree Deleted Successfully'})
                    this.getCountries();
                }
        }
    }
}
</script>

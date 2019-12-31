<template>
<div>
    <div class="card">
        <div class="card-body">
            <b-button class="add-button" @click="addGender" variant="primary">Add Gender</b-button>
            <b-table sort-by="id" primary-key="id" :tbody-transition-props="tableTransition" responsive striped hover :busy="busy" :items="genders" :fields="tableGendersFields">
                <template v-slot:cell(actions)="data">
                    <a @click="genderToBeEdit = data.item"><i class="far fa-edit"></i></a>
                    <a @click="deleteGender(data.item.id)"><i class="fas fa-trash"></i></a>
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
    <div class="card" v-if="genderToBeEdit">
        <div class="card-body">
            <GenderEdit :gender="genderToBeEdit" @update="getGenders" @canceled="genderToBeEdit=null" />
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import GenderEdit from './GenderEdit'
import {
    adminPanelTableTransition
} from '@/constants'
export default {
    data() {
        return {
            genders: null,
            tableGendersFields: [{
                key: 'id',
                label: '#',
                'class': 'width10 text-center text-indent',
                sortable: true
            }, {
                key: 'gender',
                label: 'Gender',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'actions',
                label: 'Actions',
                'class': 'width15 text-center',
            }],
            busy: true,
            genderToBeEdit: null,
            tableTransition: adminPanelTableTransition
        }
    },
    components: {
        GenderEdit
    },
    mounted() {
        this.getGenders()
    },
    methods: {
        async getGenders() {
            const response = await UserService.getGenders()

            if (response) {
                this.busy = false
                this.genderToBeEdit = null
                this.genders = response.data.data
            }
        },
        addGender() {
            this.genderToBeEdit = {
                id: null,
                gender: null,
            }
        },
        async deleteGender(genderId){
            const response = await UserService.deleteGender(genderId)
            if(response){
                this.$toasted.global.success({message: 'Gender deleted successfully!!'})
                this.getGenders()
            }
        }
    },
}
</script>

<style>

</style>

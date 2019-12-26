<template>
<div>
    <b-button class="add-button" @click="editEducation('new')" variant="primary">Add Education</b-button>
    <div class="card">
        <div class="card-body">
            <b-table primary-key="id" sort-by="id" :tbody-transition-props="tableTransition" responsive striped hover :busy="busy" :items="educations" :fields="tableEducationFields">
                <template v-slot:cell(degrees)="data">
                    {{data.item.degrees.length}}
                </template>

                <template v-slot:cell(actions)="data">
                    <a @click="editDegree(data.item.id)"><i class="far fa-edit"></i></a>
                    <a @click="deleteDegree(data.item.id)"><i class="fas fa-trash"></i></a>
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
    <!-- <table class="table table-striped table-responsive-sm table-hover table-fixed-layout">
        <thead>
            <tr>
                <th class="width10 text-center">#</th>
                <th>Degree Level</th>
                <th class="text-center">No. of Degrees</th>
                <th class="width15 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(degreeLevel, index) in educations" :key="degreeLevel.id">
                <td class="text-center">
                    {{index+1}}
                </td>
                <td>
                    {{degreeLevel.degreeLevel}}
                </td>
                <td class="text-center">
                    {{degreeLevel.degrees.length}}
                </td>
                <td class="text-center">
                    <a @click="editEducation(degreeLevel.id)"><i class="material-icons">edit</i></a>
                    <a><i class="material-icons">delete</i></a>
                </td>
            </tr>
        </tbody>
    </table> -->
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
            educations: null,
            tableEducationFields: [{
                key: 'id',
                label: '#',
                'class': 'width10 text-indent text-center',
                sortable: true
            }, {
                key: 'degreeLevel',
                label: 'Degree Level',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'degrees',
                label: 'No. of Degrees',
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
        this.getDegreeLevels();
    },
    methods: {
        async getDegreeLevels() {
            const response = await UserService.getDegreeLevels();
            console.log(response)
            if (!response || !response.data.success) {
                this.$toasted.global.error()
                this.$router.push({
                    path: '404'
                })
            } else {
                this.educations = response.data.data
                this.busy = false
            }
        },
        editDegree(degreeLevelId) {
            this.$router.push({
                path: 'editEducation/' + degreeLevelId
            })
        },
        async deleteDegree(degreeLevelId){
            const response = await UserService.deleteDegree(degreeLevelId)
            if(response)
                {
                    this.$toasted.global.success({message: 'Degree Deleted Successfully'})
                    this.getDegreeLevels();
                }
        }
    }
}
</script>

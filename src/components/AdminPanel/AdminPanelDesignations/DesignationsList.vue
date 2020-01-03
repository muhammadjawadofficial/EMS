<template>
<div>
    <b-button class="add-button" @click="addDesignation" variant="primary">Add Designation</b-button>
    <div class="card">
        <div class="card-body">
            <b-table sort-by="id" :current-page="currentPage" :per-page="perPage" primary-key="id" :tbody-transition-props="tableTransition" sort-icon-left responsive striped hover :busy="busy" :items="designations" :fields="tableDesignationsFields">
                <template v-slot:cell(actions)="data">
                    <a @click="designationToBeEdit = data.item"><i class="far fa-edit"></i></a>
                    <a @click="deleteDesignation(data.item.id)"><i class="fas fa-trash"></i></a>
                </template>

                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
            </b-table>
            <b-row>
                <b-col sm="5" md="2" class="my-auto">
                    <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions" @change="getCertificates"></b-form-select>
                </b-col>
                <b-col sm="7" md="4" class="my-auto">
                    Showing {{perPage}} out of {{totalRows}} records
                </b-col>
                <b-col sm="12" md="6">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" class="mt-1"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
    <div class="card" v-if="designationToBeEdit">
        <div class="card-body">
            <DesignationEdit :designation="designationToBeEdit" @update="getDesignations" @canceled="designationToBeEdit=null" />
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import DesignationEdit from './DesignationEdit'
import {
    adminPanelTableTransition
} from '@/constants'
export default {
    data() {
        return {
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 6, 7, 8, 9, 10, 15],
            designations: null,
            tableDesignationsFields: [{
                key: 'id',
                label: '#',
                'class': 'width10 text-center text-indent',
                sortable: true
            }, {
                key: 'designation',
                label: 'Designation',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'actions',
                label: 'Actions',
                'class': 'width15 text-center',
            }],
            busy: true,
            designationToBeEdit: null,
            tableTransition: adminPanelTableTransition
        }
    },
    components: {
        DesignationEdit
    },
    mounted() {
        this.getDesignations()
    },
    methods: {
        async getDesignations() {
            this.busy = true
            const response = await UserService.getDesignations()

            if (response) {
                this.busy = false
                this.designationToBeEdit = null
                this.designations = response.data.data
                this.totalRows = this.designations.length
            }
        },
        addDesignation() {
            this.designationToBeEdit = {
                id: null,
                designation: null,
            }
        },
        async deleteDesignation(designationId) {
            const response = await UserService.deleteDesignation(designationId)
            if (response) {
                this.$toasted.global.success({
                    message: 'Designation deleted successfully!!'
                })
                this.getDesignations()
            }
        }
    },
}
</script>

<style>

</style>

<template>
<div>
    <b-button class="add-button" v-b-modal.add-employee variant="primary">Add Employee</b-button>
    <!-- <b-button class="add-button" @click="showSearch = !showSearch"><i class="fas fa-search"></i></b-button> -->
    <div class="card">
        <div class="card-body">
            <b-row class="justify-content-end">
                <!-- <b-col lg="8" v-if="showSearch">
                    <b-form-group class="mb-0 text-center">
                        <b-form-checkbox-group v-model="filterOn" class="row px-3">
                            <b-form-checkbox class="col" value="id">ID</b-form-checkbox>
                            <b-form-checkbox class="col" value="firstName">Name</b-form-checkbox>
                            <b-form-checkbox class="col" value="designation">Designation</b-form-checkbox>
                            <b-form-checkbox class="col" value="gender">Gender</b-form-checkbox>
                            <b-form-checkbox class="col" value="contactNumber">Mobile</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-col> -->
                <b-col lg="4" class="float-right p-0">
                    <b-input-group>
                        <b-input-group-append>
                            <!-- <i @click="showSearch = !showSearch" style="cursor:pointer"><i class="fas fa-filter ml-2"></i></a> -->
                            <span class="input-group-text"><i class="fas fa-search ml-2"></i></span>
                        </b-input-group-append>
                        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search">
                        </b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>

            <b-table sort-by="id" :filter="filter" :filterIncludedFields="filterOn" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage" primary-key="id" sort-icon-left responsive striped hover :tbody-transition-props="tableTransition" :busy="busy" :items="usersList" :fields="tableFields">

                <template v-slot:cell(actions)="data">
                    <a @click="editUser(data.item.id)"><i class="far fa-edit"></i></a>
                    <a @click="deleteUser(data.item.id, data.index)"><i class="fas fa-trash"></i></a>
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
                    <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
                </b-col>
                <b-col sm="7" md="4" class="my-auto">
                    Showing {{perPage}} out of {{usersList.length}} records
                </b-col>
                <b-col sm="12" md="6">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" class="mt-1"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
    <AddEmployee @update="getUsers" />
</div>
</template>

<script>
import UserService from '@/services/user.service'
import {
    adminPanelTableTransition
} from '@/constants'
import AddEmployee from './EmployeeAddModal'
export default {
    components: {
        AddEmployee
    },
    data() {
        return {
            filter: null,
            filterOn: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 9,
            pageOptions: [5, 6, 7, 8, 9, 10, 15],
            tableTransition: adminPanelTableTransition,
            usersList: [],
            busy: true,
            showSearch: false,
            tableFields: [{
                key: 'id',
                label: '#',
                'class': 'text-center width10',
                sortable: true
            }, {
                label: 'Name',
                key: 'name',
                sortable: true
            }, {
                key: 'designation',
                sortable: true
            }, {
                key: 'gender',
                sortable: true
            }, {
                label: 'Mobile',
                key: 'contactNumber',
                sortable: true
            }, {
                lable: 'Actions',
                key: 'actions',
                'class': 'text-center',
            }]
        }
    },
    beforeMount() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            const response = await UserService.getUsersDetails()

            if (response) {
                this.busy = false
                this.usersList = []
                response.data.data.forEach(item => {
                    this.usersList.push({
                        id: item.id,
                        name: item.firstName + ' ' + item.lastName,
                        designation: item.designation && item.designation.designation || 'N/A',
                        gender: item.gender && item.gender.gender || 'N/A',
                        contactNumber: item.contactNumber || 'N/A'
                    })
                })
                this.totalRows = this.usersList.length
            }
        },
        editUser(userId) {
            this.$router.push({
                path: '/admin/listEmployees/' + userId
            })
        },
        async deleteUser(userId, index) {
            let confirm = false;
            await this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everthing.', {
                    title: 'Please Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    confirm = value
                })
            if (confirm) {

                const response = await UserService.deleteEmployee(userId)

                if (response) {
                    this.$toasted.global.success({
                        message: 'Employee Deleted Successfully!'
                    })
                    this.getUsers()
                }
                confirm = false
            }
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    }
}
</script>

<style>
</style>

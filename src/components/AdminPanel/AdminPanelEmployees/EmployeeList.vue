<template>
<!-- <div class="container-fluid">
    <div class="row">
        <div class="col-md-12"> -->
<!-- <b-button @click="busy = !busy">Toggle Busy State</b-button> -->
<div>
    <b-button class="add-button" v-b-modal.add-employee variant="primary">Add Employee</b-button>
    <div class="card">
        <div class="card-body">
            <b-table sort-by="id" primary-key="id" responsive striped hover :tbody-transition-props="tableTransition" :busy="busy" :items="usersList" :fields="tableFields">
                <template v-slot:cell(id)="data">
                    {{ data.item.id }}
                </template>

                <template v-slot:cell(firstName)="data">
                    {{ data.item.firstName  }}
                </template>

                <template v-slot:cell(designation)="data">
                    {{ data.item.designation && data.item.designation.designation || 'N/A'}}
                </template>

                <template v-slot:cell(gender)="data">
                    {{ data.item.gender && data.item.gender.gender || 'N/A'}}
                </template>

                <template v-slot:cell(contactNumber)="data">
                    {{ data.item.contactNumber || 'N/A'}}
                </template>

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
        </div>
    </div>
    <AddEmployee @update="getUsers" />
</div>

<!-- <table class="table table-striped table-responsive-sm table-hover table-fixed-layout">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in usersList" :key="index">
                        <td>
                            {{index + 1}}
                        </td>
                        <td>
                            {{user.firstName}} {{user.lastName}}
                        </td>
                        <td>
                            {{(user.designation === "" || user.designation === null) ? 'N/A' : user.designation}}
                        </td>
                        <td>
                            {{(user.gender === "" || user.gender === null) ? 'N/A' : user.gender.gender}}
                        </td>
                        <td>
                            {{(user.contactNumber === "" || user.contactNumber === null) ? 'N/A' : user.contactNumber}}
                        </td>
                        <td>
                            <a @click="editUser(user.id)"><i class="material-icons">edit</i></a>
                            <a @click="deleteUser(user.id)"><i class="material-icons">delete</i></a>
                        </td>
                    </tr>
                </tbody>
            </table> -->
<!-- </div>
    </div> -->
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
            tableTransition: adminPanelTableTransition,
            usersList: [],
            busy: true,
            tableFields: [{
                key: 'id',
                label: '#',
                'class': 'text-center width10 text-indent',
                sortable: true
            }, {
                label: 'Name',
                key: 'firstName',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'designation',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'gender',
                'class': 'text-indent',
                sortable: true
            }, {
                label: 'Mobile',
                key: 'contactNumber',
                'class': 'text-indent',
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
            console.log(response)
            if (!response || !response.data.success) {
                this.$toasted.global.error()
                this.$router.push({
                    path: '/admin/404'
                })
            } else {
                this.busy = false
                this.usersList = response.data.data
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
                console.log(userId)
                const response = await UserService.deleteEmployee(userId)
                console.log(response)
                if (response) {
                    this.$toasted.global.success({
                        message: 'Employee Deleted Successfully!'
                    })
                    this.getUsers()
                }
                confirm = false
            }
        },

        addNewEmployee() {

        }
    }
}
</script>

<style>
/* .table-fixed-layout {
    table-layout: fixed;
    width: 100%;
    white-space: nowrap;
}

.table-fixed-layout td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.row-id {
    width: 5%
}

.row-name {
    width: 30%
}

.row-designation {
    width: 30%
}

.row-gender {
    width: 10%
}

.row-contact-number {
    width: 15%
}

.row-actions {
    width: 10%
} */
</style>

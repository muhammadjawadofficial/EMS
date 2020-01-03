<template>
<b-modal id="add-employee" title="Add Employee" hide-footer>
    <template v-slot:default>
        <b-form @submit.prevent="onSubmit">
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>First Name</label>
                        <input v-model="form.firstName" type="text" class="form-control"  placeholder="Enter First Name" required>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Last Name</label>
                        <input v-model="form.lastName" type="text" class="form-control" placeholder="Enter Last Name" required>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Email</label>
                        <input v-model="form.email" type="text" class="form-control" placeholder="Enter Email" autocomplete="username" required>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="form.password" type="password" class="form-control" placeholder="Enter Password" autocomplete="current-password" required>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Role</label>
                        <select v-model="form.isAdmin" class="custom-select" required>
                            <option selected value=0>Employee</option>
                            <option selected value=1>Admin</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Designation</label>
                        <select v-model="form.designationId" class="custom-select">
                            <option disabled selected value=''>Please select one</option>
                            <option v-for="designation in availableDesignations" :key="designation.id" :value="designation.id">{{designation.designation}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button @click="$bvModal.hide('add-employee')" variant="danger">Cancel</b-button>
        </b-form>
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import {
    basicInfo
} from '@/constants'
export default {
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                designationId: '',
                isAdmin: '0',
            },
            availableDesignations: []
        }
    },
    mounted() {
        this.getDesignations()
    },
    methods: {
        async getDesignations(){
            const response = await UserService.getDesignations()

            this.availableDesignations = response.data.data
        },
        async onSubmit() {
            const response = await UserService.registerEmployee(this.form)

            if(response){
                this.$toasted.global.success({message: 'Employee Successfully Created'})
                this.form.firstName = ''
                this.form.lastName = ''
                this.form.email = ''
                this.form.password = ''
                this.form.designationId = ''
                this.$bvModal.hide('add-employee')
                this.$emit('update')
            }
        },
    },
}
</script>

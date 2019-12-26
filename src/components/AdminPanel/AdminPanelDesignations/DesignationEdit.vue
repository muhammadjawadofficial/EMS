<template>
<form @submit.prevent="updateDesignation" class="col-md-5 text-center m-auto">
    <div class="form-group">
        <h4 v-if="designation.id">Edit Designation</h4>
        <h4 v-else>Add Designation</h4>
        <input type="text" class="form-control" v-model="designationToBeEdit.designation" required>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <button @click="$emit('canceled')" class="btn btn-secondary">Cancel</button>

</form>
</template>

<script>
import UserService from '@/services/user.service'
import {
    designation
} from '@/constants'
export default {
    props: ['designation'],
    data() {
        return {
            designationToBeEdit: designation.set(this.designation)
        }
    },
    methods: {
        async updateDesignation() {
            console.log(this.designation)
            var response = null
            if (this.designation.id)
                response = await UserService.updateDesignation(this.designationToBeEdit.id, this.designationToBeEdit.designation)
            else
                response = await UserService.addDesignation(this.designationToBeEdit.designation)
            if (response) {
                console.log(response)
                this.$emit('update')
            }
        }
    },
    watch: {
        designation() {
            this.designationToBeEdit = designation.set(this.designation)
        }
    }
}
</script>

<style>

</style>

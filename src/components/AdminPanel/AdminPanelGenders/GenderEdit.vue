<template>
<form @submit.prevent="updateGender" class="col-md-5 text-center m-auto">
    <div class="form-group">
        <h4 v-if="gender.id">Edit Gender</h4>
        <h4 v-else>Add Gender</h4>
        <input type="text" class="form-control" v-model="genderToBeEdit.gender" required>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <button @click="$emit('canceled')" class="btn btn-secondary">Cancel</button>

</form>
</template>

<script>
import UserService from '@/services/user.service'
import {
    gender
} from '@/constants'
export default {
    props: ['gender'],
    data() {
        return {
            genderToBeEdit: gender.set(this.gender)
        }
    },
    methods: {
        async updateGender() {
            var response = null
            if (this.gender.id)
                response = await UserService.updateGender(this.genderToBeEdit.gender, this.genderToBeEdit.id)
            else
                response = await UserService.addGender(this.genderToBeEdit.gender)
            if (response) {
                console.log(response)
                this.$emit('update')
            }
        }
    },
    watch: {
        gender() {
            this.genderToBeEdit = gender.set(this.gender)
        }
    }
}
</script>

<style>

</style>

<template>
<div :class="styleAdmin? 'card' : ''">
    <div :class="styleAdmin? 'card-body' : ''">
        <form @submit.prevent="$emit('return', newExperience, isCurrentlyWorking, experienceId)">
            <legend v-if="degreeName">{{degreeName}}</legend>
            <div class="row">
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label>Company Name</label>
                        <input v-model="newExperience.company" type="text" class="form-control" placeholder="Enter Institute name" required>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label>Designation</label>
                        <input v-model="newExperience.designation" type="text" class="form-control" placeholder="Enter your Designation" required>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label>Start Year</label>
                        <input v-model="newExperience.startYear" type="date" class="form-control" required>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                    <div class="form-group">
                        <label>End Year</label>
                        <input v-if="isCurrentlyWorking" disabled type="text" :value="(new Date()).toLocaleDateString()" class="form-control">
                        <input v-else v-model="newExperience.endYear" type="date" class="form-control" required>
                        
                        <input type="checkbox" v-model="isCurrentlyWorking">
                        <label>Currently Working</label>
                    </div>
                </div>
                <div :class="styleAdmin ? 'col-12' : 'col-md-12'">
                    <div class="form-group">
                        <label>Job Description</label>
                        <textarea v-model="newExperience.jobDescription" rows="3" class="form-control" placeholder="Enter your Job Responsibilities"></textarea>
                    </div>
                </div>
            </div>
            <div :class="styleAdmin? 'add-button': 'modal-footer'">
                <button v-if="styleAdmin" @click.prevent="$emit('delete')" class="btn btn-danger">Delete</button>
                <button v-if="experience.company" type="submit" class="btn btn-primary">Update</button>
                <button v-else type="submit" class="btn btn-primary">Save</button>
                <!-- <button v-else type="submit" class="btn btn-primary">Update</button> -->
            </div>
        </form>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import {
    experience
} from '@/constants'
export default {
    props: ['experience', 'degreeName', 'styleAs', 'experienceId'],
    data() {
        return {
            newExperience: experience.get(),
            styleAdmin: this.styleAs == 'admin' ? true : false,
            isCurrentlyWorking: false
        }
    },
    mounted() {
        if (this.experience.company) {
            this.newExperience = experience.set(this.experience)
            if (this.newExperience.endYear == this.newExperience.startYear) {
                this.isCurrentlyWorking = true
            }
        }
    },
}
</script>

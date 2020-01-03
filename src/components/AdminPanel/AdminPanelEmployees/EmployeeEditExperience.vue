<template>
<div>
    <div class="add-button">
        <!-- <button class="btn btn-primary float-right">Add experience</button> -->
        <b-button class="float-right" @click="$bvModal.show('add-experience')" variant="primary"><i class="fas fa-plus"></i> Add experience</b-button>
    </div>
    <div class="card" v-if="experiences.length == 0">
        <div class="card-body">
            <h3>No work experience found against this employee</h3>
        </div>
    </div>
    <div v-for="(experience, index) in experiences" :key="index">
        <TheExperienceForm :experience="experience" styleAs="admin" :experienceId="experience.id" @return="editExperience" @delete="deleteExperience(index)" />
    </div>
    <ProfileExperienceAddModal @update="$emit('update')" />
</div>
</template>

<script>
import TheExperienceForm from '@/components/common/TheExperienceForm'
import ProfileExperienceAddModal from '@/components/Profile/ProfileExperience/ProfileExperienceAddModal'
import UserService from '@/services/user.service'
export default {
    props: ['experiences'],
    components: {
        TheExperienceForm,
        ProfileExperienceAddModal
    },
    methods: {
        async editExperience(experience, empExperienceId) {
            const response = await UserService.editEmployeeExperience(experience, this.$route.params.id, empExperienceId)
            if (response) {
                this.$emit('update')
            }
        },
        async deleteExperience(experienceIndex) {
            const response = await UserService.deleteEmployeeExperience(this.$route.params.id, this.experiences[experienceIndex].id)
            if (response)
                this.$emit('update')
        }
    },
    mounted() {


    },
}
</script>
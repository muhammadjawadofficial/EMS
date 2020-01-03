<template>
<b-modal id="edit-experience" title="Edit Experience" hide-footer>
    <template v-slot:default>
        <TheExperienceForm v-if="editExperienceIndex != null" :experience="computedExperience" @return="editExperience" />
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import TheExperienceForm from '@/components/common/TheExperienceForm'
import {
    experience
} from '@/constants'
export default {
    data() {
        return {
            newExperience: experience.get()
        }
    },
    props: ['userData', 'editExperienceIndex'],
    components: {
        TheExperienceForm
    },
    methods: {
        async editExperience(experience, currentlyWorking) {
            if(currentlyWorking){
                doconsole('null endyear')
                experience.endYear = experience.startYear
            }
            const response = await UserService.editEmployeeExperience(experience, this.$route.query.id, this.userData.empWorkExperiences[this.editExperienceIndex].id)
            if (response) {
                this.$emit('update')
                this.$bvModal.hide('edit-experience')
            }
        },
    },
    computed: {
        computedExperience: function () {
            return experience.set(this.userData.empWorkExperiences[this.editExperienceIndex])
        }
    },
}
</script>

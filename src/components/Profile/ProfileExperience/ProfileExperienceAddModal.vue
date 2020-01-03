<template>
<b-modal id="add-experience" title="Add Experience" hide-footer>
    <template v-slot:default>
        <TheExperienceForm :experience="newExperience" @return="addExperience" />
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import {
    TokenService
} from '@/services/storage.service'
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
    components: {
        TheExperienceForm
    },
    methods: {
        async addExperience(experience, currentlyWorking) {
            if(currentlyWorking){
                doconsole('null endyear')
                experience.endYear = experience.startYear
            }

            let userId = this.$route.params.id ? this.$route.params.id : this.$route.query.id

            const response = await UserService.addEmployeeExperience(experience, userId)
            if (response) {

                this.$emit('update')
                this.$bvModal.hide('add-experience')
            }
        }
    },
}
</script>

<template>
<b-modal id="add-education" title="Add Education" hide-footer>
    <template v-slot:default>
        <TheDegreeForm :education="newEducation" @return="addEducation" />
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import {
    TokenService
} from '@/services/storage.service'
import TheDegreeForm from '@/components/common/TheDegreeForm'
import {
    education
} from '@/constants'
export default {
    data() {
        return {
            newEducation: education.get()
        }
    },
    components: {
        TheDegreeForm
    },
    methods: {
        async addEducation(education) {
            const response = await UserService.addEducation(education, TokenService.getCurrentEmployeeId())
            if (response) {
                console.log(response)
                this.$emit('update')
                this.$bvModal.hide('add-education')
            }
        }
    },
}
</script>

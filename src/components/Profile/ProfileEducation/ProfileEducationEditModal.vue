<template>
<b-modal id="edit-education" title="Edit Education" hide-footer>
    <template v-slot:default>
        <TheDegreeForm v-if="editEducationIndex != null" :education="education" @return="editEducation" />
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
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
    props: ['userData', 'editEducationIndex'],
    components: {
        TheDegreeForm
    },
    methods: {
        async editEducation(education) {


            const response = await UserService.editEducation(education, this.$route.query.id, this.userData.degrees[this.editEducationIndex].empDegree.id)
            if (response) {
                this.$emit('update')
                this.$bvModal.hide('edit-education')
            }
        },
    },
    computed: {
        education: function () {
            return education.set(this.userData.degrees[this.editEducationIndex])
            // {
            //     instituteName: this.userData.degrees[this.editEducationIndex].empDegree.instituteName,
            //     cgpa: this.userData.degrees[this.editEducationIndex].empDegree.cgpa,
            //     percentage: this.userData.degrees[this.editEducationIndex].empDegree.percentage,
            //     degreeLevelId: this.userData.degrees[this.editEducationIndex].degreeLevel.id,
            //     degreeId: this.userData.degrees[this.editEducationIndex].id,
            //     startYear: this.userData.degrees[this.editEducationIndex].empDegree.startYear,
            //     endYear: this.userData.degrees[this.editEducationIndex].empDegree.endYear
            // }
        }
    },
}
</script>

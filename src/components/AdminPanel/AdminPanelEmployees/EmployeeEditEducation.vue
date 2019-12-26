<template>
<div>
    <!-- {{printindex("Matric")}} -->
    <!-- <button @click="flag = !flag">show</button> -->
    <div v-for="degreeLevel in selectDegreeLevels" :key="degreeLevel.id">
        <TheDegreeForm :degreeIndex="printindex(degreeLevel.degreeLevel)" :degreeName="degreeLevel.degreeLevel" :degreeId="degreeLevel.id" :education="getSingleDegree(printindex(degreeLevel.degreeLevel))" styleAs="admin" @return="updateInfo" @delete="deleteEducation" />
        <!-- <EmployeeEditEducationForm :degree="degrees[printindex(degreeLevel.degreeLevel)]" :degreeIndex="printindex(degreeLevel.degreeLevel)" :degreeName="degreeLevel.degreeLevel" :degreeId="degreeLevel.id" @update="passToParent" /> -->
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
// import EmployeeEditEducationForm from './EmployeeEditEducationForm'
import TheDegreeForm from '@/components/common/TheDegreeForm'
import {
    education
} from '@/constants'
export default {
    props: ['degrees'],
    data() {
        return {
            selectDegreeLevels: [],
            // flag: false
        }
    },
    components: {
        // EmployeeEditEducationForm,
        TheDegreeForm
    },
    mounted() {
        this.getDegreeLevels()
    },
    methods: {
        async getDegreeLevels() {
            const response = await UserService.getDegreeLevels();
            console.log(response)
            this.selectDegreeLevels = response.data.data
        },
        printindex(degreeLevel) {
            var indexOf = -1;
            this.degrees.forEach((element, index) => {
                if (element.degreeLevel.degreeLevel === degreeLevel) {
                    indexOf = index
                    return indexOf
                }
            });
            // console.log(indexOf)
            return indexOf
        },
        passToParent(event) {
            this.$emit('update', event)
        },
        getSingleDegree(x) {
            // console.log(this.degrees[x])
            if (this.degrees[x])
                return education.set(this.degrees[x])
            return education.get()

        },
        async updateInfo(updatedEducation, index, empDegreeId) {
            var response = null
            if (index < 0) {
                console.log(updatedEducation)
                response = await UserService.addEducation(updatedEducation, this.$route.params.id)
            } else {
                response = await UserService.editEducation(updatedEducation, this.$route.params.id, this.degrees[index].empDegree.id)
            }
            if (response)
                this.$emit('update', this.$route.params.id)
        },
        async deleteEducation(degreeIndex) {
            console.log(this.degrees[degreeIndex])
            const response = await UserService.deleteEducation(this.$route.params.id, this.degrees[degreeIndex].empDegree.id)
            if (response)
                this.$emit('update', this.$route.params.id)
        }
    },
    // computed: {
    //     getSingleDegree: function (x) {
    //         return education.get(this.degrees[x])

    //     }

    // },
}
</script>

<style>

</style>

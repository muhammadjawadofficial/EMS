<template>
<b-modal id="edit-skills" title="Edit Skills" hide-footer>
    <template v-slot:default>
        <multiselect v-model="selectedSkills" track-by="skill" label="skill" :options="availableSkills" :multiple="true" :clear-on-select="true" :close-on-select="false">
        </multiselect>
        <div class="modal-footer">
            <button class="btn btn-primary" @click="editSkills">Submit</button>
        </div>
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import Multiselect from 'vue-multiselect'

export default {
    data() {
        return {
            selectedSkills: this.skills,
            availableSkills: null,
        }
    },
    props: ['skills'],
    components: {
        Multiselect
    },
    methods: {
        customLabel(option) {
            return `${option.skill}`
        },
        async editSkills() {
            let newSkills = {
                skillId: []
            }
            this.selectedSkills.forEach(skill => {
                newSkills.skillId.push(skill.id)
            })
            var employeeID = null
            this.$route.query.id ? employeeID = this.$route.query.id : employeeID = this.$route.params.id;
            const response = await UserService.editSkills(newSkills, employeeID)
            if (response) {
                this.$emit('update')
                this.$bvModal.hide('edit-skills')
            }
        },
        async getSkills() {
            const response = await UserService.getSkills();
            this.availableSkills = response.data.data
        }
    },
    mounted() {
        this.getSkills()
    },
}
</script>

<style>
@import url('vue-multiselect/dist/vue-multiselect.min.css');

.profile-skill {
    border: 2px solid;
    padding: 2px 8px;
    border-radius: 9px;
    text-decoration: none;
    margin: 4px;
}
</style>

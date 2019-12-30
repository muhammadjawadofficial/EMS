<template>
<form @submit.prevent="updateSkill" class="col-md-5 text-center m-auto">
    <div class="form-group">
        <h4 v-if="this.skill.id">Edit Skill</h4>
        <h4 v-else>Add Skill</h4>
        <input type="text" class="form-control" v-model="skillToBeEdit.skill" required>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <button @click="$emit('canceled')" class="btn btn-secondary">Cancel</button>

</form>
</template>

<script>
import UserService from '@/services/user.service'
import {
    skill
} from '@/constants'
export default {
    props: ['skill'],
    data() {
        return {
            skillToBeEdit: skill.set(this.skill)
        }
    },
    methods: {
        async updateSkill() {
            var response;
            if (this.skill.id)
                response = await UserService.updateSkill(this.skillToBeEdit.skill, this.skillToBeEdit.id)
            else
                response = await UserService.addSkillAdmin(this.skillToBeEdit.skill)
            if (response) {
                doconsole(response)
                this.$emit('update')
            }
        }
    },
    watch: {
        skill() {
            this.skillToBeEdit = skill.set(this.skill)
        }
    }
}
</script>

<style>

</style>

<template>
<div>
    <div class="add-button">
        <b-button class="float-right" @click="$bvModal.show('edit-skills')" variant="primary"><i class="far fa-edit"></i> Skills</b-button>
    </div>
    
    <div class="card">
        <div class="card-body">
            <b-table  v-if="skills.length" striped hover :items="skills" :fields="fields"></b-table>
            <h3 v-else>No skills found against this employee</h3>
        </div>
    </div>

    <ProfileSkillsEditModal :skills="skills" @update="$emit('update')" />
    <!-- <table class="table table-striped table-responsive-sm table-hover table-fixed-layout">
        <thead>
            <tr>
                <th class="text-center">#</th>
                <th>Skill Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(skill, index) in skills" :key="skill.id">
                <td class="text-center">
                    {{index+1}}
                </td>
                <td>
                    {{skill.skill}}
                </td>
            </tr>
        </tbody>
    </table> -->
</div>
</template>

<script>
import ProfileSkillsEditModal from '@/components/Profile/ProfileSkills/ProfileSkillsEditModal'
import UserService from '@/services/user.service'
export default {
    props: ['skills'],
    data() {
        return {
            fields: [{
                    key: 'id',
                    sortable: true,
                    'class':'text-indent'
                },
                {
                    key: 'skill',
                    sortable: true,
                    'class':'text-indent'
                },
            ]
        }
    },
    components: {
        ProfileSkillsEditModal
    },
}
</script>
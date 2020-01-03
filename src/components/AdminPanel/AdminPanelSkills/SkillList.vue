<template>
<div>
    <b-button class="add-button" @click="addSkill('new')" variant="primary">Add Skill</b-button>
    <div class="card">
        <div class="card-body">
            <b-table sort-by="id" primary-key="id" :current-page="currentPage" :per-page="perPage" :tbody-transition-props="tableTransition" sort-icon-left responsive striped hover :busy="busy" :items="availableSkills" :fields="tableSkillFields">
                <template v-slot:cell(actions)="data">
                    <a @click="skillToBeEdit = data.item"><i class="far fa-edit"></i></a>
                    <a @click="deleteSkill(data.item.id)"><i class="fas fa-trash"></i></a>
                </template>

                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
            </b-table>
            <b-row>
                <b-col sm="5" md="2" class="my-auto">
                    <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions" @change="getSkills"></b-form-select>
                </b-col>
                <b-col sm="7" md="4" class="my-auto">
                    Showing {{perPage}} out of {{totalRows}} records
                </b-col>
                <b-col sm="12" md="6">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" class="mt-1"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
    <div class="card" v-if="skillToBeEdit">
        <div class="card-body">
            <SkillEdit :skill="skillToBeEdit" @update="getSkills" @canceled="skillToBeEdit=null" />
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import SkillEdit from './SkillEdit'
import {
    adminPanelTableTransition
} from '@/constants'
import {
    skill
} from '@/constants'
export default {
    data() {
        return {
            availableSkills: null,
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [5, 6, 7, 8, 9, 10, 15],
            tableSkillFields: [{
                key: 'id',
                label: '#',
                'class': 'width10 text-center text-indent',
                sortable: true
            }, {
                key: 'skill',
                label: 'Skill Name',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'actions',
                label: 'Actions',
                'class': 'width15 text-center',
            }],
            busy: true,
            skillToBeEdit: null,
            tableTransition: adminPanelTableTransition
        }
    },
    components: {
        SkillEdit
    },
    methods: {
        async getSkills() {
            this.busy = true
            const response = await UserService.getSkills()

            if (response) {
                this.availableSkills = response.data.data
                this.busy = false
                this.totalRows = this.availableSkills.length
            }
            this.skillToBeEdit = null;
        },
        addSkill() {
            this.skillToBeEdit = skill.get()
        },
        async deleteSkill(skillId) {

            const response = await UserService.deleteSkill(skillId)
            if (response) {
                this.$toasted.global.success({
                    message: 'Skill Deleted Successfully'
                })
                this.getSkills()
            }
        }
    },
    mounted() {
        this.getSkills()
    },
}
</script>

<style>
</style>

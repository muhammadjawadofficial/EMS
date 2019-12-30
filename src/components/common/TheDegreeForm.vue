<template>
<div :class="styleAdmin? 'card' : ''">
    <div @click="checkNewDegree = false" :class="checkNewDegree ? 'newEducation':''">
        <div :class="styleAdmin? 'card-body' : ''">
            <form @reset.prevent="checkNewDegree=true" @submit.prevent="$emit('return', newEducation, degreeIndex)">
                <legend v-if="degreeName">{{degreeName}}</legend>
                <div class="row">
                    <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                        <div class="form-group">
                            <label>Degree Level</label>
                            <input v-if="degreeId" type="text" :value="degreeName" disabled class="form-control">
                            <select v-else v-model="newEducation.degreeLevelId" @change="getDegreeTypes(newEducation.degreeLevelId), newEducation.degreeId = ''" class="custom-select" required>
                                <option disabled selected value="">Please select one</option>
                                <option v-for="degreeLevel in selectDegreeLevels" :key="degreeLevel.id" :value="degreeLevel.id">{{degreeLevel.degreeLevel}}</option>
                            </select>
                        </div>
                    </div>
                    <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                        <div class="form-group">
                            <label>Degree Name</label>
                            <select v-model="newEducation.degreeId" class="custom-select" required>
                                <option disabled selected value="">Please select one</option>
                                <option v-for="degreeType in selectDegreeTypes" :key="degreeType.id" :value="degreeType.id">{{degreeType.degreeName}}</option>
                            </select>
                        </div>
                    </div>
                    <div :class="styleAdmin ? 'col-md-6 col-sm-12' : 'col-12'">
                        <div class="form-group">
                            <label>Institute Name</label>
                            <input v-model="newEducation.instituteName" type="text" class="form-control" placeholder="Enter Institute name" required>
                        </div>
                    </div>
                    <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                        <div class="form-group">
                            <label>Start Year</label>
                            <input v-model="newEducation.startYear" type="date" class="form-control" required>
                        </div>
                    </div>
                    <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                        <div class="form-group">
                            <label>End Year</label>
                            <input v-model="newEducation.endYear" type="date" class="form-control" required>
                        </div>
                    </div>
                    <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                        <div class="form-group">
                            <label>CGPA</label>
                            <input v-model="newEducation.cgpa" type="number" class="form-control" min="0" max="4" step="any" placeholder="Enter CGPA out of 4" required>
                        </div>
                    </div>
                    <div :class="styleAdmin ? 'col-md-3 col-sm-6' : 'col-md-6'">
                        <div class="form-group">
                            <label>Percentage</label>
                            <input v-model="newEducation.percentage" type="number" class="form-control" min="0" max="100" placeholder="Enter Percentage" required>
                        </div>
                    </div>
                </div>
                <div :class="styleAdmin? 'add-button': 'modal-footer'">
                    <button type="reset" v-if="degreeIndex<0 && styleAdmin" class="btn">Cancel</button>
                    <button type="reset"  @click.prevent="$emit('delete', degreeIndex)" v-if="degreeIndex>=0 && styleAdmin" class="btn btn-danger">Delete</button>
                    <button v-if="degreeIndex<0" type="submit" class="btn btn-primary">Save</button>
                    <button v-else type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>
    <p class="newEducationText" @click="checkNewDegree = false" v-if="checkNewDegree">Click to add {{degreeName}} record</p>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import {
    education
} from '@/constants'
export default {
    props: ['education', 'styleAs', 'degreeName', 'degreeId', 'degreeIndex'],
    data() {
        return {
            newEducation: education.set(this.education),
            selectDegreeLevels: null,
            selectDegreeTypes: null,
            styleAdmin: this.styleAs == 'admin' ? true : false,
            checkNewDegree: this.degreeIndex < 0,
        }
    },
    methods: {
        async getDegreeLevels() {
            const response = await UserService.getDegreeLevels()
            response ? this.selectDegreeLevels = response.data.data : ''
        },
        async getDegreeTypes(degreeLevelId) {
            const response = await UserService.getDegreeTypes(degreeLevelId)
            response ? this.selectDegreeTypes = response.data.data.degrees : ''
        },
    },
    mounted() {
        this.getDegreeLevels();
        doconsole(this.newEducation)
        this.degreeId ? this.newEducation.degreeLevelId = this.degreeId : ''
        this.newEducation.degreeLevelId ? this.getDegreeTypes(this.newEducation.degreeLevelId) : ''
    },
}
</script>

<style>
.newEducation {
    filter: blur(2px);
}

.newEducationText {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    cursor: pointer;
    font-size: 5vh;
    line-height: 7vh;
    text-align: center;
}
</style>

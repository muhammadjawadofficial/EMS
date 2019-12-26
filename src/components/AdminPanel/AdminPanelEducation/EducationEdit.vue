<template>
<div>
    <form @submit.prevent="updateEducation()">
        <fieldset>
            <legend>{{formLegend}}</legend>
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label>DegreeLevel</label>
                            <div class="d-flex">
                                <input type="text" class="form-control col-md-10" v-model="educationDetails.degreeLevel" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Degrees</label>
                            <div class="row">
                                <div class="col-md-6 col-sm-6" v-for="(degree, index) in educationDetails.degrees" :key="index">
                                    <div class="d-flex">
                                        <input type="text" class="col-8 form-control mt-1" v-model="educationDetails.degrees[index].degreeName">
                                        <div class="col-4 px-0 mt-2">
                                            <a @click="deleteDegree(index)"><i class="fas fa-minus-circle custom-icon"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                    <div class="col-md-4 add-degree-section">
                        <div class="card">
                            <div style="text-align: center;margin-top: 20px;">
                                <a class="card-link" data-toggle="collapse" href="#card-element-747447">Add Degree</a>
                                <hr>
                            </div>
                            <div id="card-element-747447" class="collapse">
                                <div class="card-body">
                                    <form @submit.prevent="addADegree()">
                                        <label>Enter Degree</label>
                                        <div class="d-flex flex-row">
                                            <input type="text" placeholder="Degree Name" class="form-control col-10" v-model="newDegree" required>
                                            <button class="" type="submit"><i class="far fa-save custom-icon"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
</div>
</template>

<script>
import UserService from '@/services/user.service'
export default {
    data() {
        return {
            formLegend: '',
            educationDetails: {
                degreeLevel: '',
                degrees: []
            },
            newDegree: '',
            showNewDegreeInput: true,
            isNewDegree: this.$route.params.id == 'new'
        }
    },
    mounted() {
        if (!this.isNewDegree)
            this.getDegreeDetails()
    },
    methods: {
        async getDegreeDetails() {
            const response = await UserService.getDegreeDetails(this.$route.params.id)
            if (!response || !response.data.success) {
                this.$toasted.global.error()
            } else {
                this.educationDetails = response.data.data
                this.formLegend = this.educationDetails.degreeLevel
            }
        },
        addDegree(x) {
            // console.log(x)
            this.educationDetails.degrees.push({
                degreeName: x
            })
            console.log(this.educationDetails)
        },
        async addADegree() {
            if (this.isNewDegree) {
                this.addDegree(this.newDegree)
                this.newDegree = ''
            } else {
                const degreeObject = {
                    levelId: this.educationDetails.id,
                    degreeName: this.newDegree
                }
                console.log(degreeObject)
                const response = await UserService.addADegreeToExistingLevel(degreeObject)
                if (response) {
                    this.$toasted.global.success()
                    this.newDegree = ''
                    this.getDegreeDetails()
                }
            }
        },
        async updateEducation() {
            if (this.isNewDegree) {
                if(this.educationDetails.degrees.length < 1){
                    this.$toasted.global.error({message: 'Please add atleast one degree against "' + this.educationDetails.degreeLevel + '"'})
                    return;
                }
                var newDegrees = {
                    level: this.educationDetails.degreeLevel,
                    degrees: []
                }
                this.educationDetails.degrees.forEach(degree => {
                    newDegrees.degrees.push(degree.degreeName)
                })
                console.log(newDegrees)
                const response = await UserService.addDegreesWithLevel(newDegrees)
                console.log(response)
                if (response) {
                    this.$toasted.global.success({
                        message: 'Degree added Successfully!'
                    })
                    this.$router.push({
                        path: 'admin/listEducation'
                    })
                }
            } else {
                const response = await UserService.updateDegree(this.educationDetails)
                if (response)
                    this.getDegreeDetails()
                console.log(response)
            }
        },

        deleteDegree(index) {
            // console.log(this.educationDetails)
            this.educationDetails.degrees.splice(index, 1);
            // console.log(x)
        }
    }
}
</script>

<style scoped>
.custom-icon {
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
}

fieldset {
    border: 1px solid #999;
    border-radius: 8px;
    box-shadow: rgb(230, 153, 153) 1px 1px 10px 0px;
    padding: 15px;
    margin-top: 15px;
}

@media (min-width: 768px) {
    .add-degree-section {
        border-left: 2px solid #f4d0d0;
    }
}

@media (max-width: 767px) {
    .add-degree-section {
        border-top: 2px solid #f4d0d0;
        margin-top: 20px;
        padding-top: 15px;
    }
}
</style>

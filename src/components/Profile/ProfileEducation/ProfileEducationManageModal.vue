<template>
<div class="modal fade" id="manage-education" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Manage Educations</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="row form-group" v-for="(education, index) in userData.qualifications" :key="index">
                    <div class="col-md-6">
                        <input v-model="userData.qualifications[index].degreeName" type="text" class="form-control" :placeholder="education.degreeName">
                    </div>
                    <div class="col-md-6 mt-1">
                        <button @click="moveUp(index)" class="btn btn-primary mr-1"><i class="fas fa-chevron-up"></i></button>
                        <button @click="moveDown(index)" class="btn btn-primary mr-1"><i class="fas fa-chevron-down"></i></button>
                        <button @click="deleteEducation(index)" class="btn btn-danger"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button @click.prevent="editEducation()" class="btn btn-primary">Save</button>
                <!-- <button @click.prevent="hide()" class="btn btn-secondary">Close</button> -->
                <button @click.prevent="addEducation()" class="btn btn-warning"><i class="fas fa-plus"></i></button>
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
            </div>
        </div>
    </div>
</div>
<!-- <modal name="manage-education" class="mt-5" style="color:black;" height="auto" width="60%" resizeable scrollable>
    <div class="p-3">
        <h2> Manage Educations </h2>
        <div class="row form-group" v-for="(education, index) in userData.qualifications" :key="index">
            <div class="col-md-6">
                <input v-model="userData.qualifications[index].degreeName" type="text" class="form-control" :placeholder="education.degreeName">
            </div>
            <div class="col-md-6 mt-1">
            <button @click="moveUp(index)" class="btn btn-primary mr-1"><i class="fas fa-chevron-up"></i></button>
            <button @click="moveDown(index)" class="btn btn-primary mr-1"><i class="fas fa-chevron-down"></i></button>
            <button @click="deleteEducation(index)" class="btn btn-danger"><i class="fas fa-times"></i></button>
            </div>
        </div>
        <button @click.prevent="editEducation()" class="btn btn-primary">Save</button>
        <button @click.prevent="hide()" class="btn btn-secondary">Close</button>
        <button @click.prevent="addEducation()" class="btn btn-warning"><i class="fas fa-plus"></i></button>
    </div>
</modal> -->
</template>

<script>
import UserService from '@/services/user.service'
export default {
    props: ['userData'],
    methods: {
        // hide() {
        //     this.$modal.hide('manage-education')
        // },
        deleteEducation(index) {
            this.userData.qualifications.splice(index, 1)
        },
        async editEducation() {
            const updatedInfo = {
                qualifications: this.userData.qualifications
            }
            const response = await UserService.editProfile(updatedInfo, this.$route.query.id)
            doconsole(response)
            // if (response.status == 200) {
            //     // this.status = '* Record Updated Successfully'
            //     doconsole('success')
            // } else {
            //     // this.status = '* Something Went Wrong'
            //     doconsole('error')
            // }
            // doconsole(this.userData)
            // this.hide()
        },
        addEducation() {
            this.userData.qualifications.push({
                degreeName: null
            })
        },
        moveUp(index) {
            if (index != 0) {
                this.moveRecords(index - 1, index)
            }
        },
        moveDown(index) {
            if (index != this.userData.qualifications.length - 1) {
                this.moveRecords(index + 1, index)
            }
        },
        moveRecords(to, from) {
            var temp = {
                degreeName: '',
                instituteName: '',
                yearOfPassing: '',
                cgpa: '',
                percentage: ''
            }

            temp.degreeName = this.userData.qualifications[to].degreeName
            temp.instituteName = this.userData.qualifications[to].instituteName
            temp.yearOfPassing = this.userData.qualifications[to].yearOfPassing
            temp.cgpa = this.userData.qualifications[to].cgpa
            temp.percentage = this.userData.qualifications[to].percentage

            this.userData.qualifications[to].degreeName = this.userData.qualifications[from].degreeName
            this.userData.qualifications[to].instituteName = this.userData.qualifications[from].instituteName
            this.userData.qualifications[to].yearOfPassing = this.userData.qualifications[from].yearOfPassing
            this.userData.qualifications[to].cgpa = this.userData.qualifications[from].cgpa
            this.userData.qualifications[to].percentage = this.userData.qualifications[from].percentage

            this.userData.qualifications[from].degreeName = temp.degreeName
            this.userData.qualifications[from].instituteName = temp.instituteName
            this.userData.qualifications[from].yearOfPassing = temp.yearOfPassing
            this.userData.qualifications[from].cgpa = temp.cgpa
            this.userData.qualifications[from].percentage = temp.percentage
        }
    }
}
</script>

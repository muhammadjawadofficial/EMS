<template>
<div class="modal fade" id="manage-certifications" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Manage Certifications</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="row form-group" v-for="(certification, index) in userData.certifications" :key="index">
                    <div class="col-md-6">
                        <input v-model="certification.certification" type="text" class="form-control" :placeholder="certification.name">
                    </div>
                    <div class="col-md-6 mt-1">
                        <button @click="moveUp(index)" class="btn btn-primary mr-1"><i class="fas fa-chevron-up"></i></button>
                        <button @click="moveDown(index)" class="btn btn-primary mr-1"><i class="fas fa-chevron-down"></i></button>
                        <button @click="deleteCertification(index)" class="btn btn-danger"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button @click.prevent="editCertification()" class="btn btn-primary">Save</button>
                <!-- <button @click.prevent="hide()" class="btn btn-secondary">Close</button> -->
                <button @click.prevent="addCertification()" class="btn btn-warning"><i class="fas fa-plus"></i></button>
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
export default {
    props: ['userData'],
    methods: {
        async editCertification() {
            const updatedInfo = {
                certifications: this.userData.certifications
            }
            const response = await UserService.editProfile(updatedInfo, this.$route.query.id)

            // if (response.status == 200) {
            //     // this.status = '* Record Updated Successfully'

            // } else {
            //     // this.status = '* Something Went Wrong'

            // }

            // this.hide()
        },
        deleteCertification(index) {
            this.userData.certifications.splice(index, 1)
        },
        addCertification() {
            this.userData.certifications.push({
                name: null
            })
        },
        moveUp(index) {
            if (index != 0) {
                this.moveRecords(index - 1, index)
            }
        },
        moveDown(index) {
            if (index != this.userData.certifications.length - 1) {
                this.moveRecords(index + 1, index)
            }
        },
        moveRecords(to, from) {
            var temp = {
                name: '',
                issuedBy: '',
                issueDate: '',
                location: ''
            }

            temp.name = this.userData.certifications[to].name
            temp.issuedBy = this.userData.certifications[to].issuedBy
            temp.issueDate = this.userData.certifications[to].issueDate
            temp.location = this.userData.certifications[to].location

            this.userData.certifications[to].name = this.userData.certifications[from].name
            this.userData.certifications[to].issuedBy = this.userData.certifications[from].issuedBy
            this.userData.certifications[to].issueDate = this.userData.certifications[from].issueDate
            this.userData.certifications[to].location = this.userData.certifications[from].location

            this.userData.certifications[from].name = temp.name
            this.userData.certifications[from].issuedBy = temp.issuedBy
            this.userData.certifications[from].issueDate = temp.issueDate
            this.userData.certifications[from].location = temp.location
        }
    }
}
</script>

<template>
<div>
    <section class="section education-section section">
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <div class="heading">
                        <h3 class="profile-heading-3"><b class="profile-text-weighted">Education</b></h3>
                        <h6 class="profile-heading-6 font-lite-black"><b class="profile-text-weighted">ACADEMIC CAREER</b></h6>
                        <span v-if="canEdit">
                            <b-button @click="$bvModal.show('add-education')" variant="outline-primary"><i class="fas fa-plus"></i></b-button>
                            <!-- <button @click="activeModal = 'addEducation', previous = null, current=null" data-toggle="modal" data-target="#add-education" class="btn btn-primary"><i class="fas fa-plus"></i></button> -->
                            <!-- <button data-toggle="modal" data-target="#manage-education" class="btn btn-warning"><i class="fas fa-tasks"></i></button> -->
                        </span>
                    </div>
                </div><!-- col-sm-4 -->
                <div class="col-sm-8">
                    <div class="education-wrapper" v-if="userData.degrees.length">
                        <div class="education margin-b-50" v-for="(education, index) in userData.degrees" :key="education.id">
                            <b-button class="float-right" v-if="canEdit" @click="deleteEducation(index)" variant="outline-danger"><i class="fas fa-trash-alt"></i></b-button>
                            <b-button class="float-right mr-1" v-if="canEdit" @click="editEducationIndex = index, $bvModal.show('edit-education')" variant="outline-primary"><i class="far fa-edit"></i></b-button>
                            <!-- <button class="btn" style="float:right" @click="editEducationIndex = index, activeModal = 'editEducation',previous = current, current = index" data-toggle="modal" data-target="#add-education"><i class="far fa-edit"></i></button> -->
                            <h4 class="profile-heading-4"><b class="profile-text-weighted">{{education.degreeName}}</b> - {{education.degreeLevel.degreeLevel}}</h4>
                            <h5 class="profile-heading-5 font-lite-black"><b class="profile-text-weighted">{{education.empDegree.instituteName}}</b></h5>
                            <h6 class="profile-heading-6 font-lite-black margin-t-10">SESSION {{education.empDegree.startYear | formatYear}} - {{education.empDegree.endYear | formatYear}} with {{education.empDegree.percentage != 0? education.empDegree.percentage + '% Marks' : 'CGPA: ' + education.empDegree.cgpa}}</h6>
                        </div><!-- education -->
                    </div><!-- education-wrapper -->
                    
                    <div class="my-4" v-else>
                        This user doesn't have any education record yet.
                    </div>
                </div><!-- col-sm-8 -->
            </div><!-- row -->
        </div><!-- container -->
    </section><!-- education-section -->
    <ProfileEducationAddModal @update="$emit('update')" />
    <ProfileEducationEditModal :userData="userData" :editEducationIndex="editEducationIndex" @update="$emit('update')" />
    <ProfileEducationManageModal :userData="userData" />
</div>
</template>

<script>
import ProfileEducationAddModal from './ProfileEducationAddModal'
import ProfileEducationEditModal from './ProfileEducationEditModal'
import ProfileEducationManageModal from './ProfileEducationManageModal'
import UserService from '@/services/user.service'
export default {
    data() {
        return {
            editEducationIndex: null,
        }
    },
    props: ['userData', 'canEdit'],
    components: {
        ProfileEducationAddModal,
        ProfileEducationEditModal,
        ProfileEducationManageModal
    },
    methods: {
        async deleteEducation(index) {
            await this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this education', {
                    title: 'Are You Sure?',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelVariant: 'light',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    this.confirm = value
                })
            if (this.confirm) {
                const response = await UserService.deleteEmployeeEducation(this.$route.query.id, this.userData.degrees[index].empDegree.id)
                if (response) {
                    this.confirm = false
                    this.$emit('update')
                }
            }
        }
    },
}
</script>

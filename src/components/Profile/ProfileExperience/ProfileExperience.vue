<template>
<div>
    <section class="section experience-section section">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-4">
                    <div class="heading">
                        <h3 class="profile-heading-3"><b class="profile-text-weighted">Work Experience</b></h3>
                        <h6 class="profile-heading-6 font-lite-black"><b class="profile-text-weighted">PREVIOUS JOBS</b></h6>
                        <span v-if="canEdit">
                            <b-button @click="$bvModal.show('add-experience')" variant="primary"><i class="fas fa-plus"></i></b-button>
                            <!-- <button @click="activeModal = 'addEducation', previous = null, current=null" data-toggle="modal" data-target="#add-education" class="btn btn-primary"><i class="fas fa-plus"></i></button> -->
                            <!-- <button data-toggle="modal" data-target="#manage-education" class="btn btn-warning"><i class="fas fa-tasks"></i></button> -->
                        </span>
                    </div>
                </div><!-- col-sm-4 -->
                <div class="col-sm-12 col-md-8">
                    <div class="row">
                        <div v-for="(experience, index) in userData.empWorkExperiences" :key="index" class="experience margin-b-50 col-sm-6">
                            <b-button v-if="canEdit" class="float-right" @click="deleteExperience(index)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
                            <b-button v-if="canEdit" class="float-right mr-1" @click="editExperienceIndex = index, $bvModal.show('edit-experience')" variant="primary"><i class="far fa-edit"></i></b-button>

                            <!-- <b-button class="float-right" v-if="canEdit" @click="editExperienceIndex = index, $bvModal.show('edit-experience')" variant="light"><i class="far fa-edit"></i></b-button> -->
                            <h4 class="profile-heading-4"><b class="profile-text-weighted">{{experience.designation}}</b></h4>
                            <h5 class="profile-heading-5 font-lite-black"><b class="profile-text-weighted">{{experience.company}}</b></h5>
                            <h6 class="profile-heading-6 margin-t-10">{{experience.startYear}} - {{experience.endYear}}</h6>
                            <p class="profile-paragraph font-semi-white margin-tb-30">{{experience.jobDescription}}</p>
                            <!-- <ul class="profile-ul list margin-b-30">
                            <li class="profile-li">Duis non volutpat arcu, eu mollis tellus.</li>
                            <li class="profile-li">Quis consequat nulla effi citur at.</li>
                            <li class="profile-li">Sed finibus aliquam neque sit.</li>
                        </ul> -->
                        </div><!-- experience -->
                    </div>
                </div><!-- col-sm-8 -->
            </div><!-- row -->
        </div><!-- container -->
    </section><!-- experience-section -->

    <ProfileExperienceAddModal @update="$emit('update')" />
    <ProfileExperienceEditModal :userData="userData" :editExperienceIndex="editExperienceIndex" @update="$emit('update')" />
</div>
</template>

<script>
import ProfileExperienceAddModal from './ProfileExperienceAddModal'
import ProfileExperienceEditModal from './ProfileExperienceEditModal'
import UserService from '@/services/user.service'
export default {
    props: ['userData', 'canEdit'],
    data() {
        return {
            editExperienceIndex: null
        }
    },
    components: {
        ProfileExperienceAddModal,
        ProfileExperienceEditModal
    },
    methods: {
        getYear(date) {
            return new Date(date).getFullYear()
        },
        async deleteExperience(index) {
            await this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this work experience', {
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
                const response = await UserService.deleteEmployeeExperience(this.$route.query.id, this.userData.empWorkExperiences[index].id)
                if (response) {
                    this.confirm = false
                    this.$emit('update')
                }
            }
        }
    },
}
</script>

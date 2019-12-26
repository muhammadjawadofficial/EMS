<template>
<div>
    <section class="section experience-section section">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-4">
                    <div class="heading">
                        <h3 class="profile-heading-3"><b class="profile-text-weighted">Certifications</b></h3>
                        <h6 class="profile-heading-6 font-lite-black mb-4"><b class="profile-text-weighted">CERTIFIED SKILLS</b></h6>
                        <span v-if="canEdit">
                            <b-button @click="$bvModal.show('add-certificate')" variant="primary"><i class="fas fa-plus"></i></b-button>
                            <!-- <button @click="activeModal = 'addCertification'" data-toggle="modal" data-target="#add-certification" class="btn btn-primary"><i class="fas fa-plus"></i></button> -->
                            <!-- <button data-toggle="modal" data-target="#manage-certifications" class="btn btn-warning"><i class="fas fa-tasks"></i></button> -->
                        </span>
                    </div>
                </div><!-- col-sm-4 -->
                <div class="col-sm-12 col-md-8">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6 col-md-6" v-for="(certification, index) in userData.certifications" :key="certification.key">
                                <div class="experience margin-b-50">
                                    <h4 class="profile-heading-4">
                                        <b class="profile-text-weighted">{{certification.certification}} ({{certification.empCertifications.title}})</b>
                                        <b-button v-if="canEdit" class="float-right" @click="deleteCertification(index)" variant="danger"><i class="fas fa-trash-alt"></i></b-button>
                                        <b-button v-if="canEdit" class="float-right mr-1" @click="editCertificationIndex = index, $bvModal.show('edit-certificate')" variant="primary"><i class="far fa-edit"></i></b-button>
                                        <!-- <button class="btn" @click="editCertificationIndex = index" data-toggle="modal" data-target="#edit-certification">
                                            <i style="color:white" class="far fa-edit"></i>
                                        </button> -->
                                    </h4>
                                    <h5 class="profile-heading-5 font-lite-black"><b class="profile-text-weighted">{{certification.empCertifications.organization}}</b></h5>
                                    <h6 class="profile-heading-6 margin-t-10">{{certification.empCertifications.completionDate}}</h6>
                                    <h6 class="profile-heading-6 margin-t-10">{{certification.empCertifications.location}}</h6>
                                </div><!-- experience -->
                            </div><!-- col-sm-8 -->
                        </div>
                    </div>
                </div>
                <!-- <div class="experience margin-b-50">
                        <h4 class="profile-heading-4"><b class="profile-text-weighted">WEB MASTER/WEB DEVELOPER</b></h4>
                        <h5 class="profile-heading-5 font-lite-black"><b class="profile-text-weighted">DESIGN & WEB STUDIO</b></h5>
                        <h6 class="profile-heading-6 margin-t-10">APRIL 2014 - FEBRUARY 2015</h6>
                        <p class="profile-paragraph font-semi-white margin-tb-30">Duis non volutpat arcu, eu mollis tellus. Sed finibus aliquam neque sit amet sodales.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentes que velit,
                            quis consequat nulla effi citur at. Maecenas sed massa tristique.Duis non volutpat arcu,
                            eu mollis tellus. Sed finibus aliquam neque sit amet sodales. </p>
                        <ul class="profile-ul list margin-b-30">
                            <li class="profile-li">Duis non volutpat arcu, eu mollis tellus.</li>
                            <li class="profile-li">Quis consequat nulla effi citur at.</li>
                            <li class="profile-li">Sed finibus aliquam neque sit.</li>
                        </ul>
                    </div> -->
            </div><!-- row -->
        </div><!-- container -->
    </section><!-- experience-section -->

    <ProfileCertificationAddModal @update="$emit('update')" />
    <ProfileCertificationEditModal :certification="userData.certifications[editCertificationIndex]" :editCertificationIndex="editCertificationIndex" @update="$emit('update')" />
    <ProfileCertificationManageModal :userData="userData" />
</div>
</template>

<script>
import ProfileCertificationAddModal from './ProfileCertificationAddModal'
import ProfileCertificationEditModal from './ProfileCertificationEditModal'
import ProfileCertificationManageModal from './ProfileCertificationManageModal'
import UserService from '@/services/user.service'
export default {
    data() {
        return {
            editCertificationIndex: null,
            confirm: false,
        }
    },
    props: ['userData', 'canEdit'],
    components: {
        ProfileCertificationAddModal,
        ProfileCertificationEditModal,
        ProfileCertificationManageModal
    },
    methods: {
        async deleteCertification(index) {
            await this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this certificate', {
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
                const response = await UserService.deleteEmployeeCertification(this.$route.query.id, this.userData.certifications[index].empCertifications.id)
                if (response) {
                    this.confirm = false
                    this.$emit('update')
                }
            }
        }
    }
}
</script>

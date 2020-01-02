<template>
<div class="row">
    <div class="col-md-12">
        <div class="tabbable" id="tabs-355730">
            <ul class="nav nav-tabs mt-4">
                <li class="nav-item">
                    <a class="nav-link active show" href="#editPersonalInformation" data-toggle="tab">Personal Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#editLoginInformation" data-toggle="tab">Login Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#editEducation" data-toggle="tab">Education</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#editCertification" data-toggle="tab">Certification</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#editExperience" data-toggle="tab">Experience</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#editSkills" data-toggle="tab">Skills</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#profilePicture" data-toggle="tab">Profile Image</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="editPersonalInformation">
                    <EmployeeEditBasicInfo v-if="userInfo.id" :userInfo="userInfo" heading="Edit Basic Info" @update="getUserInfo" />
                </div>
                <div class="tab-pane" id="editLoginInformation">
                    <EmployeeEditLoginInformation v-if="userInfo.employeeLogin" :email="userInfo.employeeLogin.email" @update="getUserInfo" />
                </div>
                <div class="tab-pane" id="editEducation">
                    <EmployeeEditEducation v-if="userInfo.degrees" :degrees="userInfo.degrees" @update="getUserInfo" />
                </div>
                <div class="tab-pane" id="editCertification">
                    <EmployeeEditCertification v-if="userInfo.certifications" :certificates="userInfo.certifications" @update="getUserInfo" />
                </div>
                <div class="tab-pane" id="editExperience">
                    <EmployeeEditExperience v-if="userInfo.empWorkExperiences" :experiences="userInfo.empWorkExperiences" @update="getUserInfo" />
                </div>
                <div class="tab-pane" id="editSkills">
                    <EmployeeEditSkills v-if="userInfo.skills" :skills="userInfo.skills" @update="getUserInfo" />
                </div>
                <div class="tab-pane" id="profilePicture">
                    <EmployeeEditProfileImage v-if="userInfo.image" :image="userInfo.image.data" @update="getUserInfo" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import EmployeeEditEducation from './EmployeeEditEducation'
import EmployeeEditCertification from './EmployeeEditCertification'
import EmployeeEditBasicInfo from './EmployeeEditBasicInfo'
import EmployeeEditLoginInformation from './EmployeeEditLoginInformation'
import EmployeeEditSkills from './EmployeeEditSkills'
import EmployeeEditProfileImage from './EmployeeEditProfileImage'
import EmployeeEditExperience from './EmployeeEditExperience'

export default {
    components: {
        EmployeeEditEducation,
        EmployeeEditBasicInfo,
        EmployeeEditCertification,
        EmployeeEditLoginInformation,
        EmployeeEditSkills,
        EmployeeEditProfileImage,
        EmployeeEditExperience
    },
    data() {
        return {
            userInfo: {},
            userId: this.$route.params.id
        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        async getUserInfo() {
            const response = await UserService.getUserDetails(this.$route.params.id)
            if (response) {
                this.userInfo = response.data.data
                doconsole(this.userInfo)
                
                if (this.$store.getters.USERID == this.$route.params.id)
                    this.$store.dispatch('SET_USER_INFO')
            }
        },
        getActiveCard() {
            return this.$route.params.card
        },
    }
}
</script>

<style>

</style>

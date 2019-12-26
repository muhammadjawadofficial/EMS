<template>
<div id="page-top" class="body">
    <ProfileHeader v-if="userData" :userData="userData"/>

    <ProfileIntroduction v-if="userData" :userData="userData" :canEdit="canEdit" @update="updateUserInfo" />

    <ProfileAbout v-if="userData" :userData="userData" :canEdit="canEdit" />

    <ProfileCertification v-if="userData" :userData="userData" :canEdit="canEdit" @update="updateUserInfo" />

    <ProfileEducation v-if="userData" :userData="userData" :canEdit="canEdit" @update="updateUserInfo" />

    <ProfileExperience v-if="userData" :userData="userData" :canEdit="canEdit" @update="updateUserInfo" />

    <ProfileSkills v-if="userData" :userData="userData" :canEdit="canEdit" @update="updateUserInfo"/>

    <go-top :max-width="300" :size="60" :right="25" :bottom="50" bg-color="#00aeef"></go-top>

    <span style="display:none">{{this.$route.query.id}}</span>
</div>
</template>

<script>
import GoTop from "@inotom/vue-go-top"
import ProfileIntroduction from "./ProfileIntroduction/ProfileIntroduction"
import ProfileAbout from "./ProfileAbout/ProfileAbout"
import ProfileEducation from "./ProfileEducation/ProfileEducation"
import ProfileExperience from "./ProfileExperience/ProfileExperience"
import ProfileCertification from "./ProfileCertification/ProfileCertification"
import ProfileSkills from "./ProfileSkills/ProfileSkills"
import ProfileHeader from './ProfileHeader/ProfileHeader'

import UserService from "@/services/user.service"
import ApiService from "@/services/api.service"
import {
    TokenService
} from "@/services/storage.service"

export default {
    data() {
        return {
            userData: null,
            canEdit: false
        };
    },
    components: {
        GoTop,
        ProfileAbout,
        ProfileSkills,
        ProfileHeader,
        ProfileEducation,
        ProfileExperience,
        ProfileIntroduction,
        ProfileCertification,
    },
    methods: {
        async getUsers() {
            const response = await UserService.getUserDetails(this.$route.query.id);
            response ? this.userData = response.data.data: null;
            console.log(this.userData)
        },
        updateUserInfo() {
            this.getUsers();
        }
    },
    beforeUpdate() {
        if (this.userData.id != this.$route.query.id) {
            this.userData.id = this.$route.query.id;
            this.getUsers();
        }
        if (this.$route.query.id == TokenService.getCurrentEmployeeId()) {
            this.canEdit = true;
        }
    },
    mounted() {
        this.getUsers();
        window.scrollTo(0, document.getElementById("page-top").offsetTop);
    }
};
</script>

<style>
@import url("style.css");
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700%7CAllura");
@import url("responsive.css");
</style>

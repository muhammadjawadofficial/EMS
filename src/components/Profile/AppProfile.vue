<template>
<div id="page-top" class="body">
    <ProfileHeader v-if="userData" :userData="userData" />

    <ProfileIntroduction v-if="userData" :userData="userData" :canEdit="canEdit" @update="getUser" />

    <ProfileAbout v-if="userData" :userData="userData" :canEdit="canEdit" />

    <ProfileCertification v-if="userData" :userData="userData" :canEdit="canEdit" @update="getUser" />

    <ProfileEducation v-if="userData" :userData="userData" :canEdit="canEdit" @update="getUser" />

    <ProfileExperience v-if="userData" :userData="userData" :canEdit="canEdit" @update="getUser" />

    <ProfileSkills v-if="userData" :userData="userData" :canEdit="canEdit" @update="getUser" />

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
        async getUser() {
            const response = await UserService.getUserDetails(this.$route.query.id);
            response ? this.userData = response.data.data : null;

        },
        showEditButtons() {
            if (this.$route.query.id == TokenService.getCurrentEmployeeId()) {
                this.canEdit = true;
            }
        }
    },
    watch: {
        $route(to, from) {
            if (to.query.id != from.query.id) {
                this.userData.id = to.query.id;
                this.getUser();
            }
            this.showEditButtons()
        }
    },
    mounted() {

        this.getUser();
        this.showEditButtons()
        window.scrollTo(0, document.getElementById("page-top").offsetTop);
    }
};
</script>

<style>
@import url("style.css");
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700%7CAllura");
@import url("responsive.css");
</style>

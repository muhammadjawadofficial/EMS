<template>
<div class="wrapper ">

    <div class="sidebar" data-color="purple" data-background-color="white">
        <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->

        <!-- <div class="logo" style="text-align:center">
            <img src="@/assets/db2.png" alt="DevBatch-logo">
        </div> -->
        <div class="sidebar-wrapper">
            <ul class="nav">
                <li v-for="link in sideBarLinks" :key="link.id" class="nav-item" :class="[ link.name.includes(current()) ? 'active' : '']">
                    <router-link class="nav-link" :to="{name: link.name[0]}"><span v-html="link.icon"></span>
                        <p>{{link.text}}</p>
                    </router-link>
                </li>
                <li class="nav-item navbar-button">
                    <button class="btn btn-danger p-3" @click="logout()">Logout</button>
                </li>
                <!-- your sidebar here -->
            </ul>
        </div>
    </div>
    <div class="main-panel" id="main-panel">
        <div class="content">
            <div class="container-fluid">
                <router-view></router-view>
                <!-- your content here -->
            </div>
        </div>
        <footer class="footer">
            <div class="container-fluid">
                <nav class="float-left">
                    <ul>
                        <li><a>DevBatch</a></li>
                    </ul>
                </nav>
                <div class="copyright float-right">
                    &copy;
                    2019
                </div>
                <!-- your footer here -->
            </div>
        </footer>
    </div>
</div>
</template>

<script>
// import './assets/bootstrap-material-design.min.js'
import '@/assets/jquery.min.js'
import '@/assets/popper.min.js'
import '@/assets/perfect-scrollbar.jquery.min.js'
import '@/assets/material-dashboard.js?v=2.1.1'

import UserService from '@/services/user.service'
import {
    TokenService
} from '@/services/storage.service'
import {
    image
} from '@/constants'
export default {
    data() {
        return {
            adminImage: '',
            adminName: '',
            adminId: TokenService.getCurrentEmployeeId(),
            sideBarLinks: [{
                    name: ['dashboard'],
                    icon: '<i class="fas fa-tachometer-alt"></i>',
                    text: 'Dashboard'
                },
                {
                    name: ['listEmployees', 'editEmployees'],
                    icon: '<i class="fas fa-users"></i>',
                    text: 'Employees'
                },
                {
                    name: ['listSkill'],
                    icon: '<i class="fas fa-laptop-code"></i>',
                    text: 'Skills'
                },
                {
                    name: ['listEducation', 'editEducation'],
                    icon: '<i class="fas fa-graduation-cap"></i>',
                    text: 'Educations'
                },
                {
                    name: ['listCertificate'],
                    icon: '<i class="fas fa-certificate"></i>',
                    text: 'Certifications'
                },
                {
                    name: ['listDesignations'],
                    icon: '<i class="fas fa-user-tag"></i>',
                    text: 'Designations'
                },
                {
                    name: ['listCountry', 'editCountry'],
                    icon: '<i class="fas fa-globe"></i>',
                    text: 'City/Country'
                }
                // {
                //     name: ['listGenders'],
                //     icon: '<i class="fas fa-venus-mars"></i>',
                //     text: 'Genders'
                // },
            ]
        }
    },
    mounted() {
        doconsole('inside admin panl')
        doconsole(this.$store.getters.USEREMAIL)
    },
    methods: {
        current() {
            return this.$router.currentRoute.name
        },
        async logout() {
            const response = await UserService.logout()
            if (response) {
                TokenService.clear()
                this.$router.push({
                    path: '/'
                });
            }
        },
    },
    computed: {
        dataUrl() {
            return image.convert(this.$store.getters.USERIMAGE)
        },
        fullName(){
            return this.$store.getters.USERNAME
        },
    },
}
</script>

<style>
@import url('./AppAdminPanel.css');
/* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons'); */
/* @import url('https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css'); */
</style>

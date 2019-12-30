<template>
<div class="wrapper ">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div class="container-fluid">
            <button class="navbar-toggler sidebar-toggler" type="button" data-toggle="collapse" data-target="#navigationIndex" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
            </button>
            <div class="logo" style="text-align:center">
                <img src="@/assets/db2.png" alt="DevBatch-logo">
            </div>
            <div class="collapse navbar-collapse justify-content-end" id="navigationIndex">
                <ul class="navbar-nav">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <img :src="dataUrl" height="30" alt="user-image"/> {{adminName}}
                        </template>
                        <b-dropdown-item :to="'/admin/listEmployees/' + adminId">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <!-- <li class="nav-item">
                        <button class="btn btn-danger" @click="logout()">Logout</button>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Navbar -->
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
                }
                // {
                //     name: ['listGenders'],
                //     icon: '<i class="fas fa-venus-mars"></i>',
                //     text: 'Genders'
                // },
            ]
        }
    },
    methods: {
        current() {
            return this.$router.currentRoute.name
        },
        async logout() {
            const response = await UserService.logout()
            if (response) {
                TokenService.removeToken()
                this.$router.push({
                    path: '/'
                });
            }
        },
    },
    async mounted() {
        const response = await UserService.getUserDetails(TokenService.getCurrentEmployeeId())
        doconsole('admin data')
        doconsole(response.data.data)
        const data = response.data.data
        this.adminName = data.firstName + ' ' + data.lastName
        this.adminImage = data.image.data
    },
    computed: {
        dataUrl() {
            return image.convert(this.adminImage)
        }
    },
}
</script>

<style>
@import url('./AppAdminPanel.css');
/* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons'); */
/* @import url('https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css'); */
</style>

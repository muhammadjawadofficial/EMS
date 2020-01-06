<template>
<div>
<!-- Navbar -->
<nav class="navbar navbar-expand-md navbar-dark fixed-top">
    <div class="container-fluid">
        <button class="navbar-toggler sidebar-toggler" type="button" data-toggle="collapse" data-target="#navigationIndex" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span v-if="$store.getters.USERROLE == 'true'" class="navbar-toggler-icon icon-bar"></span>
            <span v-if="$store.getters.USERROLE == 'true'" class="navbar-toggler-icon icon-bar"></span>
        </button>
        <div class="logo" style="text-align:center">
            <img src="@/assets/db2.png" alt="DevBatch-logo">
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navigationIndex">
            <ul class="navbar-nav" v-if="$store.getters.USERROLE != 'true'">
                <li class="nav-item" :class="[ current === navLink.path ? 'active' : '']" v-for="navLink in navLinks" :key="navLink.id">
                    <a class="nav-link" @click="nextPath(navLink.path),current = navLink.path">{{ navLink.name }}</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <img :src="dataUrl" height="30" alt="user-image" /><span class="text-white"> {{fullName}}</span>
                    </template>
                    <b-dropdown-item :to="($store.getters.USERROLE == 'true'? '/admin/listEmployees/' : '/pageProfile?id=') + $store.getters.USERID">Profile</b-dropdown-item>
                    <b-dropdown-item @click="$bvModal.show('edit-password')">Change Password</b-dropdown-item>
                    <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </ul>
        </div>
    </div>
</nav>
    <ChangePasswordModal v-if="$store.getters.USEREMAIL" />
</div>
<!-- End Navbar -->
</template>

<script>
import ChangePasswordModal from './TheChangePasswordModal'
import {
    TokenService
} from '@/services/storage.service'
import {
    image
} from '@/constants'
import UserService from '@/services/user.service'
export default {
    data() {
        return {
            canAdd: false,
            current: '/list',
            navLinks: [],
            userOwnProfilePath: `/pageProfile?id=${TokenService.getCurrentEmployeeId()}`
        }
    },
    components: {
        ChangePasswordModal
    },
    mounted() {
        this.current = this.$router.currentRoute.path
        if (this.$route.query.id == TokenService.getCurrentEmployeeId())
            this.current = '/pageProfile?id=' + TokenService.getCurrentEmployeeId()
        else if (this.current == '/pageProfile')
            this.current = '/list'

        this.$router.options.routes.forEach(route => {
            if (route.meta)
                if (route.meta.navigationLink) {
                    if (route.path == '/pageProfile')
                        this.navLinks.push({
                            name: route.name,
                            path: this.userOwnProfilePath
                        })
                    else
                        this.navLinks.push({
                            name: route.name,
                            path: route.path
                        })
                }
        })
    },
    methods: {
        toProfile() {
            this.current = this.userOwnProfilePath
            this.$router.push({
                path: this.userOwnProfilePath
            })
        },
        nextPath(path) {
            if (this.$router.currentRoute.fullPath != path)
                this.$router.replace({
                    path: path
                })
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
        changePassword(){
            doconsole('change password')
        }
    },
    computed: {
        dataUrl() {
            return image.convert(this.$store.getters.USERIMAGE)
        },
        fullName() {
            return this.$store.getters.USERNAME
        },
    },
}
</script>

<style scoped>
.nav-link {
    cursor: pointer;
}

nav {
    background-color: #392bc0 !important;
}
</style>

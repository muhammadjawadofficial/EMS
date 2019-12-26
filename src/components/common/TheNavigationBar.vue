<template>
<nav class="navbar navbar-expand-md navbar-dark fixed-top" style="background-color:#392bc0; padding: 0.5rem 1rem;">
    <span style="float: center;">
        <a class="navbar-brand"><img src="@/assets/db2.png" alt=""></a>
    </span>
    <!-- <span style="float: right;"><button class="btn btn-warning"></button></span> -->
    <!-- <span style="float: right;"><button class="btn btn-danger"><i class="fa fa-users"></i><i class="fas fa-sign-out-alt"></i></button></span> -->

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Navbar links -->
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
            <!-- <router-link class="nav-item" v-for="route in $router.options.routes" :key="route.path" :to="route.path">
                 <a class="nav-link">{{ route.name }}</a>
            </router-link> -->
            <!-- :class="[ current === navLink.path ? 'active' : '']" -->
            <li class="nav-item" :class="[ current === navLink.path ? 'active' : '']" v-for="navLink in navLinks" :key="navLink.id">
                <!-- <router-link class="router-link-active" :to="navLink.path">{{navLink.name}}</router-link> -->
                <a class="nav-link" @click="nextPath(navLink.path),current = navLink.path">{{ navLink.name }}</a>
            </li>
            <!-- <li class="nav-item" :class="[ current === '/pageProfile' ? 'active' : '']">
                <a class="nav-link" @click="toProfile(), current='/pageProfile'">My Profile</a>
            </li>
            <li class="nav-item" :class="[ current === '/list' ? 'active' : '']">
                <a class="nav-link" @click="toDevelopers(), current='/list'">Developers</a>
            </li>
            <li v-if="canAdd == 'true'" class="nav-item" :class="[ current === '/addEmployee' ? 'active' : '']">
                <a class="nav-link" @click="toAddEmployee(), current='/addEmployee'">Add New Employee</a>
            </li> -->
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <button @click="logoutt" class="btn btn-danger ml-auto mr-3"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
import {
    TokenService
} from '@/services/storage.service'
import UserService from '@/services/user.service'
export default {
    data() {
        return {
            canAdd: false,
            current: '/list',
            navLinks: []
        }
    },
    mounted() {
        this.current = this.$router.currentRoute.path
        if (this.$route.query.id == TokenService.getCurrentEmployeeId())
            this.current = '/pageProfile?id=' + TokenService.getCurrentEmployeeId()
        else if (this.current == '/pageProfile')
            this.current = '/list'

        this.canAdd = TokenService.getIsAdmin() === 'true' ? true : false;

        // console.log(this.$router.currentRoute)
        // console.log(this.$router.currentRoute.path)
        // console.log(this.current)
        // console.log(this.$router.options.routes)
        this.$router.options.routes.forEach(route => {
            if (route.meta)
                if (route.meta.navigationLink) {
                    if (route.path == '/pageProfile')
                        this.navLinks.push({
                            name: route.name,
                            path: `/pageProfile?id=${TokenService.getCurrentEmployeeId()}`
                        })
                    else if (!(route.path == '/addEmployee' && !this.canAdd))
                        this.navLinks.push({
                            name: route.name,
                            path: route.path
                        })
                }
            // if (route.meta.navLink != undefined)
            // this.navLinks.push({
            //     name: route.name,
            //     path: route.path
            // })
        })
        // console.log(this.navLinks)
        // console.log(this.$router.currentRoute.fullPath)
    },
    methods: {
        nextPath(path) {
            // console.log('current path:' + this.current)
            // console.log('clicked path: ' + path)
            if (this.$router.currentRoute.fullPath != path)
                this.$router.replace({
                    path: path
                })
            // switch (path) {
            //     case '/list':
            //         this.toDevelopers();
            //         break;
            //     case '/addEmployee':
            //         this.toAddEmployee()
            //         break;
            //     case '/pageProfile':
            //         this.toProfile();
            //         break;
            //     default:
            //         break;
            // }
        },
        // currentPath() {
        //     return this.$router.currentRoute.path
        // },
        // toDevelopers() {
        //     if (this.currentPath() != '/list')
        //         this.$router.replace({
        //             path: `/list`
        //         })
        // },
        // toProfile() {
        //     console.log(this.currentPath())
        //     if (this.currentPath() != '/pageProfile')
        //         this.$router.replace({
        //             path: `/pageProfile?id=${TokenService.getCurrentEmployeeId()}`
        //         })
        // },
        // toAddEmployee() {
        //     if (this.currentPath() != '/addEmployee')
        //         this.$router.replace({
        //             path: `/addEmployee`
        //         })
        // },
        async logoutt() {
            // if (UserService.logout())
            //     this.nextPath('/');
            const response = await UserService.logout()
            if (response) {
                TokenService.removeToken()
                this.$router.push({
                    path: '/'
                });
            }
        },
    }
}
</script>

<style scoped>
.nav-link {
    /* color: white !important; */
    cursor: pointer;
}

/* .nav-link:hover {
    color: lightblue !important
} */

/* .navbar-nav .active{
    text-decoration: underline !important
    border: #03a9f4 1px solid;
    border-radius: 8px;
} */
</style>

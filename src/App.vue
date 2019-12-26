<template>
<div id="app">

    <navVue v-if="checkSession()"></navVue>

    <router-view/>

    <footerVue v-if="checkSession()"></footerVue>
</div>
</template>

<script>
import navVue from '@/components/common/TheNavigationBar'
import footerVue from '@/components/common/TheFooter'
import {TokenService} from '@/services/storage.service'

export default {
    name: 'App',
    components: {
        footerVue,
        navVue
    },
    methods: {
        checkSession() {
            if (TokenService.getToken() && TokenService.getIsAdmin() != 'true') {
                return true
            } else {
                return false
            }
        },
    }
}
</script>

<style>
/* @import url('./components/Profile/style.css'); */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css');
/* @import url('./css/resume.min.css');
@import url('https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700');
@import url('https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i');*/
</style>

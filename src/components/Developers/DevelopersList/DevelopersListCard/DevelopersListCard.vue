<template>
<!-- Team member -->
<div class="image-flip" ontouchstart="this.classList.toggle('hover');">
    <div class="mainflip">
        <!--
            Frontside of the Developer Card
        -->
        <div class="frontside">
            <div class="card">
                <div class="card-body text-center">
                    <p v-if="user.image"><img :src="dataUrl" class="img-fluid" alt="N/A"></p>
                    <!-- <p><img class=" img-fluid" src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png" alt="card image"></p> -->
                    <h4 class="card-title">{{user.firstName}} {{user.lastName}}</h4>
                    <p v-if="user.description" class="card-text"> {{user.description | truncate(150, '...')}}</p>
                    <!-- <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a> -->
                </div>
            </div>
        </div>
        <!--
            Backside of the Developer Card
        -->
        <div class="backside">
            <div class="card">
                <div class="card-body text-center mt-4">
                    <h4 class="card-title">{{user.firstName}} {{user.lastName}}</h4>
                    <p class="card-text"  v-if="user.description">
                        <!-- 
                            only displaying 150 characters of developer discription.
                            Truncating rest of the description
                        -->
                        {{user.description | truncate(150, '...')}}
                    </p>
                    <!-- <ul class="list-inline">
                        <li class="list-inline-item">
                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                <i class="fa fa-facebook"></i>
                            </a>
                        </li>
                    </ul> -->
                    
                    <button class="btn btn-success" @click="showProfile(user.id)">View Profile</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Team Member -->
</template>

<script>
import Vue from 'vue'
Vue.filter('truncate', function (text, length, suffix) {
    return text.substring(0, length) + suffix;
});

import {
    TokenService
} from '@/services/storage.service'
export default {
    data() {
        return {
            canDelete: TokenService.getIsAdmin() === 'true' ? true : false,
        }
    },
    props: ['user'],
    methods: {
        //used to show the profile of the developer on which the user clicks (on ViewProfile button)
        showProfile(userId) {
            //redirect to the requested profile
            this.$router.replace({
                path: `/pageProfile?id=${userId}`
            });
        },
    },
    computed: {
        dataUrl() {
            return 'data:image/jpeg;base64,' + btoa(
                new Uint8Array(this.user.image.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }
    },
    mounted() {


        if (localStorage.getItem('isAdmin') == "true")
            this.canDelete = true;
    }
}
</script>

<style>

</style>

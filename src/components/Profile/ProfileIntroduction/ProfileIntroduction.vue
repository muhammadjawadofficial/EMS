<template>
<div>
    <section class="section intro-section">
        <div class="container">
            <div class="row">
                <div class="col-md-1 col-lg-2"></div>
                <div class="col-md-10 col-lg-8">
                    <div class="intro">
                        <div class="profile-img" v-if="userData.image">
                            <!-- <ImageCropper :src="sserver + userData.image" /> -->
                            <img class="profile-image" :src="dataUrl" alt="">
                            <div v-if="canEdit" class="middle">
                                    <changeProfilePicture @update="$emit('update')"/>
                                <!-- <div class="text pointer-event"><a @click="changePicture('delete')"><i class="fas fa-user"></i> Default</a></div>
                                <div><a @click="changePicture"><i class="fas fa-camera"></i> Change</a></div>
                                <div style="height:0px;overflow:hidden">
                                    <input style="height:0px" class="inputfile" id="fileInput" accept="image/*" ref="file" type="file" @change="onFileChanged">
                                </div> -->
                            </div>
                            <!-- <button class="edit-button">edit</button> -->
                        </div>

                        <h2 class="profile-heading-2"><b class="profile-text-weighted">{{userData.firstName}} {{userData.lastName}}</b></h2>
                        <h4 class="profile-heading-4 font-lite-black">{{userData.designation && userData.designation.designation}}</h4>
                        <ul class="profile-ul information margin-tb-30">
                            <li class="profile-li" v-if="userData.gender"><b class="profile-text-weighted">AGE : </b>{{userData.age}}, <b class="profile-text-weighted">GENDER : </b>{{userData.gender.gender}}</li>
                            <li class="profile-li" v-if="userData.employeeLogin"><b class="profile-text-weighted">EMAIL : </b> {{userData.employeeLogin.email}} </li>
                            <!-- <li class="profile-li"><b class="profile-text-weighted">MARITAL STATUS : </b>Married</li> -->
                        </ul>
                        <span v-if="canEdit">
                            <!-- <button class="btn btn-primary"><i class="fas fa-plus"></i></button> -->
                            <!-- <button @click="editIntroduction = true" class="btn btn-warning" data-toggle="modal" data-target="#edit-about"><i class="far fa-edit"></i> Personal Information</button> -->
                            <b-button variant="primary" v-b-modal.edit-about><i class="far fa-edit"></i> Personal Information</b-button>
                            <!-- <button v-if="canEdit" class="btn btn-warning" @click="showModal('edit-about')"><i class="far fa-edit"></i> Personal Information</button> -->
                        </span>
                        <!-- <ul class="profile-ul social-icons">
                        <li class="profile-li profile-link"><a href="#"><i class="ion-social-pinterest"></i></a></li>
                        <li class="profile-li profile-link"><a href="#"><i class="ion-social-linkedin"></i></a></li>
                        <li class="profile-li profile-link"><a href="#"><i class="ion-social-instagram"></i></a></li>
                        <li class="profile-li profile-link"><a href="#"><i class="ion-social-facebook"></i></a></li>
                        <li class="profile-li profile-link"><a href="#"><i class="ion-social-twitter"></i></a></li>
                    </ul> -->
                    </div><!-- intro -->
                </div><!-- col-sm-8 -->
            </div><!-- row -->
        </div><!-- container -->
    </section><!-- intro-section -->
    <ProfileIntroductionEdit :userData="userData" @update="$emit('update')" />
</div>
</template>

<script>
import ProfileIntroductionEdit from './ProfileIntroductionEditModal'
import changeProfilePicture from '@/components/common/changeProfilePicture'
import {
    image
} from '@/constants'
export default {
    components: {
        ProfileIntroductionEdit,
        changeProfilePicture
    },
    props: ['userData', 'canEdit'],
    computed: {
        dataUrl() {
            return image.convert(this.userData.image.data)
        }
    },
}
</script>
<template>
<section class="section about-section section">
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <div class="heading">
                    <h3 class="profile-heading-3"><b class="profile-text-weighted">Skills</b></h3>
                    <h6 class="profile-heading-6 font-lite-black mb-4"><b class="profile-text-weighted">PROFESSIONAL SKILLS</b></h6>
                    <span v-if="canEdit">
                        <!-- <button class="btn btn-primary" data-toggle="modal" data-target="#add-skill"><i class="fas fa-plus"></i></button> -->
                        <b-button @click="$bvModal.show('edit-skills')" variant="outline-primary"><i class="far fa-edit"></i></b-button>
                        <!-- <button class="btn btn-warning" data-toggle="modal" data-target="#edit-skill"><i class="far fa-edit"></i></button> -->
                        <!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> -->
                    </span>

                </div>
            </div><!-- col-sm-4 -->
            <div class="col-sm-8">
                <div class="profile-paragraph margin-b-50">
                    <li class="profile-skill list-inline-item color-purple" v-for="(skill) in userData.skills" :key="skill.id">
                        {{skill.skill}}
                    </li>
                </div>
            </div><!-- col-sm-8 -->
        </div><!-- row -->
    </div><!-- container -->
    <!-- <ProfileSkillsAddModal :userData="userData" /> -->
    <ProfileSkillsEditModal :skills="userData.skills" @update="$emit('update')" />
</section><!-- about-section -->
</template>

<script>
// import ProfileSkillsAddModal from './ProfileSkillsAddModal'
import ProfileSkillsEditModal from './ProfileSkillsEditModal'
export default {
    props: ['userData', 'canEdit'],
    components: {
        ProfileSkillsEditModal,
    },
}
</script>

<style scoped>
.profile-skill {
    border: 2px solid;
    padding: 2px 8px;
    border-radius: 9px;
    text-decoration: none;
    margin: 4px;
}

.color-purple{
    color: #392bc0
}
</style>

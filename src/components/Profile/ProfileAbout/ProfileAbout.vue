<template>
<section class="section about-section section">
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <div class="heading">
                    <h3 class="profile-heading-3"><b class="profile-text-weighted">About me</b></h3>
                    <h6 class="profile-heading-6 font-lite-black"><b class="profile-text-weighted">PROFESSIONAL PATH</b></h6>
                </div>
            </div><!-- col-sm-4 -->
            <div class="col-sm-8">
                <p class="profile-paragraph margin-b-50 text-justify">{{userData.description? userData.description: "This user doesn't have any about me information."}}</p>
            </div><!-- col-sm-8 -->
        </div><!-- row -->
    </div><!-- container -->
</section><!-- about-section -->
</template>
<script>
export default {
    props:['userData']
}
</script>
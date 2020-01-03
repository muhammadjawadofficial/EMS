<template>
<header class="header">
    <div class="container">
        <div class="heading-wrapper">
            <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-4">
                    <div class="info">
                        <i class="icon fas fa-location-arrow"></i>
                        <div class="right-area">
                            <h5 v-if="userData.city" class="profile-heading-5" id="address">{{userData.city.city}}, 5400</h5>
                            <h5 v-if="userData.country" class="profile-heading-5">{{userData.country.country}}</h5>
                        </div><!-- right-area -->
                    </div><!-- info -->
                </div><!-- col-sm-4 -->

                <div class="col-sm-6 col-md-6 col-lg-4">
                    <div class="info">
                        <i class="icon fas fa-phone-alt"></i>
                        <div class="right-area">
                            <h5 class="profile-heading-5">{{userData.contactNumber}}</h5>
                            <h6 class="profile-heading-6">MON - FRI, 8AM - 7PM</h6>
                        </div><!-- right-area -->
                    </div><!-- info -->
                </div><!-- col-sm-4 -->

                <div class="col-sm-6 col-md-6 col-lg-4 pr-0">
                    <div class="info">
                        <i class="icon fas fa-at"></i>
                        <div class="right-area">
                            <h5 v-if="userData.employeeLogin" class="profile-heading-5">{{userData.employeeLogin.email}}</h5>
                            <h6 class="profile-heading-6">REPLY IN 24 HOURS</h6>
                        </div><!-- right-area -->
                    </div><!-- info -->
                </div><!-- col-sm-4 -->
            </div><!-- row -->
        </div><!-- heading-wrapper -->
        <!-- <span  class="profile-link"><a v-if="false" class="downlad-btn" href="#">Download CV</a></span> -->
    </div><!-- container -->
</header>
</template>

<script>
export default {
    props:['userData']
}
</script>
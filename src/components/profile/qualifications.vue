<template>
<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="education">
    <div class="w-100">
        <slot></slot>
        <h2 class="mb-5">Education</h2>
        <!-- <p class="text-info" v-if="!userData.qualifications.length"> No Records Found </p> -->
        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5" :key="degree._id" v-for="degree in userData.qualifications">
            <div class="resume-content">
                <h3 class="mb-0">{{degree.instituteName}}</h3>
                <div class="subheading mb-3">{{degree.degreeName}}</div>
                <!-- <div>Computer Science - Web Development Track</div> -->
                <p>CGPA: {{degree.cgpa}} | Percentage: {{degree.percentage}}%</p>
            </div>
            <div class="resume-date text-md-right">
                <span class="text-primary">{{degree.yearOfPassing}}</span>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    props: ['userData']
}
</script>
<template>
<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="certifications">
    <div class="w-100">
        <slot></slot>
        <h2 class="mb-5">Certifications</h2>
        <!-- <p class="text-info" v-if="!userData.qualifications.length"> No Records Found </p> -->
        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5" :key="certification._id" v-for="certification in userData.certifications">
            <div class="resume-content">
                <h3 class="mb-0">{{certification.issuedBy}}</h3>
                <div class="subheading mb-3">{{certification.name}}</div>
                <!-- <div>Computer Science - Web Development Track</div> -->
                <p>{{certification.location}}</p>
            </div>
            <div class="resume-date text-md-right">
                <span class="text-primary">{{certification.issueDate}}</span>
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
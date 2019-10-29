<template>
    <section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="skills">
            <div class="w-100">
                <slot></slot>
                <h2 class="mb-5">Skills</h2>
                <div class="subheading mb-3">Programming Languages &amp; Tools</div>
                <ul class="fa-ul mb-0">
                    <li v-bind:key="skill.id" v-for="skill in userData.skills">
                        <i class="fa-li fa fa-check"></i>
                        {{skill}}
                    </li>
                </ul>
            </div>
        </section>
</template>

<script>
export default {
    props: ['userData']
}
</script>
<template>
<div :class="styleAdmin? 'card' : ''">
    <div :class="styleAdmin? 'card-body' : ''">
        <form @submit.prevent="$emit('return', newCertification, styleAdmin?certificate.empCertifications.id:'')">
                <legend v-if="styleAdmin">{{certificate.certification}}</legend>
                <div class="row">
                    <div :class="styleAdmin? 'col-sm-4' :'col-sm-6 col-12'">
                        <div class="form-group">
                            <label>Certification</label>
                            <select v-model="newCertification.certificateId" class="custom-select" required>
                                <option disabled selected value="">Please select one</option>
                                <option v-for="certificate in selectCertificates" :key="certificate.id" :value="certificate.id">{{certificate.certification}}</option>
                            </select>
                        </div>
                    </div>
                    <div :class="styleAdmin? 'col-sm-4' :'col-sm-6 col-12'">
                        <div class="form-group">
                            <label>Title</label>
                            <input v-model="newCertification.title" type="text" class="form-control" placeholder="Enter Certification Title" required>
                        </div>
                    </div>
                    <div :class="styleAdmin? 'col-sm-4' :'col-sm-6 col-12'">
                        <div class="form-group">
                            <label>Completion Date</label>
                            <input v-model="newCertification.completionDate" type="date" class="form-control" required>
                        </div>
                    </div>
                    <div :class="styleAdmin? 'col-sm-4' :'col-sm-6 col-12'">
                        <div class="form-group">
                            <label>Location</label>
                            <input v-model="newCertification.location" type="text" class="form-control" placeholder="Enter Location" required>
                        </div>
                    </div>
                    <div :class="styleAdmin? 'col-sm-8' :'col-12'">
                        <div class="form-group">
                            <label>Organization/Institute Name</label>
                            <input v-model="newCertification.organization" type="text" class="form-control" placeholder="Enter Organization/Institute Name" required>
                        </div>
                    </div>
                </div>
                <div :class="styleAdmin? 'add-button': 'modal-footer'">
                    <button v-if="certificate.id" @click.prevent="$emit('delete')" class="btn btn-danger">Delete</button>
                    <button type="submit" class="btn btn-primary">{{certificate.id? 'Update':'Save'}}</button>
                    <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
                </div>
        </form>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import {
    certificate
} from '@/constants'
export default {
    props: ['certificate', 'styleAs'],
    data() {
        return {
            newCertification: certificate.set(this.certificate),
            selectCertificates: null,
            styleAdmin: this.styleAs == 'admin' ? true : false
        }
    },
    methods: {
        async getCertificates() {
            const response = await UserService.getCertificates();
            response ? this.selectCertificates = response.data.data : ''
        },
    },
    mounted() {
        this.getCertificates();
    }
}
</script>
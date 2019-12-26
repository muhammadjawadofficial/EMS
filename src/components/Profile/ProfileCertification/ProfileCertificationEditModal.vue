<template>
<b-modal id="edit-certificate" title="Edit Certification" hide-footer>
    <template v-slot:default>
        <TheCertificateForm v-if="editCertificationIndex != null" :certificate="certificate" @return="editCertification" />
    </template>
</b-modal>
<!-- <div class="modal fade" id="edit-certification" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit Certification</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form v-if="editCertificationIndex != null">
                    <div class="form-group">
                        <label>Certification Name</label>
                        <input v-model="userData.certifications[editCertificationIndex].name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Issued By</label>
                        <input v-model="userData.certifications[editCertificationIndex].issuedBy" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Issued Date</label>
                        <input v-model="userData.certifications[editCertificationIndex].issueDate" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input v-model="userData.certifications[editCertificationIndex].location" type="text" class="form-control">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button @click.prevent="editCertification()" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div> -->
</template>

<script>
import UserService from '@/services/user.service'
import TheCertificateForm from '@/components/common/TheCertificateForm'
import {
    certificate
} from '@/constants'
export default {
    props: ['certification', 'editCertificationIndex'],
    components: {
        TheCertificateForm
    },
    methods: {
        async editCertification(certificate) {
            const response = await UserService.editCertification(certificate, this.$route.query.id, this.certification.empCertifications.id)
            if (response) {
                this.$emit('update')
                this.$bvModal.hide('edit-certificate')
            }
        }
    },
    computed: {
        certificate: function () {
            return certificate.set(this.certification)
        }
    },
}
</script>

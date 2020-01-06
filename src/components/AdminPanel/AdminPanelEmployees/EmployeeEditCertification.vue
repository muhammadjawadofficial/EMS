<template>
<div>
    <div class="add-button">
        <!-- <button class="btn btn-primary float-right">Add Certificate</button> -->
        <b-button class="float-right" @click="$bvModal.show('add-certificate')" variant="primary"><i class="fas fa-plus"></i> Add Certificate</b-button>
    </div>
    <div class="card" v-if="certificates.length == 0">
        <div class="card-body">
            <h3>No certificates found against this employee</h3>
        </div>
    </div>
    <div v-for="(certificate, index) in certificates" :key="index">
        <TheCertificateForm :certificate="certificate" styleAs="admin" @return="editCertification" @delete="deleteCertification(index)" />
    </div>
    <ProfileCertificationAddModal @update="$emit('update')" />
</div>
</template>

<script>
import TheCertificateForm from '@/components/common/TheCertificateForm'
import ProfileCertificationAddModal from '@/components/Profile/ProfileCertification/ProfileCertificationAddModal'
import UserService from '@/services/user.service'
export default {
    props: ['certificates'],
    components: {
        TheCertificateForm,
        ProfileCertificationAddModal
    },
    methods: {
        async editCertification(certificate, empCertificationId) {
            const response = await UserService.editCertification(certificate, this.$route.params.id, empCertificationId)
            if (response) {
                this.$emit('update')
            }
        },
        async deleteEmployeeCertification(certificationIndex) {

            const response = await UserService.deleteCertification(this.$route.params.id, this.certificates[certificationIndex].empCertifications.id)
            if (response)
                this.$emit('update')
        }
    },
}
</script>
<template>
<b-modal id="add-certificate" title="Add Certification" hide-footer>
    <template v-slot:default>
        <TheCertificateForm :certificate="newCertification" @return="addCertification" />
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import {
    certificate
} from '@/constants'
import TheCertificateForm from '@/components/common/TheCertificateForm'
export default {
    data() {
        return {
            newCertification: certificate.get(),
        }
    },
    components: {
        TheCertificateForm
    },
    methods: {
        async addCertification(certificate) {

            var employeeID = null
            if (this.$route.query.id)
                employeeID = this.$route.query.id
            if (this.$route.params.id)
                employeeID = this.$route.params.id
            const response = await UserService.addCertificate(certificate, employeeID)
            if (response) {
                this.$emit('update')
                this.$bvModal.hide('add-certificate')
            }
        }
    },
}
</script>

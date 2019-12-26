<template>
<form @submit.prevent="updateCertificate" class="col-md-5 text-center m-auto">
    <div class="form-group">
        <h4 v-if="certificate.id">Edit Certificate</h4>
        <h4 v-else>Add Certificate</h4>
        <input type="text" class="form-control" v-model="editCertficate" required>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <button @click.prevent="$emit('canceled')" class="btn btn-secondary">Cancel</button>
</form>
</template>

<script>
import UserService from '@/services/user.service'
export default {
    props: ['certificate'],
    data() {
        return {
            editCertficate: this.certificate.certification
        }
    },
    methods: {
        async updateCertificate() {
            var response = null;
            if (this.certificate.id)
                response = await UserService.updateCertificate(this.certificate.id, this.editCertficate)
            else
                response = await UserService.addCertificateAdmin(this.editCertficate)
            // console.log(this.editCertficate)
            if (response)
                this.$emit('update')
            console.log(response)
        }
    },
    watch: {
        certificate() {
            this.editCertficate = this.certificate.certification
        }
    }
}
</script>

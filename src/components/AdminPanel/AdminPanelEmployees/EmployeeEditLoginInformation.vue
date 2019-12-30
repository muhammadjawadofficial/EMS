<template>
<TheCredentialForm :email="email" styleAs="admin" @return="updateLoginInformation" />
<!-- <form>
    <fieldset>
        <legend>Edit Login Information</legend>
        <div class="row row-space">
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Email address</label>
                    <input v-model="newLoginInformation.email" type="email" class="form-control" />
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" />
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
    </fieldset>
</form> -->
</template>

<script>
import TheCredentialForm from '@/components/common/TheCredentialForm'
import UserService from '@/services/user.service'
export default {
    props: ['email'],
    components: {
        TheCredentialForm
    },
    methods: {
        async updateLoginInformation(loginInformation) {
            doconsole(loginInformation)
            const response = await UserService.updateCredentials(loginInformation, this.$route.params.id)
            if (response) {
                loginInformation.currentPassword = ''
                loginInformation.password = ''
            }
            doconsole(response)
        }
    },
}
</script>

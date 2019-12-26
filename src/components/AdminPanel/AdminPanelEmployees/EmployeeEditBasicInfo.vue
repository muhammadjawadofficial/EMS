<template>
<TheBasicInfoForm :userData="userInfo" styleAs="admin" @return="editProfile" />
</template>

<script>
import UserService from '@/services/user.service'
import TheBasicInfoForm from '@/components/common/TheBasicInfoForm'
export default {
    props: ['userInfo'],
    components: {
        TheBasicInfoForm
    },
    methods: {
        async editProfile(updatedInformation) {
            console.log(updatedInformation)
            const response = await UserService.editProfile(updatedInformation, this.$route.params.id)
            console.log(response)
        }
    }
}
</script>

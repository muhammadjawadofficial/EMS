<template>
<TheBasicInfoForm :userData="userInfo" styleAs="admin" @return="editProfile" />
</template>

<script>
import UserService from '@/services/user.service'
import TheBasicInfoForm from '@/components/common/TheBasicInfoForm'
import {
    basicInfo
} from '@/constants'
export default {
    props: ['userInfo'],
    components: {
        TheBasicInfoForm
    },
    methods: {
        async editProfile(updatedInformation) {
            const data = basicInfo.set(updatedInformation)
            const response = await UserService.editProfile(data, this.$route.params.id)
            if (response)
                this.$emit('update')
        }
    }
}
</script>

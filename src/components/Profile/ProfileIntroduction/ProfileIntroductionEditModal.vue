<template>
<b-modal id="edit-about" title="Edit About" hide-footer>
    <template v-slot:default>
        <TheBasicInfoForm :userData="updatedInformation" @return="edit"/>
    </template>
</b-modal>
</template>

<script>
import UserService from '@/services/user.service'
import {
    basicInfo
} from '@/constants'
import TheBasicInfoForm from '@/components/common/TheBasicInfoForm'
export default {
    data() {
        return {
            updatedInformation: basicInfo.get()
        }
    },
    components: {
        TheBasicInfoForm
    },
    props: ['userData'],
    methods: {
        async edit(updatedInformation) {
            const response = await UserService.editProfile(updatedInformation, this.$route.query.id)
            if (response) {
                this.$store.dispatch('SET_USER_INFO')
                this.$emit('update')
                this.$bvModal.hide('edit-about')
            }
        },
    },
    mounted() {
        this.updatedInformation = basicInfo.set(this.userData)
    },
    watch: {
        userData(){
            this.updatedInformation = basicInfo.set(this.userData)
        }
    },
}
</script>

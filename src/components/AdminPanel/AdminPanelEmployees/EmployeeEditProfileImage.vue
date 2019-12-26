<template>
<div class="card">
    <div class="card-body56">
        <div class="col text-center mb-2 mt-2">
            <img :src="dataUrl" alt="user profile image" width="200px">
        </div>
        <div class="col text-center">
            <changeProfilePicture @update="$emit('update')" styleAs="admin" />
        </div>
    </div>
</div>
</template>

<script>
import changeProfilePicture from '@/components/common/changeProfilePicture'
import {
    image
} from '@/constants'

export default {
    props: ['image'],
    components: {
        changeProfilePicture
    },
    computed: {
        dataUrl() {
            return image.convert(this.image)
        }
    },
}
</script>

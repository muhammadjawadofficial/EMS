<template>
<div>
    <div v-if="styleAdmin">
        <b-button @click="changePicture" variant="primary"><i class="fas fa-upload"></i> Upload Image</b-button>
        <b-button @click="changePicture('delete')" variant="outline-dark">Use Default Picture</b-button>
    </div>
    <div v-else>
        <div class="pointer"><a @click="changePicture('delete')"><i class="fas fa-user"></i> Default</a></div>
        <div class="pointer"><a @click="changePicture"><i class="fas fa-camera"></i> Upload</a></div>
    </div>
    <div class="inputTyleFile">
        <input class="inputfile" id="fileInput" accept="image/*" ref="file" type="file" @change="onFileChanged">
    </div>
</div>
</template>

<script>
import {
    image
} from '@/constants'
import UserService from '@/services/user.service'
export default {
    props: ['styleAs'],
    data() {
        return {
            selectedFile: null,
            styleAdmin: this.styleAs == 'admin' ? true : false
        }
    },
    methods: {
        changePicture(action) {
            if (action == 'delete') {
                console.log('delete')
                this.onUpload()
            } else
                document.getElementById("fileInput").click();
        },
        onFileChanged() {
            var image = this.$refs.file.files[0]
            var imageType = image.type.split('/')[0]
            // if (imageType != 'image')
            //     this.$toasted.global.error({
            //         message: 'Please select a valid image'
            //     })
            // else if (image.size > 65536)
            //     this.$toasted.global.error({
            //         message: 'Profile image size is max 65KB'
            //     })
            // else {
                this.selectedFile = image;
                this.onUpload();
            // }
        },
        onUpload() {
            console.log('hello')
            var formData = {}
            if (this.selectedFile) {
                console.log('fileselected')
                formData = new FormData();
                formData.append('image', this.selectedFile, this.selectedFile.name);
            }
            this.uploadImage(formData)
        },
        async uploadImage(imageData) {
            console.log('uplodad')
            var employeeId = null
            this.$route.params.id ? employeeId = this.$route.params.id : employeeId = this.$route.query.id
            const response = await UserService.changeProfilePicture(imageData, employeeId)
            if (response) {
                console.log(response)
                this.$emit('update')
                this.selectedFile = null
                this.$refs.file.value = ""
            }
        },
    },
}
</script>

<style scoped>
.inputTyleFile {
    height: 0px;
    overflow: hidden
}
.pointer {
    cursor: pointer
}
</style>

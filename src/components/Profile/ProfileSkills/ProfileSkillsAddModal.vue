<template>
<div class="modal fade" id="add-skill" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add a Skill</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form>

                    <div class="form-group">
                        <label>Skill Name</label>
                        <input v-model="newSkill" type="text" class="form-control">
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button @click.prevent="addSkill()" class="btn btn-primary" data-dismiss="modal">Save</button>
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
            </div>
        </div>
    </div>
</div>
<!-- <modal name="add-skill" style="color:black" height="auto" width="60%" left="20%" right="20%" top="20%" resizeable scrollable>
    <div class="p-3">
        <h2> Add a Skill </h2>
        <form>

            <div class="form-group">
                <label>Skill Name</label>
                <input v-model="newSkill" type="text" class="form-control">
            </div>

            <button @click.prevent="addSkill()" class="btn btn-primary">Save</button>
        </form>
    </div>
</modal> -->
</template>

<script>
import UserService from '@/services/user.service'
export default {
    data() {
        return {
            newSkill: null
        }
    },
    props: ['userData'],
    methods: {
        hide() {
            this.$modal.hide('add-skill')
        },
        async addSkill() {
            const response = await UserService.addSkill(this.newSkill)
            console.log(response)
            if (response.status == 200) {
                this.userData.skills.push(this.newSkill)
                this.newSkill = ''
            }
            this.hide()
        }
    }
}
</script>

<template>
<div class="container" style="margin: 4 !important">
    <h1 style="text-align: center" class="p-lg-5"> List of Employees </h1>
    <p class="text-info" v-if="usersList[0] == null"> No Employee Records Found </p>
    <div class="row mb-2">
        <button @click="logout" class="btn btn-danger ml-auto mr-3"><i class="fas fa-sign-out-alt"></i> Logout</button>
        <button v-if="canDelete" @click="addEmployee" class="btn btn-primary mr-3">
            <i class="fas fa-plus"></i> Add New Employee</button>
    </div>
    <div v-if="usersList[0] != null">
        <div v-bind:key="user.key" v-for="(user, index) in usersList">
            <div class="card mb-3" v-if="!user.isAdmin">
                <div class="row no-gutters">
                    <div class="col-auto">
                        <img src="//placehold.it/200" class="img-fluid" alt="">
                    </div>
                    <div class="col">
                        <div class="card-block px-2">
                            <h4 class="card-title">{{user.firstName}} {{user.lastName}}</h4>
                            <p class="card-text">Description</p>
                            <button @click="showProfile(user)" class="btn btn-primary"><i class="far fa-user-circle"></i> View Profile</button>
                            <button v-if="canDelete" @click="deleteProfile(user, index)" class="btn btn-danger"><i class="fas fa-trash"></i> Delete Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            usersList: [],
            canDelete: false,
        }
    },
    methods: {
        showProfile(x) {
            this.$router.replace({
                path: `/profile/${x._id}`
            });
        },
        deleteProfile(x, index) {
            // console.log(this.usersList.indexOf(x))
            if (confirm("Do you really want to delete " + x.firstName + " " + x.lastName + " profile")) {
                axios.delete(`http://localhost:5000/users/deleteProfile/${x._id}`, {
                        headers: {
                            'x-auth-token': localStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        // this.usersList = response.data;
                        this.usersList.splice(index, 1);
                        console.log(response)

                    })
                    .catch((e) => {
                        console.log(e)
                    })
                console.log(this.usersList)
            }
        },
        addEmployee() {
            this.$router.replace({
                path: '/addEmployee'
            });
        },
        logout() {
            localStorage.clear();
            this.goBackToLogin();
        },
        goBackToLogin() {
            this.$router.replace({
                path: '/'
            });
        },
        checkSession() {
            if (!localStorage.getItem('token')) {
                return false
            } else {
                return true
            }
        },
    },
    beforeMount() {
        if (this.checkSession()) {
            if (localStorage.getItem('isAdmin') == "true")
                this.canDelete = true;
            axios.get('http://localhost:5000/users')
                .then((response) => {
                    this.usersList = response.data;
                    console.log(this.usersList)
                })
                .catch((e) => {
                    console.log(e)
                })
        } else {
            this.goBackToLogin();
        }
    },
}
</script>

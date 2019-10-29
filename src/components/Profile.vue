<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
        <a class="navbar-brand js-scroll-trigger" @click="$scroll('about')">
            <!-- href="#page-top" -->
            <!-- page-top -->
            <span class="text-white d-block d-lg-none">{{userData.firstName}} {{userData.lastName}}</span>
            <span class="d-none d-lg-block">
                <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="../assets/logo.png" alt="">
            </span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav navbar-nav">
                <li class="nav-item" :class="[ current === 'about' ? 'active' : '']">
                    <!-- <a class="nav-link js-scroll-trigger" href="#about">About</a> -->
                    <a class="nav-link" @click="$scroll('about'), current='about'">About</a>
                </li>
                <li class="nav-item" :class="[ current === 'certifications' ? 'active' : '']">
                    <!-- <a class="nav-link js-scroll-trigger" href="#experience">Experience</a> -->
                    <a class="nav-link" @click="$scroll('certifications'), current='certifications'">certifications</a>
                </li>
                <li class="nav-item" :class="[ current === 'education' ? 'active' : '']">
                    <!-- <a class="nav-link js-scroll-trigger" href="#education">Education</a> -->
                    <a class="nav-link" @click="$scroll('education'), current='education'">Education</a>
                </li>
                <li class="nav-item" :class="[ current === 'skills' ? 'active' : '']">
                    <!-- <a class="nav-link js-scroll-trigger" href="#skills">Skills</a> -->
                    <a class="nav-link" @click="$scroll('skills'), current='skills'">Skills</a>
                </li>
                <button @click="goBackToListUsers" class="btn btn-warning m-2"><i class="fa fa-users"></i> Back to Employee List</button>
                <button @click="logout" style="float: right" class="btn btn-danger m-2"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </ul>
        </div>
    </nav>

    <div class="container-fluid">
        <about :userData="userData">
            <span v-if="canEdit" style="float:right" class="text-primary pt-3"><button @click="show('edit-about')" class="btn btn-warning"><i class="fas fa-edit"></i></button></span>
        </about>

        <hr class="m-0">

        <certifications :userData="userData">
            <span v-if="canEdit" style="float:right" class="text-primary pt-3"><button @click="show('add-certification')" class="btn btn-warning"><i class="fas fa-plus"></i></button></span>
        </certifications>

        <hr class="m-0">

        <qualifications :userData="userData">
            <span v-if="canEdit" style="float:right" class="text-primary pt-3"><button @click="show('add-education')" class="btn btn-warning"><i class="fas fa-plus"></i></button></span>
        </qualifications>

        <hr class="m-0">

        <skills :userData="userData">
            <span v-if="canEdit" style="float:right" class="text-primary pt-3"><button @click="show('add-skill')" class="btn btn-warning"><i class="fas fa-plus"></i></button></span>
        </skills>
    </div>
    <modal name="edit-about" height="auto" resizable scrollable>
        <div class="p-3">
            <h2> Edit About </h2>
            <form>
                <div class="form-group">
                    <label>First Name</label>
                    <input v-model="userData.firstName" type="text" class="form-control ">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input v-model="userData.lastName" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="userData.email" type="email" class="form-control">
                </div>
                <button @click.prevent="edit('edit-about')" class="btn btn-primary">Update</button>
            </form>
            <!-- <button @click="hide">hide</button> -->
        </div>
    </modal>

    <modal name="add-skill" height="auto" resizable scrollable>
        <div class="p-3">
            <h2> Add a Single Skill </h2>
            <form>
                <div class="form-group">
                    <label>Skill</label>
                    <input v-model="newSkill" type="text" class="form-control">
                </div>
                <button @click.prevent="edit('add-skill')" class="btn btn-primary">Update</button>
            </form>
        </div>
    </modal>

    <modal name="add-education" height="auto" resizable scrollable>
        <div class="p-3">
            <h2> Add an Education </h2>
            <form>

                <div class="form-group">
                    <label>Degree Name</label>
                    <input v-model="newEducation.degreeName" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Year of Passing</label>
                    <input v-model="newEducation.yearOfPassing" type="number" class="form-control">
                </div>
                <div class="form-group">
                    <label>Institute Name</label>
                    <input v-model="newEducation.instituteName" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Percentage</label>
                    <input v-model="newEducation.percentage" type="number" class="form-control">
                </div>
                <div class="form-group">
                    <label>CGPA</label>
                    <input v-model="newEducation.cgpa" type="number" class="form-control">
                </div>

                <button @click.prevent="edit('add-education')" class="btn btn-primary">Save Degree</button>
            </form>
        </div>
    </modal>

    <modal name="add-certification" height="auto" resizable scrollable>
        <div class="p-3">
            <h2> Add an Certification </h2>
            <form>

                <div class="form-group">
                    <label>Certification Name</label>
                    <input v-model="newCertification.name" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Issued By</label>
                    <input v-model="newCertification.issuedBy" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Issued Date</label>
                    <input v-model="newCertification.issueDate" type="number" class="form-control">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input v-model="newCertification.location" type="text" class="form-control">
                </div>

                <button @click.prevent="edit('add-certification')" class="btn btn-primary">Save Certification</button>
            </form>
        </div>
    </modal>

</div>
</template>

<script>
import Vue from 'vue'
import about from './profile/about.vue'
import skills from './profile/skills.vue'
import qualifications from './profile/qualifications.vue'
import certifications from './profile/certifications.vue'

Vue.prototype.$scroll = function (element) {
    window.scrollTo(0, document.getElementById(element).offsetTop);
    document.getElementById(element).classList.add('active');
    document.getElementById('navbarSupportedContent').classList.remove('show');
};

export default {
    name: 'Home',
    components: {
        'about': about,
        'skills': skills,
        'qualifications': qualifications,
        'certifications': certifications
    },
    // props: ['button', 'userData2'],
    data() {
        return {
            headers: null,
            canEdit: true,
            newSkill: '',
            newCertification: {
                name: null,
                issuedBy: null,
                issueDate: null,
                location: null
            },
            newEducation: {
                degreeName: null,
                yearOfPassing: null,
                instituteName: null,
                percentage: null,
                cgpa: null
            },
            current: 'about',
            userData: []
        }
    },
    methods: {
        show(modalName) {
            this.$modal.show(modalName);
        },
        hide(modalName) {
            this.$modal.hide(modalName);
        },
        getLength(x) {
            return x.length;
        },
        goBackToListUsers() {
            this.$router.replace({
                path: '/listusers'
            });
        },
        goBackToLogin() {
            this.$router.replace({
                path: '/'
            });
        },
        checkSession() {
            if (!localStorage.getItem('token')) {
                this.goBackToLogin();
                return false
            } else {
                return true
            }
        },
        logout() {
            localStorage.clear();
            this.goBackToLogin();
        },
        edit(modelName) {
            switch (modelName) {
                case 'edit-about':
                    // console.log(this.$route.params.id + this.userData.firstName);

                    axios.patch(`http://localhost:5000/Users/editProfile`, {
                            firstName: this.userData.firstName,
                            lastName: this.userData.lastName,
                            email: this.userData.email
                        }, this.headers)
                        .then((response) => {
                            console.log(response)
                        })
                    break;
                case 'add-skill':
                    if (this.newSkill.trim() != "") {
                        axios.put('http://localhost:5000/Users/addSkills', {
                                skills: this.newSkill.trim()
                            }, this.headers)
                            .then((response) => {
                                console.log(response)
                                this.userData.skills.push(this.newSkill)
                                this.newSkill = ''
                            })
                    }
                    break;
                case 'add-education':
                    axios.put(`http://localhost:5000/Users/addQualification`, {
                            qualifications: this.newEducation
                        }, this.headers)
                        .then((response) => {
                            console.log(response)
                            console.log('success')
                            this.userData.qualifications.push({
                                degreeName: this.newEducation.degreeName,
                                yearOfPassing: this.newEducation.yearOfPassing,
                                instituteName: this.newEducation.instituteName,
                                percentage: this.newEducation.percentage,
                                cgpa: this.newEducation.cgpa
                            })
                            this.newEducation.degreeName = null,
                                this.newEducation.yearOfPassing = null,
                                this.newEducation.instituteName = null,
                                this.newEducation.percentage = null,
                                this.newEducation.cgpa = null
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    break;
                case 'add-certification':
                    axios.put(`http://localhost:5000/Users/addCertifications/${this.$route.params.id}`, {
                            certifications: this.newCertification
                        })
                        .then((response) => {
                            console.log(response)
                            console.log('success')
                            this.userData.certifications.push({
                                name: this.newCertification.name,
                                issuedBy: this.newCertification.issuedBy,
                                issueDate: this.newCertification.issueDate,
                                location: this.newCertification.location
                            })
                            this.newCertification.name = null
                            this.newCertification.issuedBy = null
                            this.newCertification.issueDate = null
                            this.newCertification.location = null
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    break;
                default:
                    break;
            }
            this.hide(modelName);
        }
    },
    beforeMount() {
        if (this.checkSession()) {
            this.headers = {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
            let userId = this.$route.params.id;
            // if (!this.$session.get('isAdmin')) {
            //     if (userId != this.$session.get('currentEmployeeId')) {
            //         this.$router.replace({
            //             path: '/profile/' + this.$session.get('currentEmployeeId')
            //         });
            //         userId = this.$session.get('currentEmployeeId')
            //     }
            // }
            console.log(localStorage.getItem('isAdmin'))
            console.log(localStorage.getItem('currentEmployeeId'))
            console.log(userId)

            if (localStorage.getItem('isAdmin') == "false") {
                console.log('is not admin')
                if (userId != localStorage.getItem('currentEmployeeId')) {
                    console.log('is not same')
                    this.canEdit = false
                }
            }

            console.log(localStorage.getItem('isAdmin'))
            axios.get(`http://localhost:5000/users/viewProfile/${userId}`)
                .then((response) => {
                    this.userData = response.data
                    console.log(this.userData)
                })
        }
    },
}
</script>

<style>
li.is-active a {
    border-bottom-color: #000000;
    color: #000000;
    border-bottom: 3px solid;
    font-weight: bold;
}
</style>

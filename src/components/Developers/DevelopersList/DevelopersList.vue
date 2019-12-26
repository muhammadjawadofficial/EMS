<template>

<section id="team" class="mt-5 list-section">
    <div class="container">
        <h1 class="section-title pb-2">OUR TEAM</h1>

        <!-- Pagination Start -->
        <nav>
            <ul class="pagination justify-content-center">
                <div class="dropdown">
                    <button class="btn active dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">#{{size}}</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <!-- 
                            User can select that how many record he want to see.
                            i.e., 3,6,9 in this case
                         -->
                        <a class="dropdown-item" v-for="n in 3" :key="n" @click="[size = n*3, pageNumber=0]">{{n*3}}</a>
                    </div>
                </div>
                <!-- 
                    This is the previous button that will take the user to the previous page
                    This button will be disabled if current page number reaches to zero (0)
                    i.e., there is no previous page left    
                -->
                <li class="page-item">
                    <button class="page-link"  @click="prevPage" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </button>
                </li>
                <!-- 
                    Displaying available number of pages based on page count. If page count changes this will also change
                    e.g., page count is 3. This will display 1, 2, 3. 
                -->
                <!-- <li class="page-item" v-for="i in pageCount" :key="i">
                    <a :class="[pageNumber === i-1 ? 'active' : '']" class="page-link" @click="pageNumber=i-1">{{i}}</a>
                </li> -->
                <!-- 
                    This is the next button that will take the user to the next page
                    This button will be disabled if current page number reaches to page count (i.e., total number of pages that can be shown)
                    i.e., there is no previous page left    
                -->
                <li class="page-item">
                    <button class="page-link" @click="nextPage" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
        <!-- Pagination End-->

        <div class="row">
            <!-- Paginated List of Developers. If pagination size is 3 it will display 3 record only-->
            <div class="col-xs-12 col-sm-6 col-md-4" :key="p.key" v-for="p in usersList">
                <!-- Single Developer information will be rendered in this card component -->
                <DevelopersListCard :user=p @buttonClicked="btnClicked"></DevelopersListCard>
            </div>
            <!-- Paginated List of Developers End-->
        </div>
    </div>
</section>
</template>

<script>
//Developer card component
import DevelopersListCard from './DevelopersListCard/DevelopersListCard'
export default {
    //getting information of all developers from prop (userList)
    props: ['usersList', 'pNumber', 'pSize'],
    data() {
        return {
            //default size of the pagination
            size: this.pSize,
            //default page number of the pagination
            pageNumber: this.pNumber
        }
    },
    components: {
        //registering the developer card component
        DevelopersListCard
    },
    methods: {
        //this will increment the page number by 1
        nextPage() {
            this.pageNumber++;
        },
        //this will decrement the page number by 1
        prevPage() {
            this.pageNumber--;
        },
        //when user clicks on any view profile button this will be trigger
        btnClicked(object){
            if(object.buttonAction == 'view')
                this.showProfile(object)
        },
        //used to show the profile of the developer on which the user clicks (on ViewProfile button)
        showProfile(x) {
            //redirect to the requested profile
            this.$router.replace({
                path: `/pageProfile?id=${x.id}`
            });
        },
        //if an admin wants to delete the profile of a developer
        deleteProfile(x, index) {
            if (confirm("Do you really want to delete " + x.firstName + " " + x.lastName + " profile")) {
                axios.delete(server + `users/deleteProfile/${x._id}`, headers)
                    .then((response) => {
                        // this.usersList = response.data;
                        this.usersList.splice(index, 1);
                        console.log(response)

                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        },
    },
    computed: {
        //this will trigger if the userList changes
        //this will calculate the total page count
        // pageCount() {
        //     let l = this.usersList.length,
        //         s = this.size;
        //     return Math.ceil(l / s);
        // },
        // //this will filter the paginated data
        // paginatedData() {
        //     const start = this.pageNumber * this.size,
        //         end = start + this.size;
        //     return this.usersList
        //         .slice(start, end);
        // }
    },
}
</script>

<style>
/**
Stylesheet used for the list
*/
@import url('./DeveloperList.css');

/**
current page number' active class
*/
.pagination .active {
    background-color: #03a9f4;
    color: #fff !important;
}
</style>

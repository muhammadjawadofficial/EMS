<template>
<section id="team" class="mt-5 list-section">
    <div class="container">
        <h1 class="section-title pb-2">OUR TEAM</h1>

        <div class="row">
            <!-- Paginated List of Developers. If pagination size is 3 it will display 3 record only-->
            <div class="col-xs-12 col-sm-6 col-md-4" :key="user.key" v-for="user in usersList">
                <!-- Single Developer information will be rendered in this card component -->
                <DevelopersListCard :user=user></DevelopersListCard>
            </div>
            <!-- Paginated List of Developers End-->
        </div>

        <!-- Pagination Start -->
        <nav>
            <ul class="pagination justify-content-center">
                <div class="dropdown cursor-pointer">
                    <button class="btn active dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">#{{size}}</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <!-- 
                            User can select that how many record he want to see.
                            i.e., 3,6,9 in this case
                         -->
                        <a class="dropdown-item" v-for="n in 3" :key="n" @click="$emit('changeSize', n*3)">{{n*3}}</a>
                    </div>
                </div>
                <!-- 
                    This is the previous button that will take the user to the previous page
                    This button will be disabled if current page number reaches to zero (0)
                    i.e., there is no previous page left    
                -->
                <li class="page-item">
                    <button class="page-link" :disabled="pageNumber <= 0" :class="pageNumber <= 0 ? 'disabled':''" @click="$emit('previousPage')" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </button>
                </li>
                <!-- 
                    Displaying available number of pages based on page count. If page count changes this will also change
                    e.g., page count is 3. This will display 1, 2, 3. 
                -->
                <li class="page-item cursor-pointer" v-for="i in pageCount" :key="i">
                    <a :class="[pageNumber === i-1 ? 'active' : '']" class="page-link" @click="$emit('jumpToPageNumber', i-1)">{{i}}</a>
                </li>
                <!-- 
                    This is the next button that will take the user to the next page
                    This button will be disabled if current page number reaches to page count (i.e., total number of pages that can be shown)
                    i.e., there is no previous page left    
                -->
                <li class="page-item">
                    <button class="page-link" :disabled="pageNumber >= pageCount-1" :class="pageNumber >= pageCount-1 ? 'disabled':''" @click="$emit('nextPage')" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
        <!-- Pagination End-->
    </div>
</section>
</template>

<script>
//Developer card component
import DevelopersListCard from './DevelopersListCard/DevelopersListCard'
export default {
    //getting information of all developers from prop (userList)
    props: ['usersList', 'pNumber', 'pSize', 'pCount'],
    data() {
        return {
            //default size of the pagination
            size: this.pSize,
            //default page number of the pagination
            pageNumber: this.pNumber,
            pageCount: this.pCount
        }
    },
    components: {
        //registering the developer card component
        DevelopersListCard
    },
    watch: {
        pCount() {
            this.pageCount = this.pCount
        },
        pNumber() {
            this.pageNumber = this.pNumber
        },
        pSize() {
            this.size = this.pSize
        }
    }
}
</script>

<style>
/**
Stylesheet used for the list
*/
@import url('./DeveloperList.css');
</style><style scoped>
/**
current page number' active class
*/
.pagination .active {
    background-color: #03a9f4;
    color: #fff !important;
}

.pagination .disabled {
    color: grey !important;
    cursor: not-allowed;
}

.cursor-pointer {
    cursor: pointer
}

.pagination .dropdown-menu a:hover {
    background-color: lightgray
}

.pagination .dropdown-menu {
    min-width: 3rem;
}
</style>

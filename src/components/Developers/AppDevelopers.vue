<template>
<div>
    <!--
    This component will render:
    1. Developer List with their basic information
    2. Pagination based on total number of users

    List is based on the 'userList' prop
     -->
    <DevelopersList 
    :usersList="usersList" 
    :pNumber="pageNumber" 
    :pSize="pageSize" 
    :pCount="pageCount" 
    @previousPage="prevPage" 
    @nextPage="nextPage" 
    @jumpToPageNumber="jumpToPage"
    @changeSize="changePageSize"
    
    ></DevelopersList>
</div>
</template>

<script>
//Developer List Component
import DevelopersList from './DevelopersList/DevelopersList'

//User Service used to call API(s)
import UserService from '@/services/user.service'

export default {
    data() {
        return {
            //information of the developers will be stored here
            usersList: [],
            pageNumber: 0,
            pageSize: 3,
            pageCount: null,
        }
    },
    components: {
        //registering the list of developer component
        DevelopersList,
    },
    methods: {
        nextPage() {
            if (this.pageNumber < this.pageCount - 1) {
                this.pageNumber = this.pageNumber + 1
            }
        },
        prevPage() {
            if (this.pageNumber > 0) {
                this.pageNumber = this.pageNumber - 1
            }
        },
        jumpToPage(index) {
            if (index < this.pageCount) {
                this.pageNumber = index
            }
        },
        changePageSize(pSize){
            this.pageSize = pSize
            this.pageNumber = 0
        }
    },
    computed: {
        //function that is used to fetch the records of all developers
        getUsers: async function () {
            const response = await UserService.getUsersDetailsPaginated(this.pageNumber, this.pageSize)
            //storing developer information in the userList array
            this.pageCount = Math.ceil(response.data.data.count / this.pageSize)
            this.usersList = response.data.data.rows
        }
    },
    watch:{
        pageNumber(){
            this.getUsers
        },
        pageSize(){
            this.getUsers
        }
    },
    mounted() {
        //initializing the userList array
        this.getUsers;
    },
}
</script>

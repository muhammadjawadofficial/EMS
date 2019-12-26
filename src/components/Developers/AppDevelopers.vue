<template>
<div>
    <!--
    This component will render:
    1. Developer List with their basic information
    2. Pagination based on total number of users

    List is based on the 'userList' prop
     -->
    <DevelopersList :usersList="usersList" :pNumber="pageNumber" :pSize="pageSize"></DevelopersList>
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
            pageSize: 3
        }
    },
    components: {
        //registering the list of developer component
        DevelopersList,
    },
    methods: {

        //function that is used to fetch the records of all developers
        getUsers: async function () {
            const response = await UserService.getUsersDetailsPaginated(this.pageNumber, this.pageSize)
            //storing developer information in the userList array
            this.usersList = response.data.data
            doconsole(this.usersList)
        },
    },
    mounted() {
        //initializing the userList array
        this.getUsers();
    },
}
</script>

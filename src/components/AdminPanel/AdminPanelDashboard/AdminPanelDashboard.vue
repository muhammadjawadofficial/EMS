<template>
<div>
    <div class="row">
        <div class="col-lg-4 col-12">
            <div class="card">
                <div class="row">
                    <div class="col-6 m-auto pr-0">
                        <h4 class="pl-2">
                            Total Employees
                        </h4>
                    </div>
                    <div class="col-6">
                        <Progress :radius="50" strokeColor="#392bc0" :strokeWidth="12" value="100">
                            <template v-slot:default>
                                <countTo :startVal='startVal' :endVal='totalEmployees' :duration='3000'></countTo>
                            </template>
                        </Progress>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="row">
                    <div class="col-6 m-auto pr-0">
                        <h4 class="pl-2">
                            Total Employees
                        </h4>
                    </div>
                    <div class="col-6">
                        <Progress :radius="50" strokeColor="#392bc0" :strokeWidth="12" value="100">
                            <template v-slot:default>
                                <countTo :startVal='startVal' :endVal='totalEmployees' :duration='3000'></countTo>
                            </template>
                        </Progress>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="row">
                    <div class="col-6 m-auto pr-0">
                        <h4 class="pl-2">
                            Total Employees
                        </h4>
                    </div>
                    <div class="col-6">
                        <Progress :radius="50" strokeColor="#392bc0" :strokeWidth="12" value="100">
                            <template v-slot:default>
                                <countTo :startVal='startVal' :endVal='totalEmployees' :duration='3000'></countTo>
                            </template>
                        </Progress>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-12">
            <div class="card">
                <div class="card-header card-header-primary">
                    Total Number of Employees
                </div>
                <Chart :height="250" class="p-2" :chart-data="dataSkillCollection" :options="options"></Chart>
            </div>
        </div>
        <div class="col-sm-6 col-12">
            <div class="card">
                <div class="card-header card-header-primary">
                    Total Number of Employees
                </div>
                <Chart :height="250" class="p-2" :chart-data="dataDesignationCollection" :options="options"></Chart>
            </div>
        </div>
    </div>
    <!-- <button @click="fillData()">Randomize</button> -->
</div>
</template>

<script>
import Chart from './BarChart'
import Progress from 'easy-circular-progress'
import countTo from 'vue-count-to'
import UserService from '@/services/user.service'
export default {
    components: {
        Chart,
        Progress,
        countTo
    },
    data() {
        return {
            dataSkillCollection: null,
            dataDesignationCollection: null,
            countValue: 10,
            startVal: 0,
            totalEmployees: 0,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: ((tooltipItems, data) => {
                            return tooltipItems.yLabel + ' Employees'
                        })
                    }
                }
            },
        }
    },
    mounted() {
        this.fillSkillChartData()
        this.fillDesignationChartData()
        this.getTotalEmployeesCount()
    },
    methods: {
        async fillSkillChartData() {
            const response = await UserService.getSkillsChartData();

            var chartLabels = []
            var chartData = []

            response.data.data.forEach(skill => {
                chartLabels.push(skill.skill)
                chartData.push(skill.count)
            })

            this.dataSkillCollection = {
                labels: chartLabels,
                datasets: [{
                    label: 'Employees - Skill Chart',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderColor: 'lightblue',
                    pointBackgroundColor: 'blue',
                    borderWidth: 1,
                    pointBorderColor: 'blue',
                    data: chartData
                }]
            }
        },
        async fillDesignationChartData() {
            const response = await UserService.getDesignationChartData();

            var chartLabels = []
            var chartData = []

            response.data.data.forEach(designation => {
                chartLabels.push(designation.designation)
                chartData.push(designation.count)
            })

            this.dataDesignationCollection = {
                labels: chartLabels,
                datasets: [{
                    label: 'Employees - Designation Chart',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderColor: 'lightblue',
                    pointBackgroundColor: 'blue',
                    borderWidth: 1,
                    pointBorderColor: 'blue',
                    data: chartData
                }]
            }
        },
        async getTotalEmployeesCount() {
            const response = await UserService.getUsersDetailsPaginated(0, 0)
            if (response)
                this.totalEmployees = response.data.data.count
        }
    }
}
</script>

<style>
.small {
    width: 400px;
    /* height: 100px; */
    /* margin: 150px auto; */
}

.txt-bold {
    font-weight: bold
}
</style>

<template>
<div>
    <b-button class="add-button" @click="addCertificate" variant="primary">Add Certificate</b-button>
    <div class="card">
        <div class="card-body">
            <b-table primary-key="id" :current-page="currentPage" :per-page="perPage" sort-by="id" :tbody-transition-props="tableTransition" sort-icon-left responsive striped hover :busy="busy" :items="availableCertificates" :fields="tableCertficatesFields">
                <template v-slot:cell(actions)="data">
                    <a @click="toBeEdit = data.item"><i class="far fa-edit"></i></a>
                    <a @click="deleteCertificate(data.item.id)"><i class="fas fa-trash"></i></a>
                </template>

                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
            </b-table>
            <b-row>
                <b-col sm="5" md="2" class="my-auto">
                    <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions" @change="getCertificates"></b-form-select>
                </b-col>
                <b-col sm="7" md="4" class="my-auto">
                    Showing {{perPage}} out of {{totalRows}} records
                </b-col>
                <b-col sm="12" md="6">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" class="mt-1"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
    <div class="card" v-if="toBeEdit">
        <div class="card-body">
            <CertificateEdit :certificate="toBeEdit" @update="getCertificates" @canceled="toBeEdit = null" />
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import CertificateEdit from './CertficationEdit'
import {
    adminPanelTableTransition
} from '@/constants'
export default {
    data() {
        return {
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 6, 7, 8, 9, 10, 15],
            tableCertficatesFields: [{
                key: 'id',
                label: '#',
                'class': 'width10 text-center text-indent',
                sortable: true
            }, {
                key: 'certification',
                label: 'Certificate Name',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'actions',
                label: 'Actions',
                'class': 'width15 text-center'
            }],
            busy: true,
            tableTransition: adminPanelTableTransition,
            availableCertificates: null,
            toBeEdit: null,
        }
    },
    components: {
        CertificateEdit,
    },
    mounted() {
        this.getCertificates();
    },
    methods: {
        async getCertificates() {
            this.busy = true
            const response = await UserService.getCertificates();
            if (response) {
                this.availableCertificates = response.data.data
                this.busy = false
                this.totalRows = this.availableCertificates.length
            }

            this.toBeEdit = null
        },
        addCertificate() {
            this.toBeEdit = {
                id: null,
                certification: null
            }
        },
        async deleteCertificate(certificateId) {
            const response = await UserService.deleteCertificate(certificateId)
            if (response) {
                this.$toasted.global.success({
                    message: 'Certificate deleted Successfully'
                })
                this.getCertificates()
            }
        }
    },
}
</script>

<style>

</style>

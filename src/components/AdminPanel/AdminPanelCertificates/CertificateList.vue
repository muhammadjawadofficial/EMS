<template>
<div>
    <b-button class="add-button" @click="addCertificate" variant="primary">Add Certificate</b-button>
    <div class="card">
        <div class="card-body">
            <b-table primary-key="id" sort-by="id" :tbody-transition-props="tableTransition" responsive striped hover :busy="busy" :items="availableCertificates" :fields="tableCertficatesFields">
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
        </div>
    </div>
    <!-- <table class="table table-striped table-responsive-sm table-hover table-fixed-layout">
        <thead>
            <tr>
                <th class="width10 text-center">#</th>
                <th>Certificate Name</th>
                <th class="width15 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(certificate, index) in availableCertificates" :key="certificate.id">
                <td class="text-center">
                    {{index+1}}
                </td>
                <td>
                    {{certificate.certification}}
                </td>
                <td class="text-center">
                    <a @click="toBeEdit = certificate"><i class="material-icons">edit</i></a>
                    <a><i class="material-icons">delete</i></a>
                </td>
            </tr>
        </tbody>
    </table> -->
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
            const response = await UserService.getCertificates();
            if (response) {
                this.availableCertificates = response.data.data
                this.busy = false
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

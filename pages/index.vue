<template>
    <div>
        <students-groups :groups="_userData.studentGroups"></students-groups>
        <students-groups v-if="_userData.isAdmin" :groups="allStudentsGroups" :admin="true" @updateAllStudentsGroups="GetAllStudentsGroups" title="All students groups"></students-groups>
        <students-groups v-if="_userData.teacherGroups.length > 0" :groups="_userData.teacherGroups" title="Teacher students groups"></students-groups>
    </div>
</template>

<script>
import { authMixin } from '~/vuex-mixins/auth.js'
export default {
    layout: 'cabinet',
    mixins: [authMixin],
    data() {
        return {
            allStudentsGroups: []
        }
    },
    methods: {
        GetAllStudentsGroups() {
            this.$apiCore.ApiController.GetAllStudentsGroups().then(data => {
                this.allStudentsGroups = data
            })
        }
    },
    mounted() {
        if (this._isAdmin) this.GetAllStudentsGroups()
    }
}
</script>

<style></style>

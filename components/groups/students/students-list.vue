<template>
    <div>
        <h5 class="text-muted my-2">Students</h5>
        <div class="d-flex justify-content-center">
            <b-list-group v-if="studentsList.length > 0" class="students-list-container">
                <b-list-group-item v-for="(student, index) in studentsList" href="#" :key="'student' + index"> {{ student.firstName }} {{ student.lastName }} </b-list-group-item>
            </b-list-group>
            <h4 v-else class="text-danger">EMPTY</h4>
        </div>

        <!-- ADMIN EDITOR -->
        <template v-if="_isAdmin">
            <h5 class="text-muted my-2">Users avalilable to add to group</h5>
            <div class="row justify-content-center my-3">
                <div class="col-md-3 col-12">
                    <b-form-select v-model="newStudentId" :options="usersAvalilableToAddToGroup" size="sm"></b-form-select>
                </div>
                <div class="col-md-3 col-12">
                    <b-button variant="outline-success" @click="AddStudent">Add</b-button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { authMixin } from '~/vuex-mixins/auth.js'
export default {
    layout: 'cabinet',
    mixins: [authMixin],
    props: {
        groupId: {
            type: Number,
            required: true
        },
        studentsList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            usersAvalilableToAddToGroup: [],
            newStudentId: 0
        }
    },
    methods: {
        GetUsersAvalilableToAddToGroup() {
            this.$apiCore.ApiController.GetUsersAvalilableToAddToGroup(this.groupId).then(data => {
                this.usersAvalilableToAddToGroup = data.map(x => {
                    return { value: x.id, text: `${x.firstName} ${x.lastName}` }
                })
            })
        },
        AddStudent() {
            this.$apiCore.ApiController.AddStudentToGroup({ userId: this.newStudentId, groupId: this.groupId }).then(data => {
                this.GetStudentList()
                this.GetUsersAvalilableToAddToGroup()
                this.newStudentId = 0
            })
        }
    },
    mounted() {
        if (this._isAdmin) {
            this.GetUsersAvalilableToAddToGroup()
        }
    }
}
</script>

<style scoped>
@media (min-width: 600px) {
    .students-list-container {
        max-width: 600px;
        min-width: 500px;
    }
}
@media (max-width: 600px) {
    .students-list-container {
        max-width: 100%;
        min-width: 100%;
    }
}
</style>

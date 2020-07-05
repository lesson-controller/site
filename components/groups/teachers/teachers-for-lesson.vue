<template>
    <div>
        <h3 class="text-muted">{{ lessonName }}</h3>
        <b-list-group v-if="data.teachers.length > 0" class="students-list-container">
            <b-list-group-item v-for="(teacher, index) in data.teachers" href="#" :key="'student' + index"> {{ teacher.firstName }} {{ teacher.lastName }} </b-list-group-item>
        </b-list-group>
        <h4 v-else class="text-danger">EMPTY</h4>
        <div v-if="_isAdmin && availableTeachers.length > 0" class="row justify-content-center my-3">
            <div class="col-md-3 col-12">
                <b-form-select v-model="newTeacherUserId" :options="availableTeachers" size="sm"></b-form-select>
            </div>
            <div class="col-md-3 col-12">
                <b-button variant="outline-success" @click="AddTeacher">Add</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { authMixin } from '~/vuex-mixins/auth.js'
export default {
    layout: 'cabinet',
    mixins: [authMixin],
    props: {
        data: {
            type: Object,
            required: true
        },
        lessons: {
            type: Array,
            required: true
        },
        groupId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            newTeacherUserId: 0
        }
    },
    methods: {
        UpdateTeachersList() {
            this.$emit('updateTeachersList')
        },
        AddTeacher() {
            this.$apiCore.ApiController.AddTeacherToGroup({ userId: this.newTeacherUserId, groupId: this.groupId, lessonId: this.data.lessonId }).then(data => {
                this.UpdateTeachersList()
                this.newTeacherUserId = 0
            })
        }
    },
    mounted() {},
    computed: {
        lessonName() {
            var lesson = this.lessons.find(x => x.value == this.data.lessonId)
            if (lesson) return lesson.text
            else return ''
        },
        availableTeachers() {
            if (!this.data.availableTeachers) return []
            return this.data.availableTeachers.map(x => {
                return { value: x.id, text: `${x.firstName} ${x.lastName}` }
            })
        }
    }
}
</script>

<style scoped></style>

<template>
    <div>
        <teachers-editor v-if="_isAdmin" :groupId="groupId" :lessons="lessons" @updateTeachersList="GetTeachersList" />
        <div class="mt-3">
            <template v-for="(lesson, index) in teachersList.lessons">
                <div class="d-block" :key="'lesson' + index">
                    <teachers-for-lesson :groupId="groupId" :data="lesson" :lessons="lessons" @updateTeachersList="GetTeachersList" />
                </div>
            </template>
        </div>
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
        lessons: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            teachersList: {
                lessons: [{ lessonId: 1, teachers: [{ firstName: 'Sasha', lastName: 'Chernigin' }] }]
            }
        }
    },
    methods: {
        GetTeachersList() {
            this.$apiCore.ApiController.GetTeachersList(this.groupId).then(data => {
                this.teachersList = data
            })
        }
    },
    mounted() {
        this.GetTeachersList()
    }
}
</script>

<style scoped>
.students-list-container {
    max-width: 600px;
    min-width: 500px;
}
</style>

<template>
    <div>
        <h4 class="text-muted my-2">Group: {{ this.$route.params.id }}</h4>
        <b-tabs content-class="mt-3" fill v-if="groupData.id">
            <b-tab title="Students" active>
                <students-list :groupId="groupData.id" :studentsList="studentsList" />
            </b-tab>
            <b-tab title="Teachers">
                <teachers-list :groupId="groupData.id" :lessons="lessons" />
            </b-tab>
            <b-tab title="Shedule">
                <shedules-list :groupId="groupData.id" :lessons="lessons" />
            </b-tab>
            <b-tab title="Attendances">
                <attendances
                    :groupId="groupData.id"
                    :studentsList="
                        studentsList.map(x => {
                            return { value: x.id, text: `${x.firstName} ${x.lastName}` }
                        })
                    "
                />
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
export default {
    layout: 'cabinet',
    data() {
        return {
            groupData: {},
            studentsList: [],
            lessons: []
        }
    },
    methods: {
        GetGroupData() {
            this.$apiCore.ApiController.GetGroupData(this.$route.params.id).then(data => {
                this.groupData = data
                this.GetStudentList()
            })
        },
        GetLessons() {
            this.$apiCore.ApiController.GetLessons().then(data => {
                this.lessons = data.map(x => {
                    return { value: x.id, text: x.name }
                })
            })
        },
        GetStudentList() {
            this.$apiCore.ApiController.GetStudentsList(this.groupData.id).then(data => {
                this.studentsList = data
            })
        }
    },
    mounted() {
        this.GetGroupData()
        this.GetLessons()
    }
}
</script>

<style scoped>
.students-list-container {
    max-width: 600px;
    min-width: 500px;
}
</style>

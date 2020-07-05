<template>
    <div v-if="attendance" class="mt-3 justify-content-center">
        <h5 class="text-muted my-2">For Group</h5>
        <h6>Посещаемость - {{ (attendance.general.procent * 100).toFixed(1) }} %</h6>
    </div>
</template>

<script>
export default {
    props: {
        groupId: {
            type: Number,
            required: true
        }
    },
    components: {},
    data() {
        return {
            attendance: null
        }
    },
    methods: {
        GetAttendanceForGroup() {
            this.$apiCore.ApiController.GetAttendanceForGroup(this.groupId).then(data => {
                this.attendance = data
            })
        }
    },
    mounted() {
        this.GetAttendanceForGroup()
    }
}
</script>

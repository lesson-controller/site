<template>
    <div class="mt-3 justify-content-center">
        <h5 class="text-muted my-2">For Month</h5>
        <div class="my-1">Start day:</div>
        <div class="my-1 small-selector"><b-form-datepicker v-model="startDay" class="mb-2" @input="GetAttendanceForMonth"></b-form-datepicker></div>
        <template v-if="attendance != null" class="col-12">
            <h6>Посещаемость - {{ (attendance.general.procent * 100).toFixed(1) }} %</h6>
        </template>
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
            attendance: null,
            startDay: null
        }
    },
    methods: {
        GetAttendanceForMonth() {
            var timeStartMonth = new Date(this.startDay).getTime() / 1000
            this.$apiCore.ApiController.GetAttendanceForMonth({ timeStartMonth: timeStartMonth, groupId: this.groupId }).then(data => {
                this.attendance = data
            })
        }
    },
    mounted() {}
}
</script>

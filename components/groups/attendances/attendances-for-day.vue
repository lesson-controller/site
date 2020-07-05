<template>
    <div class="mt-3">
        <h5 class="text-muted my-2">For Day</h5>
        <div class="my-1">Day:</div>
        <div class="my-1"><b-form-datepicker v-model="startDay" class="mb-2 small-selector" @input="GetAttendanceForDay"></b-form-datepicker></div>
        <template v-if="attendance != null">
            <h6>Посещаемость - {{ (attendance.general.procent * 100).toFixed(1) }} %</h6>
            <b-table :selectable="true" select-mode="single" class="text-center mb-0" :fields="attendancesFields" :items="attendance.forStudents" small striped>
                <template v-slot:cell(name)="data">
                    <span>{{ data.item.firstName }} {{ data.item.lastName }}</span>
                </template>
                <template v-slot:cell(general)="data">
                    <span>{{ (data.value.procent * 100).toFixed(1) }} %</span>
                </template>
            </b-table>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        groupId: {
            type: Number,
            required: false,
            default: null
        }
    },
    components: {},
    data() {
        return {
            attendance: null,
            attendancesFields: [
                { key: 'name', label: 'Full Name' },
                { key: 'general', label: 'Procent' }
            ],
            startDay: null
        }
    },
    methods: {
        GetAttendanceForDay() {
            var timeStartDay = new Date(this.startDay).getTime() / 1000
            this.$apiCore.ApiController.GetAttendanceForDay({ timeStartDay: timeStartDay, groupId: this.groupId }).then(data => {
                this.attendance = data
            })
        }
    },
    mounted() {}
}
</script>

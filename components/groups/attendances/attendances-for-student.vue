<template>
    <div class="mt-3 justify-content-center">
        <h5 class="text-muted my-2">For Student</h5>
        <div class="my-1">Student:</div>
        <div class="my-1 small-selector"><b-form-select v-model="userId" :options="studentsList" size="md" @input="GetAttendanceForStudent"></b-form-select></div>
        <template v-if="attendance != null">
            <h6>Посещаемость - {{ (attendance.general.procent * 100).toFixed(1) }} %</h6>
            <b-table :selectable="true" select-mode="single" class="text-center mb-0" :fields="attendancesFields" :items="attendance.forDays" small striped>
                <template v-slot:cell(timeStartDay)="data">
                    <span>{{ $format.dateSmall(data.value * 1000) }}</span>
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
        },
        studentsList: {
            type: Array,
            required: true
        }
    },
    components: {},
    data() {
        return {
            attendance: null,
            userId: 0,
            attendancesFields: [
                { key: 'timeStartDay', label: 'Day' },
                { key: 'general', label: 'Procent' }
            ]
        }
    },
    methods: {
        GetAttendanceForStudent() {
            this.$apiCore.ApiController.GetAttendanceForStudent({ userId: this.userId, groupId: this.groupId }).then(data => {
                this.attendance = data
            })
        }
    },
    mounted() {}
}
</script>

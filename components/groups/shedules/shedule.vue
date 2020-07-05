<template>
    <div class="shadow mx-auto task-panel px-0" :class="ContainerColorClass" style="position: relative;">
        <div v-b-toggle="CollapseIdForSheduleData" class="row mx-0 py-md-3 py-2 my-2" style="cursor: pointer; outline: none;">
            <div class="col-2 my-auto text-center">
                <b>{{ data.canceled ? 'Canceled' : 'Active' }}</b>
            </div>
            <div class="col-4 my-auto text-center px-0">
                <b>{{ lessons.find(x => x.value == data.lessonId).text }}</b>
            </div>
            <div class="col-2 my-auto text-right px-0">{{ ((new Date(data.timeEnd).getTime() - new Date(data.timeStart).getTime()) / 60000).toFixed(0) }} min</div>
            <div class="col-4 my-auto">
                <b>{{ $format.dateBig(data.timeStart) }}</b
                ><span v-if="data.repeat"> (repeat)</span>
                <br />
            </div>
        </div>
        <div class="close-block pointer text-danger" style="position: absolute; top: 5px; right: 5px;">✕</div>

        <b-collapse :id="CollapseIdForSheduleData">
            <b-card no-body class="border-0 pt-0 pb-3" :class="ContainerColorClass" style="border-radius: 10px;">
                <div class="row mx-0 justify-content-center">
                    <b-form-checkbox :disabled="!editMode" v-model="data.canceled" @input="ChangeShedule" class="col-12 mb-2">
                        Lesson was be canceled
                    </b-form-checkbox>

                    <div class="col-3">Textbook:</div>
                    <div class="col-3"><b-form-input :disabled="!editMode" v-model="data.textbook" size="sm" type="text" @change="ChangeShedule"></b-form-input></div>
                    <div class="col-3">TextbookLink:</div>
                    <div class="col-3"><b-form-input :disabled="!editMode" v-model="data.textbookLink" size="sm" type="text" @change="ChangeShedule"></b-form-input></div>

                    <div class="col-3">Topic:</div>
                    <div class="col-3"><b-form-input :disabled="!editMode" v-model="data.topic" size="sm" type="text" @change="ChangeShedule"></b-form-input></div>
                    <div class="col-3">Homework:</div>
                    <div class="col-3"><b-form-input :disabled="!editMode" v-model="data.homework" size="sm" type="text" @change="ChangeShedule"></b-form-input></div>

                    <div class="col-12" v-if="editMode">
                        <b-card no-body border-variant="dark" text-variant="dark" class="m-0 p-0 stm-table-info mt-3">
                            <b-card-header header-bg-variant="dark" header-text-variant="white">
                                Student attendances
                            </b-card-header>

                            <b-table :selectable="true" select-mode="single" class="text-center mb-0" :fields="studentsAttendancesFields" :items="studentsAttendances" small striped>
                                <template v-slot:cell(attendance)="data">
                                    <b-form-checkbox v-model="data.value" @change="UpdateStudentAttendances(data.item.userId, !data.value)"></b-form-checkbox>
                                </template>
                            </b-table>
                        </b-card>
                    </div>
                </div>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: null
        },
        studentsAttendances: {
            type: Array,
            required: false,
            default: null
        },
        lessons: {
            type: Array,
            required: true
        },
        editMode: {
            type: Boolean,
            required: false,
            default: null
        }
    },
    components: {},
    data() {
        return {
            studentsAttendancesFields: [
                { key: 'firstName', label: 'FirstName' },
                { key: 'lastName', label: 'LastName' },
                { key: 'attendance', label: 'Attendance' }
            ]
        }
    },
    methods: {
        ChangeShedule() {
            this.$apiCore.ApiController.UpdateSheduleInfo(this.data).then(data => {})
        },
        UpdateStudentAttendances(userId, value) {
            this.$apiCore.ApiController.UpdateStudentAttendances({ sheduleId: this.data.id, studentUserId: userId, participate: value }).then(data => {})
        }
    },
    mounted() {},
    computed: {
        CollapseIdForSheduleData() {
            return 'collapse-shedule-data-' + this.data.id
        },
        ContainerColorClass() {
            if (this.data.canceled) return 'bg-wait'
        }
    }
}
</script>

<style>
.task-panel {
    max-width: 870px;
    /*max-height: 150px;*/
    min-height: 50px;

    background: white;
    border-radius: 10px !important;
    -moz-transition: all 0.1s linear;
    -o-transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
}

.task-panel-creating {
    max-height: 1000px !important;
}

.pre-checked {
    color: rgb(158, 0, 158);
}

.task-panel {
    border-radius: 10px;
}
.task-panel:hover {
    box-shadow: 0 0.7rem 1.2rem rgba(0, 0, 0, 0.3) !important;
}

.bg-completed {
    background-color: #83cf95 !important;
}

.bg-wait {
    background-color: #cfbb83 !important;
}

.tag-container {
    height: 15px;
    position: absolute;
    /*background: black;
     width: 85%; */
    margin: auto;
    bottom: -15px;
    border: transparent solid 1px;
    border-radius: 0 0 100px 100px;
}
</style>

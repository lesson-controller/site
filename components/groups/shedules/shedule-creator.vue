<template>
    <div class="shadow mx-auto task-panel px-0" :class="ContainerColorClass" style="position: relative;">
        <div v-b-toggle="CollapseId" class="pointer" style="padding-top: 8px; font-size: 23px; outline: none;"><b>Create</b></div>
        <b-collapse :id="CollapseId">
            <b-card class="border-0">
                <div class="row mx-0 py-md-3 py-2">
                    <div class="col-6 my-1">Lesson:</div>
                    <div class="col-6 my-1"><b-form-select v-model="newShedule.lessonId" :options="lessons" size="sm" @input="SelectNewLessonType()"></b-form-select></div>
                    <div class="col-6 my-1" v-if="!newShedule.repeat">Day start:</div>
                    <div class="col-6 my-1 d-flex justify-content-center" v-if="!newShedule.repeat">
                        <b-form-datepicker v-model="newShedule.dayStart" class="mb-2"></b-form-datepicker>
                    </div>
                    <div class="col-6 my-1">Time start:</div>
                    <div class="col-6 my-1"><time-selector :value="newShedule.timeStart" @change="value => (newShedule.timeStart = value)" :withoutDay="true" /></div>

                    <!-- Create -->
                    <div class="col-12 mt-2"><b-button variant="outline-success" @click="CreateShedule">Create</b-button></div>
                </div>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
/* Components */
import Datepicker from 'vuejs-datepicker'

export default {
    props: {
        groupId: {
            type: Number,
            required: true
        }
    },
    components: {
        Datepicker
    },
    data() {
        return {
            newShedule: {
                lessonId: 1,
                dayStart: null,
                timeStart: 0
            },
            lessons: []
        }
    },
    methods: {
        UpdateShedule() {
            this.$emit('updateShedule')
        },
        CreateShedule() {
            var timeStart = this.newShedule.timeStart
            if (this.newShedule.dayStart == null) return
            this.newShedule.dayStart = new Date(this.newShedule.dayStart)
            var temp = this.newShedule.dayStart.getTime() / 1000
            timeStart += temp - (temp % 86400) + this.newShedule.dayStart.getTimezoneOffset() * 60

            var shedule = {
                groupId: this.groupId,
                lessonId: this.newShedule.lessonId,
                timeStart: timeStart
            }

            this.$apiCore.ApiController.AddShedule(shedule).then(data => {
                this.UpdateShedule()
            })
        },
        SelectNewLessonType() {},
        GetLessons() {
            this.$apiCore.ApiController.GetLessonsForGroup(this.groupId).then(data => {
                this.lessons = data.map(x => {
                    return { value: x.id, text: x.name }
                })
            })
        }
    },
    mounted() {
        this.GetLessons()
        this.SelectNewLessonType()
    },
    computed: {
        CollapseId() {
            return 'collapse-1'
        },
        ContainerColorClass() {
            return 'task-panel-creating'
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

<template>
    <div class="shadow mx-auto task-panel px-0" :class="ContainerColorClass" style="position: relative;">
        <div v-b-toggle="CollapseId" class="pointer" style="padding-top: 8px; font-size: 23px; outline: none;"><b>Add lesson to group</b></div>
        <b-collapse :id="CollapseId">
            <b-card class="border-0">
                <div class="row mx-0 py-md-3 py-2">
                    <div class="col-6 my-1">Lesson:</div>
                    <div class="col-6 my-1"><b-form-select v-model="newLessonId" :options="lessons" size="sm"></b-form-select></div>

                    <!-- Create -->
                    <div class="col-12 mt-2"><b-button variant="outline-success" @click="CreateLesson">Create</b-button></div>
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
        },
        lessons: {
            type: Array,
            required: true
        }
    },
    components: {
        Datepicker
    },
    data() {
        return {
            newLessonId: 1
        }
    },
    methods: {
        UpdateTeachersList() {
            this.$emit('updateTeachersList')
        },
        CreateLesson() {
            this.$apiCore.ApiController.AddLessonToGroup({ groupId: this.groupId, lessonId: this.newLessonId }).then(data => {
                this.UpdateTeachersList()
            })
            this.newLessonId = 1
        }
    },
    mounted() {},
    computed: {
        CollapseId() {
            return 'collapse-2'
        },
        ContainerColorClass() {
            return 'lesson-panel-creating'
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

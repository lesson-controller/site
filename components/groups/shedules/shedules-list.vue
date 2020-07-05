<template>
    <div class="mt-3 justify-content-center">
        <shedule-creator v-if="_isAdmin" :groupId="groupId" @updateShedule="GetShedules" />

        <template v-for="(shedule, i) in sheduleData.shedules">
            <div :key="i + '_shedule'">
                <shedule :data="shedule.data" @updateShedule="GetShedules" :lessons="lessons" :studentsAttendances="shedule.studentsAttendances" :editMode="shedule.subjectToChange" />
            </div>
        </template>
    </div>
</template>

<script>
import { authMixin } from '~/vuex-mixins/auth.js'

export default {
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
    components: {},
    data() {
        return {
            sheduleData: {}
        }
    },
    methods: {
        GetShedules() {
            this.$apiCore.ApiController.GetGroupShedule(this.groupId).then(data => {
                this.sheduleData = data
                this.$set(this.sheduleData, 'shedules', data.shedules)
            })
        }
    },
    mounted() {
        this.GetShedules()
    }
}
</script>

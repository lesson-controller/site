<template>
    <div class="mt-3 justify-content-center">
        <attendances-for-group :groupId="groupId" />
        <attendances-for-student :groupId="groupId" :studentsList="studentsList" />
        <attendances-for-day :groupId="groupId" />
        <attendances-for-month :groupId="groupId" />
    </div>
</template>

<script>
export default {
    props: {
        groupId: {
            type: Number,
            required: true
        },
        studentsList: {
            type: Array,
            required: true
        }
    },
    components: {},
    data() {
        return {}
    },
    methods: {},
    mounted() {}
}
</script>

<style>
.small-selector {
    max-width: 500px;
    margin: auto;
}
</style>

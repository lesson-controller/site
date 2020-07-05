<template>
    <div>
        <h4 class="text-muted my-2">{{ title }}</h4>
        <div v-if="groups.length <= 0 && !admin">В СТУДЕНТЧЕСКИХ ГРУППАХ НЕ СОСТОИТ</div>
        <div v-else class="d-flex justify-content-center">
            <b-list-group class="students-group-container">
                <b-list-group-item v-for="(group, index) in groups" :href="'/groups/' + group.name" class="flex-column align-items-start" :key="'group' + index">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ group.name }}</h5>
                    </div>

                    <p class="mb-1 text-left">
                        {{ group.discription }}
                    </p>
                </b-list-group-item>
            </b-list-group>
        </div>
        <div v-if="admin" class="col-md-5 col-12 mx-auto row justify-content-center mt-3">
            <div class="col-6">Name:</div>
            <div class="col-6"><b-form-input type="text" v-model="newGroup.name" size="sm"></b-form-input></div>
            <div class="col-6">Discription:</div>
            <div class="col-6"><b-form-input type="text" v-model="newGroup.discription" size="sm"></b-form-input></div>
            <b-button variant="outline-primary" class="mt-2" @click="AddGroup">Create</b-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        groups: {
            type: Array,
            required: true
        },
        admin: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: 'Students groups'
        }
    },
    data() {
        return {
            newGroup: {
                name: '',
                discription: ''
            }
        }
    },
    methods: {
        AddGroup() {
            this.$apiCore.ApiController.AddGroup(this.newGroup).then(data => {
                this.$emit('updateAllStudentsGroups')
            })
        }
    }
}
</script>

<style scoped>
@media (min-width: 600px) {
    .students-group-container {
        max-width: 600px;
        min-width: 500px;
    }
}
@media (max-width: 600px) {
    .students-group-container {
        max-width: 100%;
        min-width: 100%;
    }
}
</style>

<template>
    <div style="cursor: pointer;" @click="GoToHome">
        <b-avatar :text="_username" size="13rem"></b-avatar>
        <h3>
            <br />
            {{ _username }}
        </h3>
    </div>
</template>

<script>
import { authMixin } from '~/vuex-mixins/auth.js'

export default {
    mixins: [authMixin],
    methods: {
        GoToHome() {
            window.location = '/'
        }
    }
}
</script>

<style></style>

<template>
    <div>
        <main-header />
        <div class="container align-items-start mt-3 d-block">
            <profile></profile>
            <hr size="3px" width="500px" class="mx-auto" style="max-width: 100%;" />
            <nuxt />
        </div>
        <div class="logout" @click="_logout">Logout</div>
    </div>
</template>

<script>
import MainHeader from '~/components/main/header.vue'
import Vue from 'vue'
import { authMixin } from '~/vuex-mixins/auth.js'

export default {
    mixins: [authMixin],
    components: {
        'main-header': MainHeader
    },
    data() {
        return {}
    },
    methods: {
        GetUserData() {
            this.$apiCore.ApiController.GetUserData().then(data => {
                this._updateUserData(data)
            })
        }
    },
    mounted() {
        Vue.$ns = ({ title, message }) =>
            this.$notify.success({
                title: title,
                message: message ? message : ''
            })

        if (this._token == '') {
            if (window.location.pathname != '/login') {
                window.location = '\login'
            }
        } else {
            if (window.location.pathname == '/login') {
                window.location = '\\'
            }
        }
        this.GetUserData()
    }
}
</script>

<style>
.logout {
    position: absolute;
    top: 25px;
    right: 25px;
    cursor: pointer;
    text-decoration: underline;
}
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>

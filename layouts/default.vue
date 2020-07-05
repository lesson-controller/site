<template>
    <div>
        <main-header />
        <Nuxt />
    </div>
</template>

<script>
import MainHeader from '~/components/main/header.vue'

import { authMixin } from '~/vuex-mixins/auth.js'
import Vue from 'vue'

export default {
    middleware: ['authenticated'],
    mixins: [authMixin],
    components: {
        'main-header': MainHeader
    },
    methods: {
        Startup() {
            Vue.$ns = ({ title, message }) =>
                this.$notify.success({
                    title: title,
                    message: message ? message : ''
                })
        }
    },
    created() {
        this.Startup()
    },
    mounted() {
        if (this._token == '') {
            if (window.location.pathname != '/login') {
                window.location = '\login'
            }
        } else {
            if (window.location.pathname == '/login') {
                window.location = '\\'
            }
        }
    }
}
</script>

<style>
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}

.title {
    font-weight: bold;
    font-size: 1.5em;
}
</style>

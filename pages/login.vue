<template>
    <b-container fluid="lg">
        <div class="text-center title my-2">
            Login as access level
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-5 col-12">
                <b-jumbotron header="University" lead="Maximum access level">
                    <b-button variant="primary" href="#" @click="Login(universityCretitionals)">Login</b-button>
                </b-jumbotron>
            </div>

            <div class="col-lg-5 col-12">
                <b-jumbotron header="Teacher" lead="Teacher access level">
                    <b-button variant="primary" href="#" @click="Login(teacherCretitionals)">Login</b-button>
                </b-jumbotron>
            </div>

            <div class="col-lg-5 col-12">
                <b-jumbotron header="Student" lead="Student access level">
                    <b-button variant="primary" href="#" @click="Login(studentCretitionals)">Login</b-button>
                </b-jumbotron>
            </div>
        </div>
    </b-container>
</template>

<script>
import { authMixin } from '~/vuex-mixins/auth.js'

export default {
    mixins: [authMixin],
    components: {},
    data() {
        return {
            universityCretitionals: {
                username: 'a',
                password: 'b'
            },
            teacherCretitionals: {
                username: 'c',
                password: 'b'
            },
            studentCretitionals: {
                username: 'student1',
                password: 'b'
            }
        }
    },
    methods: {
        Login(creditionals) {
            console.log('_username', this._username)
            console.log('_token', this._token)
            this._login(creditionals)
            /*this.$apiCore.ApiController.Token(creditionals).then(data => {
        localStorage.setItem('token', data.access_token)
        console.log('datadata', data);
      })*/
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>

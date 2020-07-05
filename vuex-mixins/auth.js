import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export const authMixin = {
    computed: {
        ...mapState({
            _userData: state => state.auth.userData,
            _isAdmin: state => state.auth.userData.isAdmin
        }),
        ...mapGetters({
            _username: 'auth/username',
            _token: 'auth/token'
        })
    },
    methods: {
        ...mapMutations({
            _updateUserData: 'auth/UPDATE_USER_DATA'
        }),
        ...mapActions({
            _login: 'auth/LOGIN',
            _logout: 'auth/LOGOUT'
        })
    }
}

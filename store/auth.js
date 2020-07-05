const state = {
    userData: {
        firstName: 'a',
        lastName: 'b',
        isAdmin: true,
        studentGroups: [],
        teacherGroups: []
    }
}

import Vue from 'vue'

const getters = {
    username: () => localStorage.getItem('username') || '',
    token: () => localStorage.getItem('token') || ''
}

const actions = {
    LOGIN({ commit, getters, state, dispatch }, { username, password }) {
        Vue.prototype.$apiCore.ApiController.Token({ username, password }).then(data => {
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('username', username)
            window.location = '/'
            //console.log("datadata", data);
        })
    },
    LOGOUT({ commit, getters, state, dispatch }) {
        localStorage.clear()
        window.location = '/login'
    }
}

const mutations = {
    UPDATE_USER_DATA(state, userData) {
        state.userData = userData
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

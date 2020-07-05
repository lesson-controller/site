import moment from 'moment'
import Vue from 'vue'

class Api {
    constructor() {
        this.ApiController = new ApiController()
    }
}

class ApiController {
    constructor() {}

    //#region Auth
    async Token({ username, password }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/Token/?username=${username}&password=${password}`, method: 'POST' }).then(data => {
                Vue.$ns({
                    title: 'Authorization!'
                })
                resolve(data)
            })
        })
    }
    //#endregion

    //#region User
    async GetUserData() {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetUserData`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }
    //#endregion

    //#region University
    async AddGroup({ name, discription }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/AddGroup/?name=${name}&discription=${discription}`, method: 'POST' }).then(data => {
                Vue.$ns({
                    title: 'AddGroup!'
                })
                resolve(data)
            })
        })
    }

    async GetAllStudentsGroups() {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetAllStudentsGroups`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetStudentsList(groupId) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetStudentsList/?groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetUsersAvalilableToAddToGroup(groupId) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetUsersAvalilableToAddToGroup/?groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetTeachersList(groupId) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetTeachersList/?groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetGroupData(groupName) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetGroupData/?groupName=${groupName}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetLessons() {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetLessons`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async AddLessonToGroup({ groupId, lessonId }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/AddLessonToGroup/?groupId=${groupId}&lessonId=${lessonId}`, method: 'POST' }).then(data => {
                Vue.$ns({
                    title: 'AddLessonToGroup!'
                })
                resolve(data)
            })
        })
    }

    async AddTeacherToGroup({ userId, groupId, lessonId }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/AddTeacherToGroup/?userId=${userId}&groupId=${groupId}&lessonId=${lessonId}`, method: 'POST' }).then(data => {
                Vue.$ns({
                    title: 'AddTeacherToGroup!'
                })
                resolve(data)
            })
        })
    }

    async AddStudentToGroup({ userId, groupId }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/AddStudentToGroup/?userId=${userId}&groupId=${groupId}`, method: 'POST' }).then(data => {
                Vue.$ns({
                    title: 'AddStudentToGroup!'
                })
                resolve(data)
            })
        })
    }

    async GetLessonsForGroup(groupId) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetLessonsForGroup/?groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async AddShedule(shedule) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/AddShedule`, method: 'POST', obj: shedule }).then(data => {
                Vue.$ns({
                    title: 'AddShedule!'
                })
                resolve(data)
            })
        })
    }

    async GetGroupShedule(groupId) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetGroupShedule/?groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async UpdateStudentAttendances({ sheduleId, studentUserId, participate }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/UpdateStudentAttendances/?sheduleId=${sheduleId}&studentUserId=${studentUserId}&participate=${participate}`, method: 'POST' }).then(data => {
                Vue.$ns({
                    title: 'UpdateStudentAttendances!'
                })
                resolve(data)
            })
        })
    }

    async UpdateSheduleInfo(shedule) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/UpdateSheduleInfo`, method: 'POST', obj: shedule }).then(data => {
                Vue.$ns({
                    title: 'UpdateSheduleInfo!'
                })
                resolve(data)
            })
        })
    }

    async GetAttendanceForGroup(groupId) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetAttendanceForGroup/?groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetAttendanceForStudent({ userId, groupId }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetAttendanceForStudent/?userId=${userId}&groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetAttendanceForDay({ timeStartDay, groupId }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetAttendanceForDay/?timeStartDay=${timeStartDay}&groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }

    async GetAttendanceForMonth({ timeStartMonth, groupId }) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$apiCall({ url: `/Api/GetAttendanceForMonth/?timeStartMonth=${timeStartMonth}&groupId=${groupId}`, method: 'GET' }).then(data => {
                resolve(data)
            })
        })
    }
    //#endregion
}

Vue.prototype.$apiCore = new Api()

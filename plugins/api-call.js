import axios from 'axios'
import Vue from 'vue'

const apiCall = ({ url, method, obj }) =>
    new Promise((resolve, reject) => {
        url = 'http://109.195.85.22:12001' + url
        axios({
            method: method == null ? 'GET' : method,
            headers: {
                Authorization: localStorage.getItem('token') && localStorage.getItem('token') != '' ? 'Bearer ' + localStorage.getItem('token') : ''
            },
            url: url,
            data: obj
        })
            .then(response => {
                if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
                    console.log('URL', url)
                    console.log('API', response)
                }
                //console.log(response, 'response');
                //return
                if (response === undefined || response.data === undefined) {
                    /*this.$notify.error({
          title: 'Error!',
          message: 'Сервер не вернул данные'
        })*/
                    let error = new Error('Данные отсутствуют')
                    reject(error)
                    return
                }

                let data = response.data
                console.log(data, data)

                if (data.error) {
                    //Vue.prototype.$notifyError(data.error)

                    if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
                        console.log(url)
                        console.log(data.data)
                    }

                    if (!data.data) {
                        reject(data.error)
                        return
                    }
                }

                if (!data.data && typeof data.data != 'boolean') {
                    let er = 'Нет данных'
                    /*this.$notify.error({
          title: 'Error!',
          message: er
        })*/
                    reject(er)
                    return
                }

                if (Array.isArray(data.data)) {
                    let parsed = []
                    data.data.forEach(el => {
                        parsed.push(JSON.parse(JSON.stringify(el), JSON.dateParser))
                    })

                    console.log(parsed)
                    resolve(parsed)
                    return
                }

                if (typeof data.data === 'string') {
                    try {
                        resolve(JSON.parse(data.data, JSON.dateParser))
                    } catch (err) {
                        let errText = 'Сервер прислал невалидные данные'
                        if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
                            console.log(url)
                            console.log(data.data)
                            /*this.$notify.error({
              title: 'Error!',
              message: errText
            })*/
                        }
                        reject(errText)
                    }
                    return
                }

                resolve(data.data)
            })
            .catch(function(error) {
                console.log('api error')
                /*this.$notify.error({
        title: 'Error!',
        message: 'Ошибка выполнения запроса'
      })*/
                if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') {
                    console.log(url)
                    console.log(error)
                }
                reject(error)
            })
    })

Vue.prototype.$apiCall = apiCall

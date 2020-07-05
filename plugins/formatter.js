/* Functions */
import moment from 'moment'
import Vue from 'vue'

class Formatter {
    constructor() {}

    /* Date */
    dateSmall(val) {
        val = new Date(val).getTime() + 3 * 60 * 60 * 1000
        return moment(val).format('DD.MM.YYYY')
    }
    dateBig(val) {
        val = new Date(val).getTime() + 3 * 60 * 60 * 1000
        return moment(val).format('DD.MM.YYYY HH:mm')
    }
    gameIdToName(gameId) {
        switch (gameId) {
            case '730':
                return 'csgo'
            case '570':
                return 'dota'
        }
        return ''
    }
    appToGameName(app) {
        switch (app) {
            case 0:
                return 'csgo'
            case 1:
                return 'dota'
        }
    }
    targetMarketIdToName(targetMarketId) {
        switch (targetMarketId) {
            case 0:
                return 'steam'
            case 1:
                return 'market'
        }
    }
    tradingPlatformIdToName(targetMarketId) {
        switch (targetMarketId) {
            case 0:
                return 'steam'
            case 1:
                return 'tm'
            case 2:
                return 'bitskins'
        }
    }
    tradeAccountStatusIdToName(statusId) {
        switch (statusId) {
            case 0:
                return 'enable'
            case 1:
                return 'disable'
            case 2:
                return 'wait_statistic'
            case 3:
                return 'more_buy'
            case 4:
                return 'more_sell'
            case 5:
                return 'not_ready_to_sell'
            case 6:
                return 'have_pending_items'
            case 7:
                return 'no_api'
        }
    }
}

Vue.prototype.$format = new Formatter()

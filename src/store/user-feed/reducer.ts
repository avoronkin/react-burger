import {
    USER_FEED_ACTIONS,
    USER_FEED_WS_CLOSED,
    USER_FEED_WS_ON_ERROR,
    USER_FEED_WS_ON_MESSAGE,
    USER_FEED_WS_OPENED,
} from './actions'
import { UserFeedState, initialState } from './state'

export const userFeedReducer = (state = initialState, action: USER_FEED_ACTIONS): UserFeedState => {
    switch (action.type) {
        case USER_FEED_WS_OPENED:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            }

        case USER_FEED_WS_ON_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }

        case USER_FEED_WS_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            }

        case USER_FEED_WS_ON_MESSAGE:
            return {
                ...state,
                error: undefined,
                feed: action.payload,
            }

        default:
            return state
    }
}

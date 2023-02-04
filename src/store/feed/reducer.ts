import {
    FEED_ACTIONS,
    FEED_WS_CLOSED,
    FEED_WS_ON_ERROR,
    FEED_WS_ON_MESSAGE,
    FEED_WS_OPENED,
} from './actions'
import { FeedState, initialState } from './state'

export const feedReducer = (state = initialState, action: FEED_ACTIONS): FeedState => {
    switch (action.type) {
        case FEED_WS_OPENED:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            }

        case FEED_WS_ON_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }

        case FEED_WS_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            }

        case FEED_WS_ON_MESSAGE:
            return {
                ...state,
                error: undefined,
                feed: action.payload,
            }

        default:
            return state
    }
}
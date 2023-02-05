import { WsActionTypes } from '../../services/socketMiddleware'
import { WsUserFeed } from './state'
export const USER_FEED_WS_OPEN = 'USER_FEED_WS_OPEN' as const
export const USER_FEED_WS_OPENED = 'USER_FEED_WS_OPENED' as const
export const USER_FEED_WS_CLOSE = 'USER_FEED_WS_CLOSE' as const
export const USER_FEED_WS_CLOSED = 'USER_FEED_WS_CLOSED' as const
export const USER_FEED_WS_SEND = 'USER_FEED_WS_SEND' as const
export const USER_FEED_WS_ON_MESSAGE = 'USER_FEED_WS_ON_MESSAGE' as const
export const USER_FEED_WS_ON_ERROR = 'USER_FEED_WS_ON_ERROR' as const

export interface USER_FEED_WS_OPEN_ACTION {
    type: typeof USER_FEED_WS_OPEN
    payload: {
        wsUrl: string
    }
}
export const userFeedWsOpen = ({ wsUrl }: { wsUrl: string }) => ({
    type: USER_FEED_WS_OPEN,
    payload: { wsUrl }
})
export interface USER_FEED_WS_OPENED_ACTION {
    type: typeof USER_FEED_WS_OPENED
}
export interface USER_FEED_WS_CLOSE_ACTION {
    type: typeof USER_FEED_WS_CLOSE
}
export const userFeedWsClose = () => ({ type: USER_FEED_WS_CLOSE })
export interface USER_FEED_WS_CLOSED_ACTION {
    type: typeof USER_FEED_WS_CLOSED
    payload: CloseEvent
}
export interface USER_FEED_WS_ON_MESSAGE_ACTION {
    type: typeof USER_FEED_WS_ON_MESSAGE
    payload: WsUserFeed
}
export interface USER_FEED_WS_ON_ERROR_ACTION {
    type: typeof USER_FEED_WS_ON_ERROR
    payload: Event
}

export type USER_FEED_ACTIONS = USER_FEED_WS_OPEN_ACTION
    | USER_FEED_WS_OPENED_ACTION
    | USER_FEED_WS_CLOSE_ACTION
    | USER_FEED_WS_CLOSED_ACTION
    | USER_FEED_WS_ON_MESSAGE_ACTION
    | USER_FEED_WS_ON_ERROR_ACTION

export const userFeedWsActionTypes: WsActionTypes = {
    open: USER_FEED_WS_OPEN,
    opened: USER_FEED_WS_OPENED,
    close: USER_FEED_WS_CLOSE,
    closed: USER_FEED_WS_CLOSED,
    send: USER_FEED_WS_SEND,
    onMessage: USER_FEED_WS_ON_MESSAGE,
    onError: USER_FEED_WS_ON_ERROR,
}

import { WsActionTypes } from '../../services/socketMiddleware'
import { WsFeed } from './state'
export const FEED_WS_OPEN = 'FEED_WS_OPEN' as const
export const FEED_WS_OPENED = 'FEED_WS_OPENED' as const
export const FEED_WS_CLOSE = 'FEED_WS_CLOSE' as const
export const FEED_WS_CLOSED = 'FEED_WS_CLOSED' as const
export const FEED_WS_SEND = 'FEED_WS_SEND' as const
export const FEED_WS_ON_MESSAGE = 'FEED_WS_ON_MESSAGE' as const
export const FEED_WS_ON_ERROR = 'FEED_WS_ON_ERROR' as const

export interface FEED_WS_OPEN_ACTION {
    type: typeof FEED_WS_OPEN
    payload: {
        wsUrl: string
    }
}
export const feedWsOpen = ({ wsUrl }: { wsUrl: string }) => ({
    type: FEED_WS_OPEN,
    payload: { wsUrl },
})
export interface FEED_WS_OPENED_ACTION {
    type: typeof FEED_WS_OPENED
}
export interface FEED_WS_CLOSE_ACTION {
    type: typeof FEED_WS_CLOSE
}
export const feedWsClose = () => ({ type: FEED_WS_CLOSE })
export interface FEED_WS_CLOSED_ACTION {
    type: typeof FEED_WS_CLOSED
    payload: CloseEvent
}
export interface FEED_WS_ON_MESSAGE_ACTION {
    type: typeof FEED_WS_ON_MESSAGE
    payload: WsFeed
}
export interface FEED_WS_ON_ERROR_ACTION {
    type: typeof FEED_WS_ON_ERROR
    payload: Event
}

export type FEED_ACTIONS = FEED_WS_OPEN_ACTION
    | FEED_WS_OPENED_ACTION
    | FEED_WS_CLOSE_ACTION
    | FEED_WS_CLOSED_ACTION
    | FEED_WS_ON_MESSAGE_ACTION
    | FEED_WS_ON_ERROR_ACTION

export const feedWsActionTypes: WsActionTypes = {
    open: FEED_WS_OPEN,
    opened: FEED_WS_OPENED,
    close: FEED_WS_CLOSE,
    closed: FEED_WS_CLOSED,
    send: FEED_WS_SEND,
    onMessage: FEED_WS_ON_MESSAGE,
    onError: FEED_WS_ON_ERROR,
}

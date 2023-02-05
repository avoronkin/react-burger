import type { AppDispatch, RootState } from '../store'
import type { Middleware, MiddlewareAPI } from 'redux'

export interface WsActionTypes {
    open: string
    opened: string
    close: string
    closed: string
    send: string
    onMessage: string
    onError: string
}

export const socketMiddleware = ({ wsActionTypes }: { wsActionTypes: WsActionTypes }): Middleware => {
    return ((storeApi: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null

        return next => (action) => {
            const { type } = action

            if (type === wsActionTypes.open && action?.payload?.wsUrl) {
                const socket = new WebSocket(action.payload.wsUrl)

                socket.onopen = () => {
                    storeApi.dispatch({
                        type: wsActionTypes.opened,
                    })
                }

                socket.onerror = event => {
                    storeApi.dispatch({
                        type: wsActionTypes.onError,
                        payload: event
                    })
                }

                socket.onmessage = event => {
                    const { data } = event
                    storeApi.dispatch({
                        type: wsActionTypes.onMessage,
                        payload: JSON.parse(data)
                    })
                }

                socket.onclose = event => {
                    storeApi.dispatch({
                        type: wsActionTypes.closed,
                        payload: event
                    })
                }
            }

            if (!socket) {
                next(action)
                return
            }

            if (type === wsActionTypes.send) {
                socket.send(JSON.stringify(action.payload))
            }

            if (type === wsActionTypes.close && socket !== null) {
                socket.close()
                socket = null
            }

            next(action)
        }
    }) as Middleware
}

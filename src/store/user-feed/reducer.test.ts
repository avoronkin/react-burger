import { userFeedReducer as reducer } from './reducer'
import {
    USER_FEED_WS_OPENED,
    USER_FEED_WS_CLOSED,
    USER_FEED_WS_ON_MESSAGE,
    USER_FEED_WS_ON_ERROR,
} from './actions'
import { initialState } from './state'

describe('feed reducer', () => {
    it('неизвестное действие должно вернуть первоночальное состояни', () => {
        const stateAfter = reducer(undefined, undefined)

        expect(stateAfter).toEqual(initialState)
    })

    it('USER_FEED_WS_OPENED', async () => {
        const stateBefore = { ...initialState }

        const stateAfter = reducer(stateBefore, { type: USER_FEED_WS_OPENED })
        expect(stateAfter).toEqual({
            ...stateBefore,
            error: undefined,
            wsConnected: true,
        })
    })

    it('USER_FEED_WS_CLOSED', async () => {
        const stateBefore = { ...initialState }

        const stateAfter = reducer(stateBefore, {
            type: USER_FEED_WS_CLOSED,
            payload: {} as CloseEvent
        })
        expect(stateAfter).toEqual({
            ...stateBefore,
            error: undefined,
            wsConnected: false,
        })
    })

    it('USER_FEED_WS_ON_ERROR', async () => {
        const stateBefore = { ...initialState }

        const stateAfter = reducer(stateBefore, {
            type: USER_FEED_WS_ON_ERROR,
            payload: {} as Event
        })
        expect(stateAfter).toEqual({
            ...stateBefore,
            error: {},
            wsConnected: false,
        })
    })

    it('USER_FEED_WS_ON_MESSAGE', async () => {
        const stateBefore = { ...initialState }

        const stateAfter = reducer(stateBefore, {
            type: USER_FEED_WS_ON_MESSAGE,
            payload: {
                orders: [],
                total: 11,
                totalToday: 10,
            }
        })
        expect(stateAfter).toEqual({
            ...stateBefore,
            feed: {
                orders: [],
                total: 11,
                totalToday: 10,
            },
        })
    })

})

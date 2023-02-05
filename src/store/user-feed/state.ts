import { TOrderStatus } from '../../types'

export interface WsUserFeedOrder {
    _id: string
    ingredients: string[]
    name: string
    status: TOrderStatus
    number: number
    createdAt: string
    updatedAt: string
}

export interface WsUserFeed {
    orders: WsUserFeedOrder[]
    total: number
    totalToday: number
}

export interface UserFeedState {
    wsConnected: boolean
    feed: WsUserFeed
    error?: Event
}

export const initialState: UserFeedState = {
    wsConnected: false,
    feed: {
        orders: [],
        total: 0,
        totalToday: 0,
    }
}

export const statePath = 'userFeed'

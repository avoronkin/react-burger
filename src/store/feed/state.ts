import { TOrderStatus } from '../../types'

export interface WsFeedOrder {
    _id: string
    ingredients: string[]
    name: string
    status: TOrderStatus
    number: number
    createdAt: string
    updatedAt: string
}

export interface WsFeed {
    orders: WsFeedOrder[]
    total: number
    totalToday: number
}

export interface FeedState {
    wsConnected: boolean
    feed: WsFeed
    error?: Event
}

export const initialState: FeedState = {
    wsConnected: false,
    feed: {
        orders: [],
        total: 0,
        totalToday: 0,
    }
}

export const statePath = 'feed'

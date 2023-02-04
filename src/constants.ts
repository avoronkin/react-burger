export const BASE_URL = 'https://norma.nomoreparties.space/api'
export const FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all'
export const USER_FEED_WS_URL = 'wss://norma.nomoreparties.space/orders'

export const DND_TYPES = {
    INGREDIENT: 'ingredient',
    INTERNAL: 'internal',
}

export const ROUTES = {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',

    MAIN: '/',

    FEED: '/feed',
    FEED_ITEM: '/feed/:id',

    USER_PROFILE: '/profile',
    USER_ORDERS: '/profile/orders',
    USER_ORDERS_ITEM: '/profile/orders/:id',

    INGREDIENT_DETAILS: '/ingredients/:id'
}

export const SESSION_TIME = 24 * 60 * 60

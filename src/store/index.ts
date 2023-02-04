import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { burgerConstructorSlice } from './burger-constructor/slice'
import { burgerIngredientsSlice } from './burger-ingredients/slice'
import { combineReducers } from 'redux'
import { feedReducer } from './feed/reducer'
import { feedWsActionTypes } from '../store/feed/actions'
import { ingredientDetailsSlice } from './ingredient-details/slice'
import { orderSlice } from './order/slice'
import { socketMiddleware } from '../services/socketMiddleware'
import { userFeedReducer } from './user-feed/reducer'
import { userFeedWsActionTypes } from '../store/user-feed/actions'
import { userSlice } from './user/slice'

export const rootReducer = combineReducers({
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer,
    [ingredientDetailsSlice.name]: ingredientDetailsSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    feed: feedReducer,
    userFeed: userFeedReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(socketMiddleware({ wsActionTypes: feedWsActionTypes }))
            .concat(socketMiddleware({ wsActionTypes: userFeedWsActionTypes }))
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

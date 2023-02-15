import configureMockStore from 'redux-mock-store'
import { AppDispatch, RootState } from '.'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
const middlewares = getDefaultMiddleware()
export const mockStore = configureMockStore<RootState, AppDispatch>(middlewares)

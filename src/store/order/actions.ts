import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreateOrderRequest, normaApi } from '../../services/norma-api'
import { orderSlice } from './slice'
import { getCookie } from '../../services/cookie'
import { refreshToken } from '../user/actions'
import { statePath } from './state'

export const { 
    closeOrderDetails 
} = orderSlice.actions

export const createOrder = createAsyncThunk(
    `${statePath}/createOrder`,
    async (params: ICreateOrderRequest, { dispatch }) => {
        try {
            const token = getCookie('accessToken')
            if (!token) {
                throw new Error('access token not found')
            }
            const res = await normaApi.createOrder(params, token)
            
            return res
        } catch (err) {
            if (err instanceof Error && err.message === 'jwt expired') {
                await dispatch(refreshToken())
                const token = getCookie('accessToken')
                if (!token) {
                    throw new Error('access token not found')
                }
                return normaApi.createOrder(params, token)
            } else {
                throw err
            }
        }
        
    }
)

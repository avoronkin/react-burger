import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    IForgotPasswordRequest,
    ILoginRequest,
    IRegisterRequest,
    IResetPasswordRequest,
    IUpdateUserRequest,
    normaApi
} from '../../services/norma-api'
import { getCookie } from '../../services/cookie'
import { statePath } from './state'

export const register = createAsyncThunk(
    `${statePath}/register`,
    async (params: IRegisterRequest) => {
        return normaApi.register(params)
    }
)

export const login = createAsyncThunk(
    `${statePath}/login`,
    async (params: ILoginRequest) => {
        return normaApi.login(params)
    }
)

export const logout = createAsyncThunk(
    `${statePath}/logout`,
    async () => {
        const token = getCookie('refreshToken')
        if (!token) {
            throw new Error('token required')
        }
        return normaApi.logout({ token })
    }
)

export const refreshToken = createAsyncThunk(
    `${statePath}/refreshToken`,
    async () => {
        const token = getCookie('refreshToken')
        if (!token) {
            throw new Error('token required')
        }
        return normaApi.refreshToken({ token })
    }
)

export const forgotPassword = createAsyncThunk(
    `${statePath}/forgotPassword`,
    async (params: IForgotPasswordRequest) => {
        return normaApi.forgotPassword(params)
    }
)

export const resetPassword = createAsyncThunk(
    `${statePath}/resetPassword`,
    async (params: IResetPasswordRequest) => {
        return normaApi.resetPassword(params)
    }
)

export const getUser = createAsyncThunk(
    `${statePath}/getUser`,
    async (_, { dispatch }) => {
        try {
            const token = getCookie('accessToken')
            if (!token) {
                throw new Error('access token not found')
            }

            const resp = await normaApi.getUser(token)
            return resp
        } catch (err) {
            if (err instanceof Error && err.message === 'jwt expired') {
                await dispatch(refreshToken())
                const token = getCookie('accessToken')
                if (!token) {
                    throw new Error('access token not found')
                }
                return normaApi.getUser(token)
            } else {
                throw err
            }
        }
    }
)

export const updateUser = createAsyncThunk(
    `${statePath}/updateUser`,
    async (params: IUpdateUserRequest, { dispatch }) => {
        try {
            const token = getCookie('accessToken')
            if (!token) {
                throw new Error('access token not found')
            }
            const resp = await normaApi.updateUser(params, token)
            return resp
        } catch (err) {
            if (err instanceof Error && err.message === 'jwt expired') {
                await dispatch(refreshToken())
                const token = getCookie('accessToken')
                if (!token) {
                    throw new Error('access token not found')
                }
                return normaApi.updateUser(params, token)
            } else {
                throw err
            }
        }
    }
)

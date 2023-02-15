import { createSlice } from '@reduxjs/toolkit'
import { initialState, statePath } from './state'
import { createOrder } from './actions'

export const orderSlice = createSlice({
    name: statePath,
    initialState,
    reducers: {
        closeOrderDetails: (state) => {
            state.orderDetailsOpen = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.createOrderError = false
                state.createOrderRequest = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.order = {
                    name: action.payload.name,
                    number: action.payload.order.number,
                }
                state.createOrderRequest = false
                state.orderDetailsOpen = true
            })
            .addCase(createOrder.rejected, (state) => {
                state.createOrderRequest = false
                state.createOrderError = true
            })
    }
})

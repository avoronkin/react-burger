import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '../../types'
import { initialState, statePath } from './state'

export const ingredientDetailsSlice = createSlice({
    name: statePath,
    initialState,
    reducers: {
        addIngredientDetails: (state, action: PayloadAction<{ingredient: IIngredient}>) => {
            state.ingredient = action.payload.ingredient
        },
        removeIngredientDetails: (state) => {
            state.ingredient = undefined
        }
    }
})

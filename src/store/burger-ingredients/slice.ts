import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState, statePath } from './state'
import { getIngredients } from './thunks'

export const burgerIngredientsSlice = createSlice({
    name: statePath,
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<{ id: string, intersectionRatio: number }>) => {
            const actionIntersectionRatio = action.payload.intersectionRatio
            const intersectionRatios = state.ingredientTabs.map(t => t.type === action.payload.id ? actionIntersectionRatio : t.intersectionRatio)
            const maxIntersectionRatio = Math.max(...intersectionRatios)

            state.ingredientTabs.forEach(t => {
                const isActionTab = t.type === action.payload.id

                t.active = isActionTab ? actionIntersectionRatio === maxIntersectionRatio : t.intersectionRatio === maxIntersectionRatio
                t.intersectionRatio = isActionTab ? actionIntersectionRatio : t.intersectionRatio
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.ingredients = []
                state.ingredientsError = false
                state.ingredientsRequest = true
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload.ingredients
                state.ingredientsRequest = false
            })
            .addCase(getIngredients.rejected, (state) => {
                state.ingredientsRequest = false
                state.ingredientsError = true
            })
    }
})

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState, statePath } from './state'
import { IIngredient } from '../../types'

export const burgerConstructorSlice = createSlice({
    name: statePath,
    initialState,
    reducers: {
        addBurgerIngredient: (state, action: PayloadAction<{ ingredient: IIngredient }>) => {
            const { ingredient } = action.payload

            if (ingredient.type === 'bun') {
                state.bunIngredient = ingredient
            } else {
                state.internalIngredients.push(ingredient)
            }

        },
        removeBurgerIngredient: (state, action: PayloadAction<{ ingredient: IIngredient }>) => {
            const { ingredient } = action.payload

            state.internalIngredients = state.internalIngredients.filter(i => i.uid !== ingredient.uid)
        },
        moveBurgerIngredient: (state, action: PayloadAction<{ newIndex: number, oldIndex: number }>) => {
            const { newIndex, oldIndex } = action.payload

            state.internalIngredients.splice(newIndex, 0, state.internalIngredients.splice(oldIndex, 1)[0])
        },
        resetBurgerIngredients: () => {
            return initialState
        }
    },
})

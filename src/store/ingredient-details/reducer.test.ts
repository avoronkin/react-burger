import * as actions from './actions'
import { ingredientDetailsSlice } from './slice'
const reducer = ingredientDetailsSlice.reducer
import { initialState } from './state'
import { mainIngredient } from '../fixtures'

describe('ingredient-details reducer', () => {
    it('неизвестное действие должно вернуть первоночальное состояние', () => {
        const stateAfter = reducer(undefined, { type: undefined })

        expect(stateAfter).toEqual(initialState)
    })

    it('addIngredientDetails', () => {
        const stateBefore = {
            ...initialState,
            ingredient: undefined,
        }
        
        const stateAfter = reducer(stateBefore, actions.addIngredientDetails({
            ingredient: mainIngredient
        }))

        expect(stateAfter).toEqual({
            ...stateAfter,
            ingredient: mainIngredient,
        })
    })

    it('removeIngredientDetails', () => {
        const stateBefore = {
            ...initialState,
            ingredient: mainIngredient,
        }
        
        const stateAfter = reducer(stateBefore, actions.removeIngredientDetails())

        expect(stateAfter).toEqual({
            ...stateAfter,
            ingredient: undefined,
        })
    })
})

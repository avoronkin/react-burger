import { burgerIngredientsSlice } from './slice'
const reducer = burgerIngredientsSlice.reducer
import * as actions from './actions'
import { initialState } from './state'
import { mainIngredient, sauceIngredient } from '../fixtures'

describe('burger-ingredients reducer', () => {
    it('неизвестное действие должно вернуть первоночальное состояни', () => {
        const stateAfter = reducer(undefined, {type: undefined })

        expect(stateAfter).toEqual(initialState)
    })

    describe('setActiveTab', () => {
        const stateBefore = {
            ...initialState,
            ingredientTabs: [
                {
                    type: 'bun' as const,
                    name: 'Булки',
                    active: true,
                    intersectionRatio: 1
                },
                {
                    type: 'sauce' as const,
                    name: 'Соусы',
                    active: false,
                    intersectionRatio: 0
                },
                {
                    type: 'main' as const,
                    name: 'Начинки',
                    active: false,
                    intersectionRatio: 0
                },
            ]
        }

        const stateAfter1 = reducer(stateBefore, actions.setActiveTab({
            id: 'sauce',
            intersectionRatio: .7
        }))
        const stateAfter2 = reducer(stateAfter1, actions.setActiveTab({
            id: 'bun',
            intersectionRatio: .2
        }))

        expect(stateAfter2).toEqual({
            ...initialState,
            ingredientTabs: [
                {
                    type: 'bun' as const,
                    name: 'Булки',
                    active: false,
                    intersectionRatio: 0.2
                },
                {
                    type: 'sauce' as const,
                    name: 'Соусы',
                    active: true,
                    intersectionRatio: 0.7
                },
                {
                    type: 'main' as const,
                    name: 'Начинки',
                    active: false,
                    intersectionRatio: 0
                },
            ]
        })
    })

    describe('getIngredients', () => {
        it('pending', async () => {
            const stateBefore = { ...initialState }
            expect(stateBefore).toEqual({
                ...initialState,
                ingredients: [],
                ingredientsRequest: false,
                ingredientsError: false,
            })

            const stateAfter = reducer(stateBefore, {
                type: 'burgerIngredients/getIngredients/pending'
            })

            expect(stateAfter).toEqual({
                ...initialState,
                ingredients: [],
                ingredientsRequest: true,
                ingredientsError: false
            })
        })

        it('rejected', async () => {
            const stateBefore = { ...initialState }
            expect(stateBefore).toEqual({
                ...initialState,
                ingredients: [],
                ingredientsRequest: false,
                ingredientsError: false,
            })

            const stateAfter = reducer(stateBefore, {
                type: 'burgerIngredients/getIngredients/rejected'
            })

            expect(stateAfter).toEqual({
                ...initialState,
                ingredients: [],
                ingredientsRequest: false,
                ingredientsError: true
            })
        })

        it('fullfiled', async () => {
            const stateBefore = { ...initialState }
            expect(stateBefore).toEqual({
                ...initialState,
                ingredients: [],
                ingredientsRequest: false,
                ingredientsError: false,
            })

            const stateAfter = reducer(stateBefore, {
                type: 'burgerIngredients/getIngredients/fulfilled',
                payload: { ingredients: [mainIngredient, sauceIngredient] },
            })

            expect(stateAfter).toEqual({
                ...initialState,
                ingredients: [mainIngredient, sauceIngredient],
                ingredientsRequest: false,
                ingredientsError: false
            })
        })
    })
})

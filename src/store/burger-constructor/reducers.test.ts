import * as actions from './actions'
import { burgerConstructorSlice } from './slice'
const reducer = burgerConstructorSlice.reducer
import { initialState } from './state'
import { mainIngredient, sauceIngredient, bunIngredient, bunIngredient2 } from '../fixtures'

describe('burger-constructor reducer', () => {
    it('неизвестное действие должно вернуть первоночальное состояние', () => {
        const stateAfter = reducer(undefined, { type: undefined })

        expect(stateAfter).toEqual(initialState)
    })

    describe('действие addBurgerIngredient', () => {
        it('добавляет ингредиент основного типа', () => {
            const stateBefore = { 
                ...initialState,
                internalIngredients: [],
                bunIngredient: undefined
            }

            const stateAfter = reducer(stateBefore, actions.addBurgerIngredient({
                ingredient: mainIngredient
            }))
            expect(stateAfter).toEqual({
                internalIngredients: [mainIngredient],
                bunIngredient: undefined,
            })
        })

        it('добавляет ингредиент с типом соус', () => {
            const stateBefore = { 
                ...initialState,
                internalIngredients: [],
                bunIngredient: undefined
            }

            const stateAfter = reducer(stateBefore, actions.addBurgerIngredient({
                ingredient: sauceIngredient
            }))
            expect(stateAfter).toEqual({
                internalIngredients: [sauceIngredient],
                bunIngredient: undefined,
            })
        })

        it('добавляет ингредиент с типом булка', () => {
            const stateBefore = { 
                ...initialState,
                internalIngredients: [],
                bunIngredient: undefined
            }

            const stateAfter = reducer(stateBefore, actions.addBurgerIngredient({
                ingredient: bunIngredient
            }))

            expect(stateAfter).toEqual({
                internalIngredients: [],
                bunIngredient
            })
        })

        it('заменяет ингредиент с типом булка', () => {
            const stateBefore = {
                ...initialState,
                internalIngredients: [],
                bunIngredient: bunIngredient2
            }

            const stateAfter = reducer(stateBefore, actions.addBurgerIngredient({
                ingredient: bunIngredient
            }))

            expect(stateAfter).toEqual({
                internalIngredients: [],
                bunIngredient
            })
        })
    })

    describe('действие removeBurgerIngredient', () => {
        it('удаляет ингредиент', () => {
            const stateBefore = {
                ...initialState,
                internalIngredients: [mainIngredient, sauceIngredient],
                bunIngredient: undefined,
            }

            const stateAfter = reducer(stateBefore, actions.removeBurgerIngredient({
                ingredient: mainIngredient
            }))
            expect(stateAfter).toEqual({
                internalIngredients: [sauceIngredient],
                bunIngredient: undefined,
            })
        })
    })

    describe('действие resetBurgerIngredients', () => {
        it('удаляет все ингредиенты', () => {
            const stateBefore = {
                ...initialState,
                internalIngredients: [mainIngredient, sauceIngredient],
                bunIngredient,
            }

            const stateAfter = reducer(stateBefore, actions.resetBurgerIngredients())
            expect(stateAfter).toEqual({
                internalIngredients: [],
                bunIngredient: undefined,
            })
        })
    })

    describe('действие moveBurgerIngredient', () => {
        it('перемещает ингредиент', () => {
            const stateBefore = {
                ...initialState,
                internalIngredients: [mainIngredient, sauceIngredient],
            }

            const stateAfter = reducer(stateBefore, actions.moveBurgerIngredient({
                oldIndex: 0,
                newIndex: 1,
            }))
            expect(stateAfter).toEqual({
                internalIngredients: [sauceIngredient, mainIngredient],
            })
        })
    })
})

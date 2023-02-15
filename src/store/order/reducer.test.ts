import * as actions from './actions'
import { orderSlice } from './slice'
const reducer = orderSlice.reducer
import { initialState, OrderState } from './state'

interface TestParams {
    name: string
    before: Partial<OrderState>
    action: any
    after: Partial<OrderState>
}
function runTests(tests: TestParams[]) {
    tests.forEach(({ name, before, action, after }) => {
        it(name, () => {
            const stateBefore = {
                ...initialState,
                ...before,
            }

            const stateAfter = reducer(stateBefore, action)

            expect(stateAfter).toEqual({
                ...stateAfter,
                ...after,
            })
        })
    })
}

describe('order reducer', () => {
    it('неизвестное действие должно вернуть первоночальное состояние', () => {
        const stateAfter = reducer(undefined, { type: undefined })

        expect(stateAfter).toEqual(initialState)
    })

    describe('createOrder', () => {
        const tests: TestParams[] = [
            {
                name: 'createOrder/pending',
                action: {
                    type: 'order/createOrder/pending'
                },
                before: {
                    createOrderRequest: false
                },
                after: {
                    createOrderRequest: true
                }
            },
            {
                name: 'createOrder/fulfilled with success=true',
                action: {
                    type: 'order/createOrder/fulfilled',
                    payload: {
                        name: 'name',
                        order: {
                            number: 123
                        }
                    }
                },
                before: {
                    createOrderRequest: true,
                    createOrderError: false,
                    order: undefined,
                },
                after: {
                    createOrderRequest: false,
                    createOrderError: false,
                    order: {
                        name: 'name',
                        number: 123,
                    },
                }
            },
            {
                name: 'createOrder/rejected',
                action: {
                    type: 'order/createOrder/rejected'
                },
                before: {
                    createOrderRequest: true,
                    createOrderError: false,
                },
                after: {
                    createOrderRequest: false,
                    createOrderError: true,
                }
            }
        ]

        runTests(tests)
    })

    it('closeOrderDetails', () => {
        const stateBefore = {
            ...initialState,
            orderDetailsOpen: true,
        }

        const stateAfter = reducer(stateBefore, actions.closeOrderDetails())
        
        expect(stateAfter).toEqual({
            ...stateAfter,
            orderDetailsOpen: false,
        })
    })
})

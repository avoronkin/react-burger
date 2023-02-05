import * as actions from './actions'
import { BASE_URL } from '../../constants'
import fetchMock from 'fetch-mock'
import { mockStore } from '../store.mock'
import { ingredient } from '../fixtures'

describe('burger-ingredients actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('setActiveTab', () => {
        const action = actions.setActiveTab({
            id: 'bun',
            intersectionRatio: .7
        })

        const expectedAction = {
            type: 'burgerIngredients/setActiveTab',
            payload: {
                id: 'bun',
                intersectionRatio: .7
            }
        }

        expect(action).toEqual(expectedAction)
    })

    describe('getIngredients', () => {
        it('getIngredients on success', async () => {
            fetchMock.getOnce(`${BASE_URL}/ingredients`, {
                body: {
                    success: true,
                    data: [ingredient]
                },
                headers: { 'content-type': 'application/json' },
                status: 200
            })
            
            const store = mockStore()

            await store.dispatch(actions.getIngredients())

            expect(store.getActions()).toMatchObject([
                {
                    type: 'burgerIngredients/getIngredients/pending',
                },
                {
                    type: 'burgerIngredients/getIngredients/fulfilled',
                    payload: { ingredients: [ingredient] },
                },
            ])
        })

        it('getIngredients on error', async () => {
            fetchMock.getOnce(`${BASE_URL}/ingredients`, {
                status: 502
            })
            
            const store = mockStore()

            await store.dispatch(actions.getIngredients())

            expect(store.getActions()).toMatchObject([
                {
                    type: 'burgerIngredients/getIngredients/pending',
                },
                {
                    type: 'burgerIngredients/getIngredients/rejected',
                },
            ])
        })
    })
})

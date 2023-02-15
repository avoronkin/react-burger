import * as actions from './actions'
import { ingredient } from '../fixtures'

describe('ingredients-details actions', () => {
    it('addIngredientDetails', () => {
        const action = actions.addIngredientDetails({
            ingredient
        })

        const expectedAction = {
            type: 'ingredientDetails/addIngredientDetails',
            payload: {
                ingredient
            }
        }

        expect(action).toEqual(expectedAction)
    })

    it('removeIngredientDetails', () => {
        const action = actions.removeIngredientDetails()

        const expectedAction = {
            type: 'ingredientDetails/removeIngredientDetails',
        }

        expect(action).toEqual(expectedAction)
    })
})

import { normaApi } from '../../norma-api'
import { IIngredient } from '../../../types'
import { AppThunk } from '../index'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR'

export interface GetIngredientsRequestAction {
    type: typeof GET_INGREDIENTS_REQUEST
}
export interface GetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS
    payload: {
        ingredients: IIngredient[]
    }
}
export interface GetIngredientsErrorAction {
    type: typeof GET_INGREDIENTS_ERROR
}

export type GetIngredientsAction = GetIngredientsRequestAction | GetIngredientsSuccessAction | GetIngredientsErrorAction

const getIngredientsRequest = (): GetIngredientsRequestAction => ({
    type: 'GET_INGREDIENTS_REQUEST'
})

const getIngredientsSuccess = (ingredients: IIngredient[]): GetIngredientsSuccessAction => ({
    type: 'GET_INGREDIENTS_SUCCESS',
    payload: {
        ingredients,
    }
})

const getIngredientsError = (): GetIngredientsErrorAction => ({
    type: 'GET_INGREDIENTS_ERROR'
})

export function getIngredients(): AppThunk {
    return (dispatch) => {
        dispatch(getIngredientsRequest())

        normaApi.getIngredientsList()
            .then(res => {
                if (res && res.success) {
                    dispatch(getIngredientsSuccess(res.data))
                } else {
                    dispatch(getIngredientsError())
                }
            })
            .catch(() => {
                dispatch(getIngredientsError())
            })
    }
}
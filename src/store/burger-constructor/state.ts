import { IIngredient } from '../../types'
export interface BurgerConstructorState {
    internalIngredients: IIngredient[]
    bunIngredient?: IIngredient
}

export const initialState: BurgerConstructorState = {
    internalIngredients: [],
}

export const statePath = 'burgerConstructor'

import { Location } from 'history'
type IIngredientType = 'bun' | 'sauce' | 'main'

export interface IIngredient {
    _id: string
    name: string
    type: IIngredientType
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
    uid?: string
}

export interface IIngredientTab {
    type: IIngredientType
    name: string
    active: boolean
    intersectionRatio: number
}

export interface AppLocationState {
    background?: Location
    from?: Location
}

export type TOrderStatus = 'done' | 'created' | 'pending' | 'canceled'
export interface IOrderMain {
    _id: string
    createdAt: string
    updatedAt: string
    number: number
    name: string
    status: TOrderStatus
}
export interface IOrder extends IOrderMain {
    ingredients: string[]
}

export interface IOrderShortIngredient {
    name: string
    image: string
}
export interface IOrderShort extends IOrderMain {
    ingredients: IOrderShortIngredient[]
    cost: number
}

export interface IOrderDetailsIngredient {
    image: string
    name: string
    price: number
    count: number
}
export interface IOrderDetails extends IOrderMain{
    ingredients: IOrderDetailsIngredient[]
    cost: number
}

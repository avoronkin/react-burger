import {
    IOrderDetails,
    IOrderDetailsIngredient,
    IOrderShort,
    IOrderShortIngredient,
} from '../../types'
import { RootState } from '../index'
import { statePath as ingredientsStatePath } from '../burger-ingredients/state'
import { statePath } from './state'

export interface Feed {
    orders: IOrderShort[]
    total: number
    totalToday: number
    done: string[]
    processing: string[]
}
export const selectFeed = (store: RootState) => {
    const wsFeed = store[statePath].feed
    const ingredients = store[ingredientsStatePath].ingredients

    const feed: Feed = {
        orders: wsFeed.orders.map(order => {
            let orderCost = 0
            const counter: Record<string, number> = {}
            order.ingredients.forEach(ingredientId => {
                const ingredient = ingredients.find(i => i._id === ingredientId)
                if (!ingredient) {
                    return
                }
                
                counter[ingredientId] = counter[ingredientId] || 0
                counter[ingredientId] += ingredient.type === 'bun' ? 2 : 1
            })
            
            const orderIngredients: IOrderShortIngredient[] = []
            Object.keys(counter).forEach(ingredientId => {
                const ingredient = ingredients.find(i => i._id === ingredientId)
                if (!ingredient) {
                    return
                }

                const count = counter[ingredientId]
                orderCost += count * ingredient.price

                orderIngredients.push({
                    image: ingredient.image_mobile,
                    name: ingredient.name,
                })
            })

            return {
                ...order,
                ingredients: orderIngredients,
                cost: orderCost
            }
        }),
        total: wsFeed.total,
        totalToday: wsFeed.totalToday,
        done: wsFeed.orders.filter(o => o.status === 'done').map(o => String(o.number)),
        processing: wsFeed.orders.filter(o => o.status !== 'done').map(o => String(o.number)),
    }

    feed.orders.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())

    return feed
}


export const selectOrderDetails = (orderId: string) => (store: RootState): IOrderDetails | undefined => {
    const wsFeed = store[statePath].feed
    const ingredients = store[ingredientsStatePath].ingredients
    const order = wsFeed.orders.find(order => order._id === orderId)
    if (!order) {
        return
    }

    let orderCost = 0
    const counter: Record<string, number> = {}
    order.ingredients.forEach(ingredientId => {
        const ingredient = ingredients.find(i => i._id === ingredientId)
        if (!ingredient) {
            return
        }

        counter[ingredientId] = counter[ingredientId] || 0
        counter[ingredientId] += ingredient.type === 'bun' ? 2 : 1
    })

    const orderIngredients: IOrderDetailsIngredient[] = []
    Object.keys(counter).forEach(ingredientId => {
        const ingredient = ingredients.find(i => i._id === ingredientId)
        if (!ingredient) {
            return
        }

        const count = counter[ingredientId]
        orderCost += count * ingredient.price

        orderIngredients.push({
            image: ingredient.image_mobile,
            name: ingredient.name,
            price: ingredient.price,
            count,
        })
    })

    const orderDetails: IOrderDetails = {
        ...order,
        ingredients: orderIngredients,
        cost: orderCost,
    }

    return orderDetails
}
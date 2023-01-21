import { BunIngredient } from './bun-ingredient'
import { DND_TYPES } from '../../constants'
import { FC } from 'react'
import { IIngredient } from '../../types'
import { InternalIngredients } from './internal-ingredients'
import { OrderToolbar } from './order-toolbar'
import { addBurgerIngredient } from '../../store/burger-constructor/actions'
import { useAppDispatch } from '../../hooks'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

export const BurgerConstructor: FC = () => {
    const dispatch = useAppDispatch()

    const [, dropRef] = useDrop({
        accept: DND_TYPES.INGREDIENT,
        drop: (ingredient: IIngredient) => dispatch(addBurgerIngredient({ 
            ingredient: {
                ...ingredient,
                uid: uuidv4()
            }
        }))
    })

    return (
        <>
            <div ref={dropRef}>
                <BunIngredient>
                    <InternalIngredients />
                </BunIngredient>
            </div>
            <OrderToolbar />
        </>
    )
}

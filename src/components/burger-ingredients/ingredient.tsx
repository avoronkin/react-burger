import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppLocation, useAppSelector } from '../../hooks'
import { DND_TYPES } from '../../constants'
import { FC } from 'react'
import { IIngredient } from '../../types'
import { Link } from 'react-router-dom'
import { selectIngredientsCount } from '../../store/burger-constructor/selectors'
import styles from './ingredient.module.css'
import { useDrag } from 'react-dnd'

export type IngredientProps = IIngredient
export const Ingredient: FC<IngredientProps> = (props) => {
    const location = useAppLocation()
    const counter = useAppSelector(selectIngredientsCount)
    const count = counter[props._id] || 0

    const [, dragRef] = useDrag(
        () => ({
            type: DND_TYPES.INGREDIENT,
            item: props,
        }),
        []
    )

    return (
        <div
            data-test='il-ingredient'
            className={`${styles.ingredient} text text_type_main-default`}
            ref={dragRef}>
            <Link
                data-test='il-ingredient-link'
                className={styles.ingredientLink}
                to={{
                    pathname: `/ingredients/${props._id}`,
                    state: { background: location }
                }}
            >

                {count ? <Counter 
                    data-test='il-ingredient-counter' 
                    count={count} 
                    size='small' 
                    extraClass='m-1' 
                /> : null}
                <img alt={props.name} src={props.image} />
                <h3 
                    data-test='il-ingredient-price'
                    className={styles.ingredientPrice}
                ><span className='pr-2'>{props.price}</span><CurrencyIcon type="primary" /></h3>
                <h4 
                    data-test='il-ingredient-title'
                >{props.name} </h4>
            </Link>
        </div>
    )
}

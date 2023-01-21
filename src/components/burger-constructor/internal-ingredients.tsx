import { EmptyIngredient } from './empty-ingredient'
import { FC } from 'react'
import { InternalIngredient } from './internal-ingredient'
import { selectBurgerInternalIngredients } from '../../store/burger-constructor/selectors'
import styles from './burger-constructor.module.css'
import { useAppSelector } from '../../hooks'

export const InternalIngredients: FC = () => {
    const internalIngredients = useAppSelector(selectBurgerInternalIngredients)

    return (
        <div className={`${styles.ingridientsScrol} custom-scroll`}>
            {!internalIngredients.length && <EmptyIngredient extraClass='ml-8'>Ингредиенты не выбраны</EmptyIngredient>}
            {
                internalIngredients
                    .map((ingredient, index) => {
                        return (
                            <InternalIngredient
                                ingredient={ingredient}
                                index={index}
                                key={ingredient.uid}
                            />
                        )
                    })
            }
        </div>
    )
}

import { FC, useRef } from 'react'
import { ErrorNote } from '../error'
import { Ingredients } from './ingredients'
import { LoadingSpinner } from '../loading-spinner'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { selectIngredientsList } from '../../store/burger-ingredients/selectors'
import styles from './burger-ingredients.module.css'
import { useAppSelector } from '../../hooks'

export const BurgerIngredients: FC = () => {

    const {
        ingredientTabs,
        ingredients,
        ingredientsError,
        ingredientsRequest
    } = useAppSelector(selectIngredientsList)

    const itemsRefs = useRef<Record<string, HTMLDivElement>>({})

    const onTabClick = (type: string) => {
        itemsRefs?.current[type]?.scrollIntoView({
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <nav className={`${styles.tabs}`}>
                {ingredientTabs.map(({ type, name, active }) => {
                    return (
                        <Tab
                            key={type}
                            value={type}
                            active={active}
                            onClick={() => onTabClick(type)}
                        >
                            {name}
                        </Tab>
                    )
                })}
            </nav>
            <section className={`${styles.ingredientsWrapper} custom-scroll`}>
                {ingredientsRequest && <LoadingSpinner text='Загружаем список ингредиентов'/>}
                {ingredientsError && <ErrorNote>Ошибка при загрузке ингредиентов</ErrorNote>}
                {!ingredientsRequest && !ingredientsError && ingredientTabs.map(({ type, name }) => {
                    return (
                        <div
                            key={type}
                            ref={(element) => {
                                if (itemsRefs?.current && element) {
                                    itemsRefs.current[type] = element
                                }
                            }}
                        >
                            <Ingredients
                                name={name}
                                type={type}
                                ingredients={ingredients.filter(i => i.type === type)}
                            />
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

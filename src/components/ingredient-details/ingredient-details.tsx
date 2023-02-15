import { FC, useEffect } from 'react'
import { addIngredientDetails, removeIngredientDetails } from '../../store/ingredient-details/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectIngredientDetails } from '../../store/ingredient-details/selectors'
import { selectIngredientsList } from '../../store/burger-ingredients/selectors'
import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'

export const IngredientDetails: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const ingredientDetails = useAppSelector(selectIngredientDetails)
    const { ingredients } = useAppSelector(selectIngredientsList)
    
    useEffect(() => {
        if (!ingredientDetails || ingredientDetails._id != id ) {
            const ingredient = ingredients.find(i => i._id === id)
            if (!ingredient) {
                return
            }
            
            dispatch(addIngredientDetails({ ingredient }))
        }

        return () => {
            if (ingredientDetails) {
                dispatch(removeIngredientDetails())
            }
        }
    }, [ingredientDetails, ingredients, id])

    return (
        <>
            {!ingredientDetails && <div>Ингредтент не найден</div>}
            {ingredientDetails && <div className={`${styles.ingredientDetailsContent}`}>
                <img alt={ingredientDetails.name} src={ingredientDetails.image_large} />
                <h4 
                    data-test='id-name'
                    className='text text_type_main-medium'
                >{ingredientDetails.name}</h4>
                <p className={`${styles.ingredientDetailsDescription} text text_type_main-small p-5`}> </p>

                <section className={`${styles.params} p-5`}>
                    <div>
                        <div 
                            data-test='id-calories-title'
                            className={`${styles.paramsRow} text text_type_main-default text_color_inactive`}
                        >Калории,ккал</div>
                        <div
                            data-test='id-calories-value'
                            className={`${styles.paramsRow} text text_type_digits-default text_color_inactive`}
                        >{ingredientDetails.calories}</div>
                    </div>
                    <div>
                        <div
                            data-test='id-proteins-title'
                            className={`${styles.paramsRow} text text_type_main-default text_color_inactive`}
                        >Белки, г</div>
                        <div 
                            data-test='id-proteins-value'
                            className={`${styles.paramsRow} text text_type_digits-default text_color_inactive`}
                        >{ingredientDetails.proteins}</div>
                    </div>
                    <div>
                        <div
                            data-test='id-fat-title'
                            className={`${styles.paramsRow} text text_type_main-default text_color_inactive`}
                        >Жиры, г</div>
                        <div
                            data-test='id-fat-value'
                            className={`${styles.paramsRow} text text_type_digits-default text_color_inactive`}
                        >{ingredientDetails.fat}</div>
                    </div>
                    <div>
                        <div 
                            data-test='id-carbohydrates-title'
                            className={`${styles.paramsRow} text text_type_main-default text_color_inactive`}
                        >Углеводы, г</div>
                        <div 
                            data-test='id-carbohydrates-value'
                            className={`${styles.paramsRow} text text_type_digits-default text_color_inactive`}
                        >{ingredientDetails.carbohydrates}</div>
                    </div>
                </section>
            </div>}
        </>
    )
}

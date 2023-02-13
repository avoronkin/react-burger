import { FC, ReactNode } from 'react'
import styles from './empty-ingredient.module.css'

export interface EmptyIngredientProps {
    type?: 'bottom' | 'top',
    extraClass?: string,
    children?: ReactNode
}

export const EmptyIngredient: FC<EmptyIngredientProps> = ({ type, extraClass = '', children }) => {

    const posClassName = type && ['top', 'bottom'].includes(type) ? `constructor-element_pos_${type}` : ''

    return (
        <div
            data-test={type ? `bc-ingredient-empty${type}` : 'bc-ingredient-empty-middle'}
            className={`constructor-element ${extraClass} ${posClassName} ${styles.element}`}
        >
            <span className={`constructor-element__row ${styles.elementRow}`}>
                {children}
            </span>
        </div>
    )
}

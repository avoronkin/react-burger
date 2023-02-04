import { FC, ReactNode } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './currency.module.css'

export interface CurrencyParams {
    extraClass?: string
    children?: ReactNode,
}
export const Currency: FC<CurrencyParams> = ({ children, extraClass = '' }) => {
    
    return (
        
        <div className={`${styles.currency} ${extraClass}`}>
            <p className='text text_type_digits-default ml-1 mr-1'>
                {children}
            </p>
            <CurrencyIcon type='primary' />
        </div>
    )

}
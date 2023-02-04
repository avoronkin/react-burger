import { Currency } from '../currency'
import { FC } from 'react'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IOrderShort } from '../../types'
import { Link } from 'react-router-dom'
import { OrderStatus } from '../order-status'
import styles from './order-short.module.css'
import { useAppLocation } from '../../hooks'
const MAX_INGREDIENTS_IN_LIST = 5

export interface OrderShortProps {
    order: IOrderShort
    extraClass?: string
    showStatus?: boolean
    feedPath: string
}
export const OrderShort: FC<OrderShortProps> = (props) => {
    const location = useAppLocation()
    const { 
        order, 
        extraClass = '', 
        showStatus = false,
        feedPath
    } = props

    return (
        <Link
            className={styles.orderLink}
            to={{
                pathname: `${feedPath}/${order._id}`,
                state: { background: location }
            }}
        >
            <div className={`${styles.shortOrder} ${extraClass}`}>
                <header className={`${styles.shortOrderHeader} mb-4`}>
                    <div className='text text_type_digits-default'>#{order.number}</div>
                    <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
                </header>
                <main className='mb-4'>
                    <h3 className='text text_type_main-medium mb-2'>{order.name}</h3>
                    {showStatus ? <OrderStatus status={order.status} /> : null}
                </main>
                <footer className={`${styles.shortOrderFooter} mt-4`}>
                    <div className={`${styles.ingredientsList}`}>

                        {
                            order.ingredients.slice(0, MAX_INGREDIENTS_IN_LIST).map(({ image, name }, index) => {
                                return (
                                    <div title={name} className={`${styles.ingredientsListItem}`} style={{ backgroundImage: `url(${image})` }} key={index}></div>
                                )
                            })
                        }
                        {
                            order.ingredients.length > MAX_INGREDIENTS_IN_LIST && <div className={`${styles.ingredientsListItem}`}>
                                <p className='text text_type_main-default'>
                                    +{order.ingredients.length - MAX_INGREDIENTS_IN_LIST}
                                </p>
                            </div>
                        }
                    </div>
                    <Currency>{order.cost}</Currency>
                </footer>
            </div>
        </Link>
    )
}

import { Currency } from '../currency'
import { FC } from 'react'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IOrderDetails } from '../../types'
import { OrderStatus } from '../order-status'
import styles from './order-details.module.css'

export interface OrderDetailsProps {
    order?: IOrderDetails
    className?: string
}

export const OrderDetails: FC<OrderDetailsProps> = ({ order, className = '' }) => {
    const useScroll = order?.ingredients?.length ? order.ingredients.length > 5 : false
    const scrollStyles = useScroll ? `custom-scroll ${styles.orderItemsScroll} pr-3` : ''

    return (
        <div className={className}>
            {!order ? <div className='text text_type_main-medium'>Заказ не найден</div> :
                <>
                    <header className='mb-7'>
                        <h4 className={`${styles.orderNumber} text text_type_digits-default mb-5`}>#{order.number}</h4>
                        <h4 className='text text_type_main-medium mb-3'>{order.name}</h4>
                        {order.status ? <OrderStatus status={order.status} /> : null}
                    </header>
                    <main className='mb-7'>
                        <h4 className='text text_type_main-medium mb-3'>Состав:</h4>
                        <div className={`${styles.orderItems} ${scrollStyles}`}>
                            {
                                order.ingredients.map((item, index) => {
                                    const {
                                        image,
                                        name,
                                        count,
                                        price,
                                    } = item

                                    return (
                                        <div className={`${styles.orderItem} mb-3`} key={index}>
                                            <div
                                                className={`${styles.ingredientImage} mr-3`}
                                                style={{ backgroundImage: `url(${image})` }}
                                            ></div>
                                            <main className={`${styles.orderItemMain}`}>
                                                <p className='text text_type_main-small'>
                                                    {name}
                                                </p>
                                                <Currency>{count} x {price}</Currency>
                                            </main>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </main>

                    <footer className={`${styles.stretched}`}>
                        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
                        <Currency>{order.cost}</Currency>
                    </footer>
                </>}
        </div>
    )
}

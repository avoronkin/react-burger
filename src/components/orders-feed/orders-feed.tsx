import { FC } from 'react'
import { IOrderShort } from '../../types'
import { OrderShort } from '../order-short'
import styles from './orders-feed.module.css'

interface OrdersFeedParams {
    orders: IOrderShort[]
    feedPath: string
    showStatus?: boolean
}
export const OrdersFeed: FC<OrdersFeedParams> = ({ orders, feedPath, showStatus = false }) => {

    return (
        <div className={`${styles.feed} custom-scroll`}>
            {orders.map((order) => {
                return (
                    <OrderShort
                        key={order._id}
                        order={order}
                        extraClass='mb-3 mr-2'
                        feedPath={feedPath}
                        showStatus={showStatus}
                    />
                )
            })}
        </div>
    )
}

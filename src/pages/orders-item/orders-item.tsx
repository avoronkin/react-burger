import { feedWsClose, feedWsOpen } from '../../store/feed/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Centered } from '../../components/centered'
import { FEED_WS_URL } from '../../constants'
import { OrderDetails } from '../../components/order-details'
import { selectOrderDetails } from '../../store/feed/selectors'
import styles from './orders-item.module.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const OrdersItemPage = () => {
    const { id } = useParams<{ id: string }>()
    const order = useAppSelector(selectOrderDetails(id))

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(feedWsOpen({
            wsUrl: FEED_WS_URL
        }))

        return () => { dispatch(feedWsClose()) }

    }, [dispatch])

    return (
        <Centered>
            <OrderDetails 
                order={order} 
                className={`${styles.orderDetails}`}
            />
        </Centered>
    )
}
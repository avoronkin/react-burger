import { useAppDispatch, useAppSelector } from '../../hooks'
import { userFeedWsClose, userFeedWsOpen } from '../../store/user-feed/actions'
import { Centered } from '../../components/centered'
import { OrderDetails } from '../../components/order-details'
import { USER_FEED_WS_URL } from '../../constants'
import { getCookie } from '../../services/cookie'
import { selectOrderDetails } from '../../store/user-feed/selectors'
import styles from './user-orders-item.module.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const UserOrdersItemPage = () => {
    const { id } = useParams<{ id: string }>()
    console.log('UserOrdersItemPage', id)
    const order = useAppSelector(selectOrderDetails(id))
    let accessToken = getCookie('accessToken')
    accessToken = accessToken?.replace('Bearer ', '')

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(userFeedWsOpen({
            wsUrl: `${USER_FEED_WS_URL}?token=${accessToken}`
        }))

        return () => { dispatch(userFeedWsClose()) }

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
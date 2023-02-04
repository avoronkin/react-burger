import { feedWsClose, feedWsOpen } from '../../store/feed/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { FEED_WS_URL } from '../../constants'
import { OrdersFeed } from '../../components/orders-feed'
import { OrdersStatistics } from '../../components/orders-statistics'
import { ROUTES } from '../../constants'
import { selectFeed } from '../../store/feed/selectors'
import styles from './orders.module.css'
import { useEffect } from 'react'

export const OrdersPage = () => {
    const { orders, total, totalToday, done = [], processing = [] } = useAppSelector(selectFeed)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(feedWsOpen({
            wsUrl: FEED_WS_URL
        }))

        return () => { dispatch(feedWsClose()) }

    }, [dispatch])

    return (
        <main className={`${styles.main}`}>
            <section className={`${styles.column}`}>
                <h2 className='text text_type_main-medium mb-3'>Лента заказов</h2>
                <OrdersFeed 
                    orders={orders} 
                    feedPath={ROUTES.FEED}
                />
            </section>
            <section className={`${styles.column}`}>
                <OrdersStatistics  
                    done={done}
                    processing={processing}
                    total={total}
                    totalToday={totalToday}
                />
            </section>
        </main>
    )
}

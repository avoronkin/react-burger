import { ROUTES, USER_FEED_WS_URL } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { userFeedWsClose, userFeedWsOpen } from '../../store/user-feed/actions'
import { OrdersFeed } from '../../components/orders-feed'
import { ProfileLayout } from '../../components/profile/profile-layout'
import { getCookie } from '../../services/cookie'
import { selectFeed } from '../../store/user-feed/selectors'
import { useEffect } from 'react'

export const UserOrdersPage = () => {
    const dispatch = useAppDispatch()
    let accessToken = getCookie('accessToken')
    accessToken = accessToken?.replace('Bearer ', '')

    useEffect(() => {
        dispatch(userFeedWsOpen({
            wsUrl: `${USER_FEED_WS_URL}?token=${accessToken}`
        }))

        return () => { dispatch(userFeedWsClose()) }

    }, [dispatch, accessToken])

    const { orders } = useAppSelector(selectFeed)

    return (
        <ProfileLayout>
            <OrdersFeed 
                orders={orders} 
                feedPath={ROUTES.USER_ORDERS} 
                showStatus={true}
            />
        </ProfileLayout>
    )
}

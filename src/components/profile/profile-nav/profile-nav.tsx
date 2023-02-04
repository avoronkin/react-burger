import {
    Link,
    useRouteMatch
} from 'react-router-dom'
import { FC } from 'react'
import { ROUTES } from '../../../constants'
import styles from './profile-nav.module.css'

export const ProfileNav: FC = () => {
    const matchProfile = useRouteMatch({ path: ROUTES.USER_PROFILE, exact: true })
    const matchOrders = useRouteMatch({ path: ROUTES.USER_ORDERS, exact: true })

    return (
        <ul className={styles.nav}>
            <li className='mb-5'>
                <Link to={ROUTES.USER_PROFILE} className={styles.navItem}>
                    <span className={`text text_type_main-medium ${matchProfile ? styles.textColorActive : 'text_color_inactive'}`}>
                        Профиль
                    </span>
                </Link>
            </li>
            <li className='mb-5'>
                <Link to={ROUTES.USER_ORDERS} className={styles.navItem}>
                    <span className={`text text_type_main-medium ${matchOrders ? styles.textColorActive : 'text_color_inactive'}`}>
                        История заказов
                    </span>
                </Link>
            </li>
            <li className='mb-5'>
                <Link to={ROUTES.LOGOUT} className={styles.navItem}>
                    <span className='text text_type_main-medium text_color_inactive'>
                        Выход
                    </span>
                </Link>
            </li>
        </ul>
    )
}

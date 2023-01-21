import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { TopMenuItem, TopMenuItemProps } from './top-menu-item'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'
import styles from './app-header.module.css'

const topMenuItems: TopMenuItemProps[] = [
    {
        icon: BurgerIcon,
        to: ROUTES.MAIN,
        text: 'Конструктор',
        extraClass: styles.burgerConstructor,
    },
    {
        icon: ListIcon,
        to: ROUTES.ORDERS,
        text: 'Лента заказов',
        extraClass: styles.orderList,
    },
    {
        icon: ProfileIcon,
        to: ROUTES.PROFILE,
        text: 'Личный кабинет',
        extraClass: styles.profile
    }
]

export const AppHeader: FC = () => {

    return (
        <header>
            <ul className={styles.nav}>
                <li className={`${styles.logo} pt-5`}>
                    <Link to='/' className={styles.navItem}>
                        <Logo />
                    </Link>
                </li>
                {
                    topMenuItems.map((topMenuItemProps, index) => {
                        return (
                            <TopMenuItem key={index} {...topMenuItemProps}/>
                        )
                    })
                }
            </ul>
        </header>
    )
}

import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { FC } from 'react'
import styles from './app-header.module.css'

export type TopMenuItemProps = {
    icon: typeof BurgerIcon | typeof ListIcon | typeof ProfileIcon
    to: string
    text: string
    extraClass?: string
}

export const TopMenuItem: FC<TopMenuItemProps> = ({ icon: Icon, to, text, extraClass }) => {
    const match = useRouteMatch({ path: to, exact: true })

    return (
        <li className={`${extraClass ? extraClass : ''} pt-5`}>
            <NavLink to={to} className={styles.navItem}>
                <Icon type={match ? 'primary' : 'secondary'} />
                <span className={`pl-2 text text_type_main-default ${match ? styles.textColorActive : 'text_color_inactive'}`}>
                    {text}
                </span>
            </NavLink>
        </li>
    )
}

import {
    CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { selectOrder } from '../../store/order/selectors'
import styles from './order-details.module.css'
import { useAppSelector } from '../../hooks'

export const OrderDetails: FC = () => {
    const order = useAppSelector(selectOrder)

    return (
        <div className={`${styles.orderContent} m-2`}>
            <h2 className="text text_type_digits-large">{order?.number}</h2>

            <p className="text text_type_main-medium pt-6">{order?.name}</p>

            <span className="p-10"><CheckMarkIcon type="primary" /></span>

            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

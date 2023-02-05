import { FC, ReactNode } from 'react'
import { TOrderStatus } from '../../types'
import styles from './order-status.module.css'

const statusText = {
    done: 'Выполнен',
    created: 'Создан',
    canceled: 'Отменён',
    pending: 'Готовится',
}

export interface OrderStatusParams {
    className?: string
    status: TOrderStatus
    children?: ReactNode
}
export const OrderStatus: FC<OrderStatusParams> = ({ children, status, className = '' }) => {
    
    return (
        <div className={`text text_type_main-small ${styles[status]} ${className}`}>
            {children ? children : statusText[status] }
        </div>
    )
}

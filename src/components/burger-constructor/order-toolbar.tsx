import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { closeOrderDetails, createOrder } from '../../store/order/actions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { FC } from 'react'
import { Modal } from '../modal'
import { OrderDetails } from './order-details'
import { resetBurgerIngredients } from '../../store/burger-constructor/actions'
import { selectCreateOrderRequest } from '../../store/order/selectors'
import { selectDataForOrder } from '../../store/burger-constructor/selectors'
import { selectIsAuthenticated } from '../../store/user/selectors'
import styles from './order-toolbar.module.css'
import { useHistory } from 'react-router-dom'

export const OrderToolbar: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const { burgerCost, canBeOrdered, dataForOrder } = useAppSelector(selectDataForOrder)
    const { createOrderRequest, createOrderError, orderDetailsOpen } = useAppSelector(selectCreateOrderRequest)

    const handleClose = () => {
        dispatch(closeOrderDetails())
        dispatch(resetBurgerIngredients())
    }

    const submitOrder = () => {
        if (!isAuthenticated) {
            history.push('/login')
        } else {
            dispatch(createOrder(dataForOrder))
        }
    }

    return (
        <>
            <div className={`${styles.orderToolbar} p-6`}>
                <span 
                    data-test='bc-cost'
                    className='text text_type_main-medium pr-4'
                >
                    {burgerCost} <CurrencyIcon type='primary' />
                </span>
                <Button
                    data-test='bc-order-button'
                    type='primary'
                    size='large'
                    htmlType='button'
                    onClick={submitOrder}
                    disabled={!canBeOrdered || createOrderRequest || orderDetailsOpen}
                >
                    {createOrderRequest ? 'Создаём заказ' : 'Оформить заказ'}
                </Button>
            </div>
            {createOrderError && <p className="text text_type_main-default">Ошибка при создании заказа</p>}
            { orderDetailsOpen && <Modal
                handleClose={handleClose}
                title='Детали заказа'
            >
                <OrderDetails />
            </Modal>}
        </>
    )
}

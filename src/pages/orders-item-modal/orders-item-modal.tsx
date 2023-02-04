import { FC } from 'react'
import { Modal } from '../../components/modal'
import { OrderDetails } from '../../components/order-details'
import { selectOrderDetails } from '../../store/feed/selectors'
import { useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'

export interface OrdersItemModalParams {
    handleClose: () => void
}
export const OrdersItemModal: FC<OrdersItemModalParams> = ({ handleClose }) => {
    const { id } = useParams<{ id: string }>()
    const order = useAppSelector(selectOrderDetails(id))

    return (
        <Modal
            title='Детали заквза'
            handleClose={handleClose}
        >
            <OrderDetails order={order}/>
        </Modal>
    )
}
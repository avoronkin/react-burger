import { FC } from 'react'
import { Modal } from '../../components/modal'
import { OrderDetails } from '../../components/order-details'
import { selectOrderDetails } from '../../store/user-feed/selectors'
import { useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'

export interface UserOrdersItemModalParams {
    handleClose: () => void
}
export const UserOrdersItemModal: FC<UserOrdersItemModalParams> = ({ handleClose }) => {
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
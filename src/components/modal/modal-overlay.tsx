import { FC, ReactNode } from 'react'
import styles from './modal-overlay.module.css'

export interface ModalOverlayProps {
    handleClose: () => void
    children?: ReactNode,
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ handleClose, children }) => {

    return (
        <div
            data-test='modal-overlay'
            onClick={handleClose}
            className={styles.modalOverlay}
        >
            {children}
        </div>
    )
}

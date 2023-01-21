import { FC, ReactNode } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from './modal-overlay'
import { Portal } from '../portal'
import styles from './modal.module.css'
import { useKey } from '../../hooks'

export interface ModalProps {
    handleClose: () => void
    title?: string
    children?: ReactNode,
}

export const Modal: FC<ModalProps> = ({ handleClose, title, children }) => {
    useKey('Escape', () => handleClose())

    return (
        <Portal containerId='modals-root'>
            <ModalOverlay
                handleClose={handleClose}>

                <section
                    className={`${styles.modal} pt-3 pb-3 pl-4 pr-4`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <header className={`${styles.modalHeader} pb-3`}>
                        <h3 className='text text_type_main-medium'>{title}</h3>
                        <span className={styles.modalClose} >
                            <CloseIcon type="primary" onClick={handleClose} />
                        </span>
                    </header>
                    <main className='p-7 pt-4'>
                        {children}
                    </main>
                </section>
            </ModalOverlay>
        </Portal>
    )
}

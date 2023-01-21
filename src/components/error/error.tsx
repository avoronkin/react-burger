import { FC, ReactNode } from 'react'
import styles from './error.module.css'

export interface ErrorNoteProps {
    children?: ReactNode
}

export const ErrorNote: FC<ErrorNoteProps> = ({ children }) => {

    return (
        <div className={`${styles.error} text text_type_main-default m-3`}>
            {children}
        </div>
    )
}

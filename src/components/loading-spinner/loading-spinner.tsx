import { FC } from 'react'
import styles from './loading-spinner.module.css'

export interface LoadingSpinnerProps {
    text?: string
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ text }) => {
    return (
        <div className={styles.spinnerWrapper}>
            <div className={styles.loadingSpinner}></div>
            { text ? <div className='text text_type_main-default ml-2'>{text}</div> : ''}
        </div>
    )
}

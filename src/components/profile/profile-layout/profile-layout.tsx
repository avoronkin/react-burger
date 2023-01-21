import { FC, ReactNode } from 'react'
import { ProfileNav } from '../profile-nav/profile-nav'
import styles from './profile-layout.module.css'

export interface ProfileLayoutProps {
    children?: ReactNode
}

export const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.column1}>
                <ProfileNav />
            </div>
            <div className={styles.column2}>
                {children}
            </div>
        </div>
    )
}

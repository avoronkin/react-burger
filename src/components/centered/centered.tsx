import { FC, ReactNode } from 'react'

export interface CenteredProps {
    children?: ReactNode
}

export const Centered: FC<CenteredProps> = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {children}
            </div>
        </div>
    )
}

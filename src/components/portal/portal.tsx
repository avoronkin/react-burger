import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
    children: ReactNode
    containerId: string
}

export const Portal: FC<PortalProps> = ({ children, containerId }) => {
    const element = document.getElementById(containerId)
    if (!element) {
        throw new Error(`Не найден элемент с идентификатором ${containerId}`)
    }

    return createPortal(children, element)
}

import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { ErrorNote } from '../error'
import { LoadingSpinner } from '../loading-spinner'
import { ROUTES } from '../../constants'
import { Redirect } from 'react-router-dom'
import { logout } from '../../store/user/actions'
import { selectLogout } from '../../store/user/selectors'

export const Logout: FC = () => {
    const dispatch = useAppDispatch()
    const { logoutRequest, logoutError } = useAppSelector(selectLogout)

    useEffect(() => {
        dispatch(logout())
    }, [])

    return (
        <>
            {logoutRequest && <LoadingSpinner text='Выходим из профиля'/>}
            {logoutError && <ErrorNote>Ошибка при выходе из профиля</ErrorNote>}
            {!logoutRequest && <Redirect to={ROUTES.MAIN} />}
        </>
    )

}

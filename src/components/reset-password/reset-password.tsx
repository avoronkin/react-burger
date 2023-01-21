import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { passwordIsValid, tokenIsValid } from '../../store/user/validation'
import { selectForgotPassword, selectResetPassword } from '../../store/user/selectors'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { ErrorNote } from '../error'
import { FC } from 'react'
import { HelpLink } from '../help-link/help-link'
import { LoadingSpinner } from '../loading-spinner'
import { ROUTES } from '../../constants'
import { Redirect } from 'react-router-dom'
import { resetPassword } from '../../store/user/actions'
import styles from './reset-password.module.css'

interface IResetPasswordForm {
    password: string
    token: string
}

export const ResetPassword: FC = () => {
    const dispatch = useAppDispatch()

    const { 
        resetPasswordRequest,
        resetPasswordError,
        resetPasswordSuccess,
    } = useAppSelector(selectResetPassword)
    const { forgotPasswordSuccess } = useAppSelector(selectForgotPassword)
    
    const {
        values,
        handleChange,
        handleSubmit,
        isValid,
    } = useForm<IResetPasswordForm>({
        initialState: {
            password: '',
            token: '',
        },
        handleSubmit: (values) => dispatch(resetPassword(values)),
        isValid: (values) => {
            return passwordIsValid(values.password) 
                && tokenIsValid(values.token)
        }
    })

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {!forgotPasswordSuccess && <Redirect to={ROUTES.FORGOT_PASSWORD}/>}
            {resetPasswordSuccess && <Redirect to={ROUTES.MAIN}/>}
            <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
            {resetPasswordError && <ErrorNote>Ошибка при сбросе пароля</ErrorNote>}
            {resetPasswordRequest && <LoadingSpinner text='Сбрасываем пароль'/> }
            <PasswordInput
                name={'password'}
                value={values.password}
                onChange={handleChange}
                extraClass='m-2'
                placeholder='Введите новый пароль'
                disabled={resetPasswordRequest}
            />
            <Input
                name='token'
                value={values.token}
                onChange={handleChange}
                extraClass='m-2'
                placeholder='Введите код из письма'
                disabled={resetPasswordRequest}
            />
            <Button
                htmlType='submit'
                type='primary'
                extraClass='mt-2 mb-15'
                size='medium'
                disabled={!isValid || resetPasswordRequest}
            >
                Сохранить
            </Button>

            <HelpLink
                beforeText='Вспомнили пароль?'
                linkText='Войти'
                to={ROUTES.LOGIN}
            />
        </form>
    )
}

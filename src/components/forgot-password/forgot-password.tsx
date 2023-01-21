import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { ErrorNote } from '../error'
import { FC } from 'react'
import { HelpLink } from '../help-link/help-link'
import { LoadingSpinner } from '../loading-spinner'
import { ROUTES } from '../../constants'
import { Redirect } from 'react-router-dom'
import { emailIsValid } from '../../store/user/validation'
import { forgotPassword } from '../../store/user/actions'
import { selectForgotPassword } from '../../store/user/selectors'
import styles from './forgot-password.module.css'

interface IForgotPasswordForm {
    email: string
}

export const ForgotPassword: FC = () => {
    const dispatch = useAppDispatch()
    
    const { 
        forgotPasswordRequest,
        forgotPasswordError,
        forgotPasswordSuccess, 
    } = useAppSelector(selectForgotPassword)
    
    const {
        values,
        handleChange,
        handleSubmit,
        isValid,
    } = useForm<IForgotPasswordForm>({
        initialState: {
            email: '',
        },
        handleSubmit: (values) => dispatch(forgotPassword(values)),
        isValid: (values) => {
            return emailIsValid(values.email)
        }
    })
    
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {forgotPasswordSuccess && <Redirect to={ROUTES.RESET_PASSWORD} /> }
            <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
            {forgotPasswordError && <ErrorNote>Ошибка при сбросе пароля</ErrorNote>}
            {forgotPasswordRequest && <LoadingSpinner text='Сбрасываем пароль'/>}
            <EmailInput
                name='email'
                value={values.email}
                onChange={handleChange}
                isIcon={false}
                extraClass='m-2'
                placeholder='Укажите e-mail'
                disabled={forgotPasswordRequest}
            />
            <Button 
                htmlType='submit'
                type='primary'
                extraClass='mt-2 mb-15'
                size='medium'
                disabled={!isValid || forgotPasswordRequest}
            >
                Восстановить
            </Button>

            <HelpLink 
                beforeText='Вспомнили пароль?'
                linkText='Войти'
                to={ROUTES.LOGIN}
            />
        </form>
    )
}

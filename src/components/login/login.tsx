import {
    Button,
    EmailInput,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { emailIsValid, passwordIsValid } from '../../store/user/validation'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { ErrorNote } from '../error'
import { FC } from 'react'
import { HelpLink } from '../help-link/help-link'
import { LoadingSpinner } from '../loading-spinner'
import { ROUTES } from '../../constants'
import { login } from '../../store/user/actions'
import { selectLogin } from '../../store/user/selectors'
import styles from './login.module.css'

interface ILoginForm {
    email: string
    password: string
}

export const Login: FC = () => {
    const { loginRequest, loginError } = useAppSelector(selectLogin)
    const dispatch = useAppDispatch()

    const { 
        values, 
        handleChange, 
        handleSubmit,
        isValid,
    } = useForm<ILoginForm>({
        initialState: {
            email: '',
            password: ''
        },
        handleSubmit: (values) => dispatch(login(values)),
        isValid: (values) => {
            return emailIsValid(values.email) 
                && passwordIsValid(values.password)
        }
    })

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className='text text_type_main-medium'>Вход</h2>
            {loginRequest && <LoadingSpinner text='Авторизуем пользователя' />}
            {loginError && <ErrorNote>Ошибка при авторизации</ErrorNote>}
            <EmailInput
                name='email'
                value={values.email}
                onChange={handleChange}
                isIcon={false}
                extraClass='m-2'
                disabled={loginRequest}
            />
            <PasswordInput
                name='password'
                value={values.password}
                onChange={handleChange}
                extraClass='m-2'
                disabled={loginRequest}
            />
            <Button
                htmlType='submit'
                type='primary'
                extraClass='mt-2 mb-15'
                size='medium'
                disabled={!isValid || loginRequest}
            >
                Войти
            </Button>

            <HelpLink
                beforeText='Вы - новый пользователь?'
                linkText='Зарегистрироваться'
                to={ROUTES.REGISTER}
            />
            <HelpLink
                beforeText='Забыли пароль?'
                linkText='Восстановить пароль'
                to={ROUTES.FORGOT_PASSWORD}
            />
        </form>
    )
}

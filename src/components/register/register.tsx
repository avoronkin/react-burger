import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { emailIsValid, nameIsValid, passwordIsValid } from '../../store/user/validation'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { ErrorNote } from '../error'
import { FC } from 'react'
import { HelpLink } from '../help-link/help-link'
import { LoadingSpinner } from '../loading-spinner'
import { ROUTES } from '../../constants'
import { register } from '../../store/user/actions'
import { selectRegister } from '../../store/user/selectors'
import styles from './register.module.css'

interface IRegisterForm {
    name: string
    email: string
    password: string
}

export const Register: FC = () => {
    const {
        registerRequest,
        registerError,
    } = useAppSelector(selectRegister)
    const dispatch = useAppDispatch()

    const {
        values,
        handleChange,
        handleSubmit,
        isValid,
    } = useForm<IRegisterForm>({
        initialState: {
            name: '',
            email: '',
            password: ''
        },
        handleSubmit: (values) => dispatch(register(values)),
        isValid: (values) => {
            return nameIsValid(values.name)
                && emailIsValid(values.email)
                && passwordIsValid(values.password)
        }
    })

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className='text text_type_main-medium'>Регистрация</h2>
            {registerRequest && <LoadingSpinner text='Создаём пользователя' />}
            {registerError && <ErrorNote>Ошибка при создании пользователя</ErrorNote>}
            <Input
                name='name'
                value={values.name}
                onChange={handleChange}
                extraClass='m-2'
                placeholder='Имя'
                disabled={registerRequest}
            />
            <EmailInput
                name='email'
                value={values.email}
                onChange={handleChange}
                isIcon={false}
                extraClass='m-2'
                disabled={registerRequest}
            />
            <PasswordInput
                name='password'
                value={values.password}
                onChange={handleChange}
                extraClass='m-2'
                disabled={registerRequest}
            />
            <Button
                htmlType='submit'
                type='primary'
                extraClass='mt-2 mb-15'
                size='medium'
                disabled={!isValid || registerRequest}
            >
                Зарегистрироваться
            </Button>
            <HelpLink
                beforeText='Уже зарегистрированы?'
                linkText='Войти'
                to={ROUTES.LOGIN}
            />
        </form>
    )
}

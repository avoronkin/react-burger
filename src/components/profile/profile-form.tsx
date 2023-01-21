
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect } from 'react'
import { emailIsValid, nameIsValid, passwordIsValid, } from '../../store/user/validation'
import { getUser, updateUser } from '../../store/user/actions'
import { selectGetUser, selectUpdateUser } from '../../store/user/selectors'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { ErrorNote } from '../error'
import { LoadingSpinner } from '../loading-spinner'
import styles from './profile-form.module.css'

interface IProfileForm {
    name: string
    email: string
    password: string
}

export const ProfileForm: FC = () => {
    const dispatch = useAppDispatch()
    const { user, getUserRequest, getUserError } = useAppSelector(selectGetUser)
    const { updateUserRequest, updateUserError } = useAppSelector(selectUpdateUser)

    const {
        values,
        setValues,
        handleChange,
        handleSubmit,
        isValid,
    } = useForm<IProfileForm>({
        initialState: {
            name: '',
            email: '',
            password: '',
        },
        handleSubmit: (values) => dispatch(updateUser(values)),
        isValid: (values) => {
            return nameIsValid(values.name)
                && emailIsValid(values.email)
                && passwordIsValid(values.password)
        },
    })

    const resetFormChanges = () => {
        setValues({
            name: user?.name || '',
            email: user?.email || '',
            password: ''
        })
    }

    useEffect(() => {
        if (user) {
            resetFormChanges()
        }
    }, [user])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])


    const updateUserFormChanged = !!values.password
        || values.email !== user?.email
        || values.name !== user?.name

    return (

        <form
            className={styles.form}
            onSubmit={handleSubmit}
            onReset={() => resetFormChanges()}
        >
            {getUserRequest && <LoadingSpinner text='Загружаем данные пользователя' />}
            {getUserError && <ErrorNote>Ошибка при загрузке профиля</ErrorNote>}
            {updateUserRequest && <LoadingSpinner text='Обновляем данные пользователя' />}
            {updateUserError && <ErrorNote>Ошибка при обноволении профиля</ErrorNote>}
            {updateUserFormChanged && !isValid && <ErrorNote>Ошибка валидации</ErrorNote>}
            <Input
                name='name'
                value={values.name}
                onChange={handleChange}
                extraClass='m-2'
                placeholder='Имя'
                disabled={getUserRequest || updateUserRequest}
            />
            <EmailInput
                name='email'
                value={values.email}
                onChange={handleChange}
                isIcon={false}
                extraClass='m-2'
                disabled={getUserRequest || updateUserRequest}
            />
            <PasswordInput
                name='password'
                value={values.password}
                onChange={handleChange}
                extraClass='m-2'
                disabled={getUserRequest || updateUserRequest}
            />
            <div>
                <Button
                    htmlType='submit'
                    type='primary'
                    extraClass='mt-2 mb-15 ml-2'
                    size='medium'
                    disabled={!isValid || getUserRequest || updateUserRequest || !updateUserFormChanged}
                >
                    Сохранить
                </Button>
                <Button
                    htmlType='reset'
                    type='primary'
                    extraClass='mt-2 mb-15 ml-2'
                    size='medium'
                    disabled={getUserRequest || updateUserRequest || !updateUserFormChanged}
                >
                    Отмена
                </Button>
            </div>
        </form>
    )
}

import {
    Error404Page,
    ForgotPasswordPage,
    HomePage,
    IngredientDetailsPage,
    LoginPage,
    LogoutPage,
    OrdersPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
} from '../../pages'
import { FC, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useAppDispatch, useAppLocation } from '../../hooks'
import { AppHeader } from '../app-header'
import { IngredientDetails } from '../ingredient-details'
import { Modal } from '../modal'
import { ProtectedRoute } from '../protected-route'
import { ROUTES } from '../../constants'
import { getIngredients } from '../../store/burger-ingredients/actions'
import { getUser } from '../../store/user/actions'
import styles from './app.module.css'

export const App: FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const location = useAppLocation()
    const background = location.state && location.state?.background
    const history = useHistory()

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <AppHeader />
                <Switch location={background || location}>
                    <Route path={ROUTES.MAIN} exact>
                        <HomePage />
                    </Route>
                    <Route path={ROUTES.INGREDIENT_DETAILS} exact>
                        <IngredientDetailsPage />
                    </Route>
                    
                    <ProtectedRoute path={ROUTES.LOGIN} exact role='guest'>
                        <LoginPage />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTES.REGISTER} exact role='guest'>
                        <RegisterPage />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTES.FORGOT_PASSWORD} exact role='guest'>
                        <ForgotPasswordPage />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTES.RESET_PASSWORD} exact role='guest'>
                        <ResetPasswordPage />
                    </ProtectedRoute>
                    
                    <ProtectedRoute path={ROUTES.LOGOUT} exact role='user'>
                        <LogoutPage />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTES.PROFILE} exact role='user'>
                        <ProfilePage />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTES.ORDERS} exact role='user'>
                        <OrdersPage />
                    </ProtectedRoute>
                    
                    <Route path="*">
                        <Error404Page />
                    </Route>
                </Switch>
                {background && (<Route path={ROUTES.INGREDIENT_DETAILS}>
                    <Modal 
                        title='Детали ингридиента'
                        handleClose={() => {
                            history.replace({ pathname: ROUTES.MAIN })
                        }} 
                    >
                        <IngredientDetails />
                    </Modal>
                </Route>)}
            </div>
        </div>
    )
}

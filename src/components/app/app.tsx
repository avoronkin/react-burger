import {
    Error404Page,
    ForgotPasswordPage,
    HomePage,
    IngredientDetailsPage,
    LoginPage,
    LogoutPage,
    OrdersItemModal,
    OrdersItemPage,
    OrdersPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
    UserOrdersItemModal,
    UserOrdersItemPage,
    UserOrdersPage,
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
                    <Route path={ROUTES.FEED} exact>
                        <OrdersPage />
                    </Route>
                    <Route path={ROUTES.FEED_ITEM}>
                        <OrdersItemPage />
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
                    <ProtectedRoute path={ROUTES.USER_PROFILE} exact role='user'>
                        <ProfilePage />
                    </ProtectedRoute>

                    <ProtectedRoute path={ROUTES.USER_ORDERS} exact role='user'>
                        <UserOrdersPage />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTES.USER_ORDERS_ITEM} role='user'>
                        <UserOrdersItemPage />
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
                {background && (<Route path={ROUTES.FEED_ITEM}>
                    <OrdersItemModal
                        handleClose={() => {
                            history.replace({ pathname: ROUTES.FEED })
                        }}
                    />
                </Route>)}
                {background && (<ProtectedRoute path={ROUTES.USER_ORDERS_ITEM} role='user'>
                    <UserOrdersItemModal
                        handleClose={() => {
                            history.replace({ pathname: ROUTES.USER_ORDERS })
                        }}
                    />
                </ProtectedRoute>)}
            </div>
        </div>
    )
}

// import * as actions from './actions'
import { userSlice } from './slice'
const reducer = userSlice.reducer
import { initialState, IUserState } from './state'
interface TestParams {
    name: string
    before: Partial<IUserState>
    action: any
    after: Partial<IUserState>
}
function runTests(tests: TestParams[]) {
    tests.forEach(({ name, before, action, after }) => {
        it(name, () => {
            const stateBefore = {
                ...initialState,
                ...before,
            }

            const stateAfter = reducer(stateBefore, action)

            expect(stateAfter).toEqual({
                ...stateAfter,
                ...after,
            })
        })
    })
}

describe('order reducer', () => {
    it('неизвестное действие должно вернуть первоночальное состояние', () => {
        const stateAfter = reducer(undefined, { type: undefined })

        expect(stateAfter).toEqual(initialState)
    })

    describe('register', () => {
        const tests: TestParams[] = [
            {
                name: 'register/pending',
                action: {
                    type: 'user/register/pending'
                },
                before: {
                    registerRequest: false
                },
                after: {
                    registerRequest: true
                }
            },
            {
                name: 'register/fulfilled with success=true',
                action: {
                    type: 'user/register/fulfilled',
                    payload: {
                        success: true,
                        user: {
                            name: 'name',
                            email: 'email'
                        }
                    }
                },
                before: {
                    registerRequest: true,
                    registerError: false,
                    user: undefined,
                },
                after: {
                    registerRequest: false,
                    registerError: false,
                    user: {
                        name: 'name',
                        email: 'email'
                    },
                }
            },
            {
                name: 'register/fulfilled with success=false',
                action: {
                    type: 'user/register/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    registerRequest: true,
                    registerError: false,
                    user: undefined,
                },
                after: {
                    registerRequest: false,
                    registerError: true,
                    user: undefined,
                }
            },
            {
                name: 'register/rejected',
                action: {
                    type: 'user/register/rejected'
                },
                before: {
                    registerRequest: true,
                    registerError: false,
                    user: undefined,
                },
                after: {
                    registerRequest: false,
                    registerError: true,
                    user: undefined,
                }
            }
        ]

        runTests(tests)
    })

    describe('login', () => {
        const tests: TestParams[] = [
            {
                name: 'login/pending',
                action: {
                    type: 'user/login/pending'
                },
                before: {
                    loginRequest: false
                },
                after: {
                    loginRequest: true
                }
            },
            {
                name: 'login/fulfilled with success=true',
                action: {
                    type: 'user/login/fulfilled',
                    payload: {
                        success: true,
                        user: {
                            name: 'name',
                            email: 'email'
                        }
                    }
                },
                before: {
                    loginRequest: true,
                    loginError: false,
                    user: undefined,
                },
                after: {
                    loginRequest: false,
                    loginError: false,
                    user: {
                        name: 'name',
                        email: 'email'
                    },
                }
            },
            {
                name: 'login/fulfilled with success=false',
                action: {
                    type: 'user/login/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    loginRequest: true,
                    loginError: false,
                    user: undefined,
                },
                after: {
                    loginRequest: false,
                    loginError: true,
                    user: undefined,
                }
            },
            {
                name: 'login/rejected',
                action: {
                    type: 'user/login/rejected'
                },
                before: {
                    loginRequest: true,
                    loginError: false,
                    user: undefined,
                },
                after: {
                    loginRequest: false,
                    loginError: true,
                    user: undefined,
                }
            }
        ]

        runTests(tests)
    })

    describe('refreshToken', () => {
        const tests: TestParams[] = [
            {
                name: 'refreshToken/pending',
                action: {
                    type: 'user/refreshToken/pending'
                },
                before: {
                    refreshTokenRequest: false
                },
                after: {
                    refreshTokenRequest: true
                }
            },
            {
                name: 'refreshToken/fulfilled with success=true',
                action: {
                    type: 'user/refreshToken/fulfilled',
                    payload: {
                        success: true,
                        accessToken: 'accessToken',
                        refreshToken: 'refreshToken',
                    }
                },
                before: {
                    refreshTokenRequest: true,
                    refreshTokenError: false,
                },
                after: {
                    refreshTokenRequest: false,
                    refreshTokenError: false,
                }
            },
            {
                name: 'refreshToken/fulfilled with success=false',
                action: {
                    type: 'user/refreshToken/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    refreshTokenRequest: true,
                    refreshTokenError: false,
                },
                after: {
                    refreshTokenRequest: false,
                    refreshTokenError: true,
                }
            },
            {
                name: 'refreshToken/rejected',
                action: {
                    type: 'user/refreshToken/rejected'
                },
                before: {
                    refreshTokenRequest: true,
                    refreshTokenError: false,
                },
                after: {
                    refreshTokenRequest: false,
                    refreshTokenError: true,
                }
            }
        ]

        runTests(tests)
    })

    describe('logout', () => {
        const tests: TestParams[] = [
            {
                name: 'logout/pending',
                action: {
                    type: 'user/logout/pending'
                },
                before: {
                    logoutRequest: false
                },
                after: {
                    logoutRequest: true
                }
            },
            {
                name: 'logout/fulfilled with success=true',
                action: {
                    type: 'user/logout/fulfilled',
                    payload: {
                        success: true,
                    }
                },
                before: {
                    logoutRequest: true,
                    logoutError: false,
                },
                after: {
                    logoutRequest: false,
                    logoutError: false,
                }
            },
            {
                name: 'logout/fulfilled with success=false',
                action: {
                    type: 'user/logout/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    logoutRequest: true,
                    logoutError: false,
                },
                after: {
                    logoutRequest: false,
                    logoutError: true,
                }
            },
            {
                name: 'logout/rejected',
                action: {
                    type: 'user/logout/rejected'
                },
                before: {
                    logoutRequest: true,
                    logoutError: false,
                },
                after: {
                    logoutRequest: false,
                    logoutError: true,
                }
            }
        ]

        runTests(tests)
    })

    describe('forgotPassword', () => {
        const tests: TestParams[] = [
            {
                name: 'forgotPassword/pending',
                action: {
                    type: 'user/forgotPassword/pending'
                },
                before: {
                    forgotPasswordRequest: false
                },
                after: {
                    forgotPasswordRequest: true
                }
            },
            {
                name: 'forgotPassword/fulfilled with success=true',
                action: {
                    type: 'user/forgotPassword/fulfilled',
                    payload: {
                        success: true,
                    }
                },
                before: {
                    forgotPasswordRequest: true,
                    forgotPasswordError: false,
                    forgotPasswordSuccess: false
                },
                after: {
                    forgotPasswordRequest: false,
                    forgotPasswordError: false,
                    forgotPasswordSuccess: true,
                }
            },
            {
                name: 'forgotPassword/fulfilled with success=false',
                action: {
                    type: 'user/forgotPassword/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    forgotPasswordRequest: true,
                    forgotPasswordError: false,
                    forgotPasswordSuccess: false,
                },
                after: {
                    forgotPasswordRequest: false,
                    forgotPasswordError: true,
                    forgotPasswordSuccess: false,
                }
            },
            {
                name: 'forgotPassword/rejected',
                action: {
                    type: 'user/forgotPassword/rejected'
                },
                before: {
                    forgotPasswordRequest: true,
                    forgotPasswordError: false,
                    forgotPasswordSuccess: false,
                },
                after: {
                    forgotPasswordRequest: false,
                    forgotPasswordError: true,
                    forgotPasswordSuccess: false,
                }
            }
        ]

        runTests(tests)
    })

    describe('resetPassword', () => {
        const tests: TestParams[] = [
            {
                name: 'resetPassword/pending',
                action: {
                    type: 'user/resetPassword/pending'
                },
                before: {
                    resetPasswordRequest: false
                },
                after: {
                    resetPasswordRequest: true
                }
            },
            {
                name: 'resetPassword/fulfilled with success=true',
                action: {
                    type: 'user/resetPassword/fulfilled',
                    payload: {
                        success: true,
                    }
                },
                before: {
                    resetPasswordRequest: true,
                    resetPasswordError: false,
                    resetPasswordSuccess: false
                },
                after: {
                    resetPasswordRequest: false,
                    resetPasswordError: false,
                    resetPasswordSuccess: true,
                }
            },
            {
                name: 'resetPassword/fulfilled with success=false',
                action: {
                    type: 'user/resetPassword/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    resetPasswordRequest: true,
                    resetPasswordError: false,
                    resetPasswordSuccess: false,
                },
                after: {
                    resetPasswordRequest: false,
                    resetPasswordError: true,
                    resetPasswordSuccess: false,
                }
            },
            {
                name: 'resetPassword/rejected',
                action: {
                    type: 'user/resetPassword/rejected'
                },
                before: {
                    resetPasswordRequest: true,
                    resetPasswordError: false,
                    resetPasswordSuccess: false,
                },
                after: {
                    resetPasswordRequest: false,
                    resetPasswordError: true,
                    resetPasswordSuccess: false,
                }
            }
        ]

        runTests(tests)
    })

    describe('getUser', () => {
        const tests: TestParams[] = [
            {
                name: 'getUser/pending',
                action: {
                    type: 'user/getUser/pending'
                },
                before: {
                    getUserRequest: false
                },
                after: {
                    getUserRequest: true
                }
            },
            {
                name: 'getUser/fulfilled with success=true',
                action: {
                    type: 'user/getUser/fulfilled',
                    payload: {
                        success: true,
                        user: {
                            name: 'name',
                            email: 'email',
                        }
                    }
                },
                before: {
                    getUserRequest: true,
                    getUserError: false,
                    user: undefined,
                },
                after: {
                    getUserRequest: false,
                    getUserError: false,
                    user: {
                        name: 'name',
                        email: 'email',
                    },
                }
            },
            {
                name: 'getUser/fulfilled with success=false',
                action: {
                    type: 'user/getUser/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    getUserRequest: true,
                    getUserError: false,
                    user: undefined,
                },
                after: {
                    getUserRequest: false,
                    getUserError: true,
                    user: undefined,
                }
            },
            {
                name: 'getUser/rejected',
                action: {
                    type: 'user/getUser/rejected'
                },
                before: {
                    getUserRequest: true,
                    getUserError: false,
                },
                after: {
                    getUserRequest: false,
                    getUserError: true,
                }
            }
        ]

        runTests(tests)
    })

    describe('updateUser', () => {
        const tests: TestParams[] = [
            {
                name: 'updateUser/pending',
                action: {
                    type: 'user/updateUser/pending'
                },
                before: {
                    updateUserRequest: false
                },
                after: {
                    updateUserRequest: true
                }
            },
            {
                name: 'updateUser/fulfilled with success=true',
                action: {
                    type: 'user/updateUser/fulfilled',
                    payload: {
                        success: true,
                        user: {
                            name: 'name',
                            email: 'email',
                        }
                    }
                },
                before: {
                    updateUserRequest: true,
                    updateUserError: false,
                    user: undefined,
                },
                after: {
                    updateUserRequest: false,
                    updateUserError: false,
                    user: {
                        name: 'name',
                        email: 'email',
                    },
                }
            },
            {
                name: 'updateUser/fulfilled with success=false',
                action: {
                    type: 'user/updateUser/fulfilled',
                    payload: {
                        success: false,
                    }
                },
                before: {
                    updateUserRequest: true,
                    updateUserError: false,
                    user: undefined,
                },
                after: {
                    updateUserRequest: false,
                    updateUserError: true,
                    user: undefined,
                }
            },
            {
                name: 'updateUser/rejected',
                action: {
                    type: 'user/updateUser/rejected'
                },
                before: {
                    updateUserRequest: true,
                    updateUserError: false,
                },
                after: {
                    updateUserRequest: false,
                    updateUserError: true,
                }
            }
        ]

        runTests(tests)
    })
})

import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/common/api/api.js'
import useModalStore from '@/stores/modal.js'
import AuthModal from '@/components/modals/AuthModal.vue'

export const useAuthStore = defineStore('auth', () => {
    const initialErrors = () => {
        return {
            status: null,
            messages: {
                email: [],
                password: [],
                confirm_password: [],
                global: [],
            }
        }
    }
    const errors = reactive(initialErrors())

    const tokens =
        localStorage.getItem('tokens') === null ?
            reactive({ accessToken: null, refreshToken: null }) :
            reactive(JSON.parse(localStorage.getItem('tokens')))

    const user =
        localStorage.getItem('user') === null
            ? ref(null)
            : ref(JSON.parse(localStorage.getItem('user')))

    const router = useRouter()

    const register = async (data) => {
        return await api.post('reg', { ...data }).then( (response) => {
            setUser({ email: response.data.email })
            resetErrors()
            return Promise.resolve()
        }).catch((err) => {
            if ([400, 409].includes(err.response.status)) {
                handleErrors(err.response.data)
            }
            return Promise.reject(err)
        })
    }

    const getUser = async () => {
        return await api.get('auth').then( (response) => {
            setUser({ email: response.data.email })
            resetErrors()
            return Promise.resolve()
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

    const login = async (data) => {
        return await api.post('auth', { ...data }).then((response) => {
            setTokens(response.data.accessToken)
            resetErrors()
            return Promise.resolve()
        }).catch((err) => {
            if ([400, 404].includes(err.response.status)) {
                handleErrors(err.response.data)
            }
            return Promise.reject(err)
        })
    }

    const logout = async (sessionExpired = false) => {
        if(!sessionExpired)
            return await api.delete('auth').then(async () => {
                resetAuth()
                await router.push({path: '/'})
            })
        else {
            resetAuth()
            await router.push({path: '/'})
            await useModalStore().open(AuthModal, { id: 'modalLogin' })
        }

        return Promise.resolve()
    }

    const resetAuth = () => {
        localStorage.removeItem('tokens')
        localStorage.removeItem('user')
        tokens.refreshToken = null
        tokens.accessToken = null
        user.value = null
    }

    const setTokens = (accessToken, refreshToken = null) => {
        tokens.accessToken = accessToken
        tokens.refreshToken = refreshToken
        localStorage.setItem('tokens', JSON.stringify(tokens))
    }

    const setUser = (userData) => {
        user.value = userData
        localStorage.setItem('user', JSON.stringify(user.value))
    }

    const resetErrors = () => {
        Object.assign(errors, initialErrors())
    }

    const handleErrors = (errorResponse) => {
        resetErrors()

        if (errorResponse.statusCode)
            errors.status = errorResponse.statusCode

        const errorMessages = Array.isArray(errorResponse.message) ? errorResponse.message : [errorResponse.message]

        // Костыль для вывода ошибок к конкретным input
        // Back отдаёт массив строк, а не массив объектов с массивами
        // Например:
        // message = [
        //    {
        //       'email': [
        //          'Ошибка email'
        //       ]
        //    },
        //    {
        //       'password': [
        //          'Ошибка password',
        //          'Ошибка2 password'
        //       ]
        //    },
        // ]
        errorMessages.forEach(message => {
            if (/адрес электронной почты/i.test(message) || /e-mail не может/i.test(message)) {
                errors.messages.email.push(message)
            } else if (/комбинация логин\/пароль/i.test(message)) {
                errors.messages.global.push(message)
            } else if (/парол/i.test(message)) {
                if (/подтверждение пароля/i.test(message)) {
                    errors.messages.confirm_password.push(message)
                } else {
                    errors.messages.password.push(message)
                }
            } else {
                errors.messages.global.push(message)
            }
        })
    }

    const isAuth = () => {
        return tokens.accessToken !== null
    }

    const isValid = (field) => {
        return !Object.prototype.hasOwnProperty.call(errors.messages, field)
    }

    const errorFeedback = (field) => {
        if (!isValid(field) && Array.isArray(errors.messages[field]))
            return errors.messages[field][0]
        return ''
    }

    return {
        tokens, errors, user,
        login, register, logout, getUser, isValid, errorFeedback, resetErrors, isAuth,
    }
})

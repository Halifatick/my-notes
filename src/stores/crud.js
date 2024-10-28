import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/common/api/api.js'

export const useCrudStore = defineStore('crud', () => {
    const initialErrors = () => {
        return {
            status: null,
            messages: {
                title: [],
                content: [],
                global: [],
            }
        }
    }

    const errors = reactive(initialErrors())
    const data = ref([])
    const isLoading = ref(false)
    const router = useRouter()

    const resetErrors = () => {
        Object.assign(errors, initialErrors())
    }

    const setDefaultStore = () => {
        resetErrors()
        data.value = []
        isLoading.value = false
    }

    const getData = async (path = null) => {
        isLoading.value = true
        return await api.get(path === null ? router.currentRoute.value.fullPath : path).then( (response) => {
            data.value = response.data
            isLoading.value = false
            return Promise.resolve()
        }).catch((err) => {
            isLoading.value = false
            return Promise.reject(err)
        })
    }

    const save = async (path = null, data = {}) => {
        errors.value = []
        return await api.post(path === null ? router.currentRoute.value.fullPath : path, { ...data }).then(async (response) => {
            resetErrors()
            return Promise.resolve(response)
        }).catch((err) => {
            if ([400].includes(err.response.status)) {
                handleErrors(err.response.data)
            }
            return Promise.reject(err)
        })
    }

    const destroy = async (path = null, fetchData = true) => {
        return await api.delete(path === null ? router.currentRoute.value.fullPath : path)
            .then((response) => {
                if (fetchData)
                    getData()
                else
                    return Promise.resolve(response)
            }).catch((err) => {
                if ([404].includes(err.response.status)) {
                    console.log(err.response.data)
                }
                return Promise.reject(err)
            })
    }

    const handleErrors = (errorResponse) => {
        resetErrors()

        if (errorResponse.statusCode)
            errors.status = errorResponse.statusCode

        const errorMessages = Array.isArray(errorResponse.message) ? errorResponse.message : [errorResponse.message]

        errorMessages.forEach(message => {
            if (/заголовок/i.test(message)) {
                errors.messages.title.push(message)
            } else if (/содержимое/i.test(message)) {
                errors.messages.content.push(message)
            } else {
                errors.messages.global.push(message)
            }
        })
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
        data, errors,
        setDefaultStore, getData, save, destroy, resetErrors, isValid, errorFeedback,
    }
})

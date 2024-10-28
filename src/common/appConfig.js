export const VITE_APP_ENABLE_DEBUG_UTILS = import.meta.env.VITE_APP_ENABLE_DEBUG_UTILS === "true"

export const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL && import.meta.env.VITE_APP_API_URL
    ? `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API_URL}`
    : import.meta.env.VITE_APP_BASE_URL
        ? `${import.meta.env.VITE_APP_BASE_URL}/api/v1`
        : import.meta.env.VITE_APP_API_URL
            ? import.meta.env.VITE_APP_API_URL
            : "/api/v1";
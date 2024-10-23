export const LoggerPlugin = {
    install(app) {
        app.config.globalProperties.$console = console
    }
}

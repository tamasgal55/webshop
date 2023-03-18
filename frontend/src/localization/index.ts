import { createI18n } from 'vue-i18n'
import { messages } from './localization'

const i18n = createI18n({
    locale: 'hu',
    messages,
    legacy: false
})

export default i18n
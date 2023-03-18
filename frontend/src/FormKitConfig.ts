import { defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { hu,en } from '@formkit/i18n'
import { down } from '@formkit/icons'
import './style.css'
import '@formkit/themes/genesis'

const isVowel = (x: string) => !!x.match(/[aAáÁeEéÉiIíÍoOóÓöÖőŐuUúÚüÜűŰ]/i)

const FormKitConfig = defaultConfig({
    theme: 'genesis',
    locales: {en, hu},
    locale: 'hu',
    config: {
        classes: generateClasses({
            global: {
                wrapper: '$reset',
                outer: '',
                label: 'text-light-text-muted dark:text-dark-text-muted',
                inner: '$reset relative items-center flex flex-1 rounded border-slate-300 border-2 focus-within:border-red-original focus-within:border-opacity-50',
                input: '!w-full !h-full dark:text-white', 
                help: '',
                message: '!text-red-original dark:red-original'
            },
            email: {
                wrapper: '',
                outer: '',
                label: '',
                inner: '',
                input: '', 
                help: ''
            },
            submit: {
                wrapper: '',
                outer: '!mt-5',
                label: '',
                inner: '',
                input: '$reset hover:bg-red-darker w-full rounded-md border border-transparent bg-red-original py-2 px-4 text-sm font-medium text-white focus:outline-none', 
                help: ''
            },
            select: {
                selectIcon: 'text-black-400'
            }
        })
    },
    icons: { down },
    messages: {
        hu: {
            validation:{
                email: 'Kérjük, hogy érvényes e-mail címet adjon meg!',
                required({ name }) {
                    let article = 'A'
                    if(isVowel(name.charAt(0)))
                    {
                        article = 'Az'
                    }
                    return `${article} ${name} mező kitöltése kötelező!`
                }
            }
        }
    }
})

export default FormKitConfig
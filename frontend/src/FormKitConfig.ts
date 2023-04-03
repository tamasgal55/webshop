import { defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { hu,en } from '@formkit/i18n'
import { down } from '@formkit/icons'
import './style.css'
import '@formkit/themes/genesis'
import { createMultiStepPlugin } from '@formkit/addons'
import '@formkit/addons/css/multistep'

const isVowel = (x: string) => !!x.match(/[aAáÁeEéÉiIíÍoOóÓöÖőŐuUúÚüÜűŰ]/i)

const FormKitConfig = defaultConfig({
    theme: 'genesis',
    locales: {en, hu},
    locale: 'hu',
    config: {
        classes: generateClasses({
            /*global: {
                wrapper: '$reset',
                outer: '',
                label: 'text-light-text dark:text-dark-text',
                inner: '$reset relative items-center flex flex-1 rounded border border-light-border dark:border-dark-border focus-within:border-light-text dark:focus-within:border-dark-text',
                input: '!w-full !h-full dark:text-white',
                help: 'text-light-text dark:text-dark-text',
                messages: '!bg-error !bg-opacity-[.15] !mt-1',
                message: '!text-error !pl-2',
                prefixIcon: '$reset w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-light-border dark:border-dark-border bg-light-bg-2 dark:bg-dark-bg-2 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto'
            },*/
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
                outer: '',
                label: '',
                inner: '',
                input: '$reset w-full rounded-md border border-transparent bg-button hover:bg-button-hover py-2 px-4 text-sm font-medium text-white focus:outline-none', 
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
    },
    plugins: [createMultiStepPlugin()]
})

export default FormKitConfig
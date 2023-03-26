import mitt from 'mitt'
import { ChangeLanguageEvent } from '../types/ChangeLanguageEvent'

const emitter = mitt<ChangeLanguageEvent>();

export default emitter
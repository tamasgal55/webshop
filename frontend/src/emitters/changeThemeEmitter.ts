import mitt from 'mitt'
import { ChangeThemeEvent } from '../types/ChangeThemeEvent'

const emitter = mitt<ChangeThemeEvent>();

export default emitter
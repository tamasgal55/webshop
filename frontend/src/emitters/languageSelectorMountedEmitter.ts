import mitt from 'mitt'
import { LanguageSelectorMountedEvent } from '../types/LanguageSelectorMountedEvent'

const emitter = mitt<LanguageSelectorMountedEvent>();

export default emitter
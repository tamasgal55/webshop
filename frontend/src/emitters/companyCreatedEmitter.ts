import mitt from 'mitt'
import { CompanyCreatedEvent } from '../types/CompanyCreatedEvent'

const emitter = mitt<CompanyCreatedEvent>();

export default emitter
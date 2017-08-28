import { combineReducers } from 'redux'
import user from './user'
import stepper from './stepper'
import cart from './cart'

export default combineReducers({
  user,
  stepper,
  cart
})

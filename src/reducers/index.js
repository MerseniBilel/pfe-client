import  { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import adminHomePage from './adminHomePage'

export default combineReducers({
    alert,
    auth,
    adminHomePage

})
import  { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import adminHomePage from './adminHomePage'
import AddUser from './addUser';
import dashboardAlert from './dashboardAlert';
import project from './project'

export default combineReducers({
    alert,
    auth,
    adminHomePage,
    AddUser,
    dashboardAlert,
    project
})
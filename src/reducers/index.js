import  { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import adminHomePage from './adminHomePage'
import AddUser from './addUser';
import dashboardAlert from './dashboardAlert';
import project from './project'
import currentProject from './currentProject'
import tasks from './tasks'
import events from './events'
import productivity from './productivity';
import charts from './charts';

export default combineReducers({
    alert,
    auth,
    adminHomePage,
    AddUser,
    dashboardAlert,
    project,
    currentProject,
    tasks,
    events,
    productivity,
    charts
})
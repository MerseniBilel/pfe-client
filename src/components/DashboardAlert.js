import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {InfoIcon} from '../icons/index';


const DashboardAlert = ({dbAlert}) => 
    dbAlert !== null && 
    dbAlert.length > 0 &&
    dbAlert.map(alert => (
        <div
        key={alert.id}
        className={`flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-${alert.alertType}-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple`}
      >
        <div className="flex items-center">
            <InfoIcon className="h-5 w-5 mr-2" />
            <span>{alert.msg}</span>
        </div>
      </div>
    ));



DashboardAlert.propTypes = {
    dbAlert: PropTypes.array,
}

const mapStateToProps = state => ({
    dbAlert : state.dashboardAlert
})

export default connect(mapStateToProps)(DashboardAlert)


/*



*/
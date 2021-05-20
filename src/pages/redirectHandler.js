import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const redirectHandler = (props) => {
    if(!props.isLoading){
        switch(props.userRole.role){
            case 1:
                return <Redirect to="/app/projects" />;
            case 2:
                return <Redirect to="/app/projects" />;
            default:
                return <Redirect to="/app/dashboard" />;
        }
    }
}

const mapStateToProps = state => ({
    userRole:state.auth.user,
    isLoading : state.auth.loading
}) 
export default connect(mapStateToProps)(redirectHandler)

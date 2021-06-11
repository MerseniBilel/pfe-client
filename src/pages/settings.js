import React,{useState} from 'react'
import UserProfile from '../components/UserProfile';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'




const Settings = ({isLoading , LogedInUser }) => {
    return (
        <> {!isLoading ? <UserProfile userData={LogedInUser} /> : <div>loading</div> }</>
    )
}

Settings.propTypes = {
    isLoading : PropTypes.bool.isRequired,
    LogedInUser : PropTypes.object,
}


const mapStateToProps = state => ({
    LogedInUser : state.auth.user,
    isLoading : state.auth.loading
});


export default connect(mapStateToProps,{})(Settings)

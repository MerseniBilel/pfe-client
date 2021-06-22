import React, { useEffect } from 'react'

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadAdminData} from '../actions/adminHomePage';




import AdminDashboard from '../components/AdminDashboard';


function Dashboard({loadAdminData, homePageData,isLoading,logedinUser,userloaded }) {
  


  useEffect(() => {
    loadAdminData();
  }, [])
  
  
  return (    
    <>
     { isLoading ? <div>LOADING .... </div> : <AdminDashboard HomeData={homePageData} /> }
    </>
            
  )
}

Dashboard.propTypes = {
  loadAdminData:PropTypes.func.isRequired,
  homePageData:PropTypes.object,
  isLoading:PropTypes.bool.isRequired,
  logedinUser : PropTypes.object.isRequired,
  userloaded : PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
  isLoading : state.adminHomePage.loading,
  homePageData : state.adminHomePage.data,
  logedinUser : state.auth.user,
  userloaded : state.auth.loading
})

export default connect(mapStateToProps,{loadAdminData})(Dashboard)

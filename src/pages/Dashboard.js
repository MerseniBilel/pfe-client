import React, { useEffect } from 'react'

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadAdminData,loadChartData} from '../actions/adminHomePage';




import AdminDashboard from '../components/AdminDashboard';


function Dashboard({loadAdminData,loadChartData, homePageData,isLoading,chartsData }) {
  


  useEffect(() => {
    loadChartData();
    loadAdminData();
  }, [])
  
  
  return (    
    <>
     { isLoading ? <div>LOADING .... </div> : <AdminDashboard  chartsData={chartsData} HomeData={homePageData} /> }
    </>
            
  )
}

Dashboard.propTypes = {
  loadAdminData:PropTypes.func.isRequired,
  homePageData:PropTypes.object,
  isLoading:PropTypes.bool.isRequired,
  logedinUser : PropTypes.object.isRequired,
  userloaded : PropTypes.bool.isRequired,
  loadChartData : PropTypes.func.isRequired,
  chartsData : PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
  isLoading : state.adminHomePage.loading,
  homePageData : state.adminHomePage.data,
  logedinUser : state.auth.user,
  userloaded : state.auth.loading,
  chartsData : state.charts.productivity,

})

export default connect(mapStateToProps,{loadAdminData, loadChartData})(Dashboard)

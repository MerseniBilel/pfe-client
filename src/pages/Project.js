import React,{useEffect} from 'react'

// redux stuff
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {LoadProjects} from '../actions/project';
import AdminProjects from '../components/AdminProjects';

function Cards({LoadProjects, projectsData,isLoading}) {
  useEffect(() => {
    LoadProjects();
  }, [])


  return (
    <>
     {isLoading ? <div>Loading ... </div> : <AdminProjects projectsData={projectsData}  />  }
    </>  
  )
}

Cards.propTypes = {
  LoadProjects:PropTypes.func.isRequired,
  projectsData : PropTypes.object,
  isLoading:PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isLoading : state.project.loading,
  projectsData : state.project.data,
})

export default connect(mapStateToProps,{LoadProjects})(Cards)
/*

const mapStateToProps = state => ({
  isLoading : state.adminHomePage.loading,
  homePageData : state.adminHomePage.data
})
*/
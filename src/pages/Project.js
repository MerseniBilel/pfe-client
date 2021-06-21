import React,{useEffect} from 'react'

// redux stuff
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {LoadProjects} from '../actions/project';
import  { LoadAllUsers } from '../actions/addUser';
import AdminProjects from '../components/AdminProjects';

function Projects({LoadProjects,LoadAllUsers,allUsers, projectsData,isLoading,logedInUser }) {
  useEffect(() => {
    LoadProjects();
    LoadAllUsers();
  }, [])


  return (
    <>
     {isLoading ? <div>Loading ... </div> : <AdminProjects usersData={allUsers} projectsData={projectsData} logedinuser={logedInUser}  />  }
    </>  
  )
}

Projects.propTypes = {
  LoadProjects:PropTypes.func.isRequired,
  LoadAllUsers : PropTypes.func.isRequired,
  projectsData : PropTypes.object,
  isLoading:PropTypes.bool.isRequired,
  logedInUser:PropTypes.object,
  allUsers:PropTypes.array,
  
}

const mapStateToProps = state => ({
  isLoading : state.project.loading,
  projectsData : state.project.data,
  allUsers : state.AddUser.user,
  logedInUser : state.auth.user

  
})

export default connect(mapStateToProps,{LoadProjects,LoadAllUsers})(Projects)
/*

const mapStateToProps = state => ({
  isLoading : state.adminHomePage.loading,
  homePageData : state.adminHomePage.data
  
})
*/
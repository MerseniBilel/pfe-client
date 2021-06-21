import React,{useEffect} from 'react'

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  { LoadAllUsers } from '../actions/addUser';

import AdminUsers from '../components/AdminUsers';

function Users({ LoadAllUsers,isLoading,allUsers,logedinuser }) {

  useEffect(() => {
    LoadAllUsers();
  }, [])




  return (
    <>
      { isLoading ? <div>Looooaading .... </div> : <AdminUsers logedinuser={logedinuser} UserList={allUsers} /> }
    </>
  )
}

Users.propTypes = {
  LoadAllUsers:PropTypes.func.isRequired,
  allUsers:PropTypes.array,
  isLoading:PropTypes.bool.isRequired,
  logedinuser : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  allUsers : state.AddUser.user,
  isLoading: state.AddUser.loading,
  logedinuser : state.auth.user
});

export default connect(mapStateToProps,{LoadAllUsers})(Users)

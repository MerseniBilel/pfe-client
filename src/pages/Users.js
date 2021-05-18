import React,{useEffect} from 'react'

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  { LoadAllUsers } from '../actions/addUser';

import AdminUsers from '../components/AdminUsers';

function Users({ LoadAllUsers,isLoading,allUsers }) {

  useEffect(() => {
    LoadAllUsers();
  }, [])




  return (
    <>
      { isLoading ? <div>Looooaading .... </div> : <AdminUsers UserList={allUsers} /> }
    </>
  )
}

Users.propTypes = {
  LoadAllUsers:PropTypes.func.isRequired,
  allUsers:PropTypes.array,
  isLoading:PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  allUsers : state.AddUser.user,
  isLoading: state.AddUser.loading
});

export default connect(mapStateToProps,{LoadAllUsers})(Users)

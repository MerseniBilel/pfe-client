import React from 'react'
import Sidebar from './SideBar'

import {connect} from 'react-redux';



function SidebarContent(props) {

  return(
      <>
      {!props.isLoading ? <Sidebar userRole={props.userRole.role} /> : <div>loding</div> }
      </>
  
    )
  
}

const mapStateToProps = state => ({
  userRole:state.auth.user,
  isLoading : state.auth.loading
})

export default connect(mapStateToProps)(SidebarContent)

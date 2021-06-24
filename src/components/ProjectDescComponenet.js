import React,{useEffect} from 'react'
import DragDropComponents from './DragDropComponents'
import TodoComponent from './TodoComponent';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {  getTasksByID } from '../actions/tasks';
import { getTeamMemberProductivity} from '../actions/productivity';

const ProjectDescComponenet = ({myproject, currentuser ,getTasksByID,mytasks,isLoading,getTeamMemberProductivity}) => {

  useEffect(() => {
    getTasksByID(myproject._id)
    getTeamMemberProductivity(currentuser._id)
  }, [])

  if(currentuser.role == 2){
    return (
      <> 
        <TodoComponent currentuser={currentuser} myproject={myproject}/>
      </>
  )
  }else{
    return ( 
      <>
        { isLoading ? <div>.... loading </div> : <DragDropComponents data={mytasks} myproject={myproject}/>}
      </>
      )
  }

  
}

ProjectDescComponenet.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  mytasks : PropTypes.array.isRequired,
  getTasksByID : PropTypes.func.isRequired,
  getTeamMemberProductivity : PropTypes.func.isRequired,
  
}

const mapStateToProps = state => ({
  mytasks : state.tasks.tasks,
  isLoading : state.tasks.loading,
})


export default connect(mapStateToProps,{getTasksByID,getTeamMemberProductivity})(ProjectDescComponenet)

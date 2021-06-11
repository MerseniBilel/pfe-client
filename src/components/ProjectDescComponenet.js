import React,{useEffect} from 'react'
import DragDropComponents from './DragDropComponents'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {  getTasksByID } from '../actions/tasks';

const ProjectDescComponenet = ({myproject,getTasksByID,mytasks,isLoading}) => {

  useEffect(() => {
    getTasksByID(myproject._id)
  }, [])

  return (
        <> 
          { isLoading ? <div>.... loading </div> : <DragDropComponents data={mytasks} myproject={myproject}/>}
        </>
    )
}

ProjectDescComponenet.propTypes = {
  isLoading : PropTypes.bool.isRequired,
  mytasks : PropTypes.array.isRequired,
  getTasksByID : PropTypes.func.isRequired,
  
}

const mapStateToProps = state => ({
  mytasks : state.tasks.tasks,
  isLoading : state.tasks.loading,
})


export default connect(mapStateToProps,{getTasksByID})(ProjectDescComponenet)

import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import {
    useParams
  } from "react-router-dom";
import ProjectDescComponenet from '../components/ProjectDescComponenet';

import {  getProjectById } from '../actions/project';

import PropTypes from 'prop-types';

const ProjDesc = ({isLoading, myproject,getProjectById}) => {
    let  { id } = useParams();
    useEffect(() => {
        getProjectById(id);
    }, [])

    return (
        <>
        {isLoading ? <div> loading </div> : <ProjectDescComponenet myproject={myproject} /> }
        </>
    )

}

ProjDesc.propTypes = {
    isLoading : PropTypes.bool.isRequired,
    myproject : PropTypes.object,
    getProjectById : PropTypes.func.isRequired,
    
}

const mapStateToProps = state => ({
    myproject : state.currentProject.data,
    isLoading : state.currentProject.loading,
})

export default connect(mapStateToProps,{getProjectById})(ProjDesc)


// getOneProject Reducer
/*
    initialState = [
        project : null
        loading :true
        error : null
    ]
*/
// get One Project Action

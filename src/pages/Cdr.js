import React,{useEffect} from 'react'
import FullcalanderComponent from '../components/FullcalanderComponent';

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadevent} from '../actions/events'

const Cdr = ({logedinuser,isLoadingEvents ,loadevent,eventtable}) => {
    
    useEffect(() => {
        const userid = logedinuser._id;
        loadevent(userid);
    }, [])



    return (
      <>
      {isLoadingEvents ? <div>Loading .... </div> : < FullcalanderComponent events={eventtable} />}
      </>
    )
}

Cdr.propTypes  = {
    logedinuser : PropTypes.object.isRequired,
    loadevent : PropTypes.func.isRequired,
    isLoadingEvents :PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    logedinuser : state.auth.user,
    isLoadingEvents : state.events.loading,
    eventtable : state.events.events
})

export default connect(mapStateToProps,{loadevent})(Cdr)

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HelperText } from '@windmill/react-ui'

const AlertComponent = ({ alerts }) => 
    alerts !== null && 
    alerts.length > 0 &&
    alerts.map(alert => (
    <HelperText key={alert.id} valid={false}>{alert.msg}</HelperText>
));

alert.propTypes = {
    alerts : PropTypes.array.isRequired,
}

const mapStateToProps = state =>({
    alerts : state.alert
})

export default connect(mapStateToProps)(AlertComponent)

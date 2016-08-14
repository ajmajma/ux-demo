import immutable from 'immutable';
import { connect } from 'react-redux';
import Component from './component';
import * as actionCreators from './action-creators';

function mapStateToProps(state) {
    const normalizedState = state.get('main', immutable.Map()).toJS();

    return {
    	form: normalizedState.form
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeLabelValue: actionCreators.changeLabelValue.bind(null, dispatch),
        changeOrderValue: actionCreators.changeOrderValue.bind(null, dispatch),
        processFormError: actionCreators.processFormError.bind(null, dispatch),
        changeChoicesValue: actionCreators.changeChoicesValue.bind(null, dispatch),
        changeDefaultValue: actionCreators.changeDefaultValue.bind(null, dispatch),
        processFormData: actionCreators.processFormData.bind(null, dispatch)
    };
}


export default function(component = Component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

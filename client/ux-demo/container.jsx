import immutable from 'immutable';
import { connect } from 'react-redux';
import Component from './component';
import * as actionCreators from './action-creators';

function mapStateToProps(state) {
    const normalizedState = state.get('main', immutable.Map()).toJS();

    return {
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
    };
}


export default function(component = Component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

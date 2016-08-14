import * as actions from './actions';

function genericActionCreator(type, data) {
    return {
        type,
        data
    };
}

export function changeLabelValue(dispatch, value) {
	dispatch(genericActionCreator(actions.FORM_CHANGE_LABEL, value));
}

export function changeOrderValue(dispatch, value) {
	dispatch(genericActionCreator(actions.FORM_CHANGE_ORDER, value));
}

export function processFormError(dispatch, error){
	dispatch(genericActionCreator(actions.FORM_SET_INVALID, error));
}

export function processFormData(dispatch, form) {

}

export function changeChoicesValue(dispatch, text){
	dispatch(genericActionCreator(actions.FORM_SET_CHOICES, text));
}

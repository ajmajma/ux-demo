import * as actions from './actions';
import * as status from './status';
import * as services from './services';

function genericActionCreator(type, data, status) {
    return {
        type,
        data,
        status
    };
}

export function globalError(error) {
    return {
        error,
        type: actions.GLOBAL_ERROR
    };
}

export function changeLabelValue(dispatch, value) {
	dispatch(genericActionCreator(actions.FORM_CHANGE_LABEL, value));
}

export function changeOrderValue(dispatch, value) {
	dispatch(genericActionCreator(actions.FORM_CHANGE_ORDER, value));
}

export function processFormError(dispatch, errors){
	dispatch(genericActionCreator(actions.FORM_SET_INVALID, errors));
}

export function changeDefaultValue(dispatch, value) {
    dispatch(genericActionCreator(actions.FORM_CHANGE_DEFAULT, value));
}

export function processFormData(dispatch, formData) {
    const postUrl = "http://www.mocky.io/v2/566061f21200008e3aabd919";

    dispatch(genericActionCreator(actions.FORM_POST, {}, status.PENDING));

    return services.postForm(postUrl, formData)
        .then((data) => {
            dispatch(genericActionCreator(actions.FORM_POST, formData, status.SUCCESS));
        }, (reject) => {
            dispatch(genericActionCreator(actions.FORM_POST, formData, status.FAILURE));
        }).catch(globalError);
}

export function changeChoicesValue(dispatch, text){
	dispatch(genericActionCreator(actions.FORM_SET_CHOICES, text));
}

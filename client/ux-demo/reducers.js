import immutable from 'immutable';
import * as actions from './actions';
import * as status from './status';

const defaultState = immutable.fromJS({
    form: {
        label: "Sales Region",
        default: "Asia",
        choices: [
            "Asia",
            "Australia",
            "Western Europe",
            "North America",
            "Eastern Europe",
            "Latin America",
            "Middle East and Africa"
        ],
        displayAlpha: true
    }
});

export default function(state = defaultState, action) {
 if (action && action.type) {
        switch (action.type) {

        	case actions.FORM_CHANGE_LABEL:
        		return state.update('form', immutable.Map(),
        			(oldForm) => oldForm.set('label', action.data)
        		);

        	case actions.FORM_CHANGE_ORDER:
        		return state.update('form', immutable.Map(),
        			(oldForm) => oldForm.set('displayAlpha', (action.data === 'true'))
        		);

            case actions.FORM_SET_CHOICES:
                return state.update('form', immutable.Map(),
                    (oldSettings) => oldSettings.set('choices', action.data)
                );

            case actions.FORM_SET_INVALID:
                return state.update('form', immutable.Map(),
                    (oldSettings) => oldSettings.set('invalidForm', action.data)
                );

            case actions.FORM_CHANGE_DEFAULT:
                return state.update('form', immutable.Map(),
                    (oldSettings) => oldSettings.set('default', action.data)
                );

            case actions.FORM_POST:
                 if (action.status) {
                    switch (action.status) {
                        case status.PENDING:
                            // this is here for loading states for async such as a spinner
                            return state;

                        case status.SUCCESS:
                            console.log("Form posted succesfully: ", action.data);
                            return state.update('form', immutable.Map(),
                                (oldSettings) => oldSettings.set('choices', action.data.choices)
                            );

                        case status.FAILURE:
                            console.log("This call has failed, currently due to a CORS issue, but here is the payload: ", action.data);
                            return state.update('form', immutable.Map(),
                                (oldSettings) => oldSettings.set('choices', action.data.choices)
                            );

                        default:
                            return state;
                    }
                }
                return state;

            default:
                return state;
        }
    }

    return state;
}

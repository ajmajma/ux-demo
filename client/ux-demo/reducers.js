import immutable from 'immutable';
import * as actions from './actions';

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
        order: "alphabetical"
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
        			(oldForm) => oldForm.set('order', action.data)
        		);

            case actions.FORM_SET_INVALID:
                return state.update('form', immutable.Map(),
                    (oldSettings) => oldSettings.set('invalidForm', action.data)
                );

            case actions.FORM_SET_CHOICES:
                return state.update('form', immutable.Map(),
                    (oldSettings) => oldSettings.set('choices', action.data)
                );

            default:
                return state;
        }
    }

    return state;
}

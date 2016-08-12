import immutable from 'immutable';
import * as actions from './actions';

export default function(state = immutable.Map(), action) {
 if (action && action.type) {
        switch (action.type) {

            default:
                return state;
        }
    }

    return state;
}

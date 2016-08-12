import _ from 'lodash';
import * as validations from './validations';


function dueDateValidator(form, value, name, errorMessage) {
    if (value <= form.availableDate) {
        return {
            [name]: errorMessage || "Invalid value"
        };
    }
    return {};
}

const VALIDATORS = {
    title: {
        isRequired: true,
        maxLength: validations.TITLE_MAX_LENGTH

    },
    description: {
        maxLength: validations.DESCRIPTION_MAX_LENGTH

    },
    dueDate: {
        customValidator: dueDateValidator,
        errorMessage: "Due date must be after available date"
    }
};

function genericValidate(form, memo, value, name) {
    const validator = VALIDATORS[name];

    if (validator) {
        if (validator.isRequired && !value.value.length) {
            return {
                ...memo,
                [name]: "This field is required"
            };
        } else if (validator.maxLength && value.value.length > validator.maxLength) {
            return {
                ...memo,
                [name]: `This field has a maximum of ${validator.maxLength} character`
            };
        } else if (validator.customValidator) {
            return {
                ...memo,
                ...validator.customValidator(form, value, name, validator.errorMessage)
            };
        }
    }
    return memo;
}

export function validateForm(form) {
    return _.reduce(form, genericValidate.bind(null, form), {});
}

function reduceAndCleanForm(memo, value, key) {
    if (typeof value.value === 'string') {
        const newValue = _.trim(value.value);

        memo[key] = { ...value, value: newValue };
    } else {
        memo[key] = value;
    }
    return memo;
}

export function cleanForm(form) {
    return _.reduce(form, reduceAndCleanForm, {});
}
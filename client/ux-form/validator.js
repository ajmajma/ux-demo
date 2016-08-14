import _ from 'lodash';
import * as validations from './validations';

const VALIDATORS = {
    label: {
        isRequired: true

    },
    choices: {
        maxLength: validations.CHOICES_MAX_LENGTH,
    }
};

function genericValidate(form, memo, value, name) {
    const validator = VALIDATORS[name];

    if (validator) {
        if (validator.isRequired && !value.length) {
            return {
                ...memo,
                [name]: "This field is required"
            };
        } else if (validator.maxLength && value.length > validator.maxLength) {
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

function trimChoiceValues(memo, value, key) {
    const trimValue = _.trim(value);

    return [
        ...memo,
        trimValue
    ];
}

function reduceAndCleanForm(memo, value, key) {
    if (typeof value === 'string') {
        const newValue = _.trim(value);

        memo[key] = newValue;
    } else if (value instanceof Array) {
        const trimmedArray = _.reduce(value, trimChoiceValues, []);

        memo[key] = trimmedArray;
    } else {
        memo[key] = value;
    }
    return memo;
}

export function cleanForm(form) {
    return _.reduce(form, reduceAndCleanForm, {});
}
import React from 'react';
import { validateForm, cleanForm } from './validator';
import textArea from '../ux-text-area';
import _ from 'lodash';

export default class UxForm extends React.Component {
    constructor(props) {
        super(props);

        this.getValidationState = this.getValidationState.bind(this);
        this.showValidationBlock = this.showValidationBlock.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.changeDefault = this.changeDefault.bind(this);
    }

    getValidationState(element) {
        if (this.props.form.invalidForm && this.props.form.invalidForm[element]) {
            return 'has-error';
        }
        return null;
    }

    showValidationBlock(element) {
        if (this.props.form.invalidForm && this.props.form.invalidForm[element]) {
            return (
                <span className="help-block">{this.props.form.invalidForm[element]}</span>
            );
        }
        return null;
    }

    cancelForm(e) {
        e.preventDefault();
    }

    submitForm(e) {
        e.preventDefault();

        const cleanData = cleanForm(this.props.form);
        const formErrors = validateForm(cleanData);

        if (_.isEmpty(formErrors)) {
            if(!_.includes(cleanData.choices, cleanData.default)){
                cleanData.choices.push(cleanData.default);
            }

            this.props.processFormData(cleanData);
        } else {
            this.props.processFormError(formErrors);
        }
    }

    changeLabel(e) {
         this.props.changeLabelValue(e.target.value);
    }

    changeOrder(e) {
        this.props.changeOrderValue(e.target.value);
    }

    changeDefault(e) {
        this.props.changeDefaultValue(e.target.value);
    }

    render() {

        return (
            <div className="jumbotron">
                <form ref="innerForm" onSubmit={this.submitForm}>
                    <div className="row">
                        <div className="col-sm-12">
                            <h2> Field Builder </h2>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                <label>Label</label>
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <div className={this.getValidationState('label')}>
                                    <input
                                        className="form-control"
                                        value={this.props.form.label}
                                        onChange={this.changeLabel}
                                        type="text"

                                        />
                                    {this.showValidationBlock('label')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-3">
                                <label>Type</label>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-4">
                                <div className="checkbox">
                                    <b>Multi-selected Text</b>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-5">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" disabled checked /> A value is required
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                <label>Default Value</label>
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.props.form.default}
                                    onChange={this.changeDefault}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                <label>Choices</label>
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <div className={this.getValidationState('choices')}>
                                    <textArea.Component
                                        className="form-control"
                                        content={this.props.form.choices}
                                        onChange={this.props.changeChoicesValue}
                                        />
                                    {this.showValidationBlock('choices')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-12 col-md-3">
                                <label>Order</label>
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <select
                                    className="form-control"
                                    selected={this.props.form.displayAlpha}
                                    onChange={this.changeOrder}
                                    >
                                    <option value="true">Display choices in alphabetical order</option>
                                    <option value="false">Do Not Display choices in alphabetical order</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-offset-3 col-sm-6 col-md-offset-1 col-md-10 text-center">
                            <button type="submit" className="btn btn-success">Save Changes</button>
                            <span> or </span>
                            <button onClick={this.cancelForm} className="btn btn-default">CANCEL</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

UxForm.displayName = 'UxForm';

UxForm.propTypes = {
    changeChoicesValue: React.PropTypes.func,
    changeDefaultValue: React.PropTypes.func,
    changeLabelValue: React.PropTypes.func,
    changeOrderValue: React.PropTypes.func,
    form: React.PropTypes.object,
    processFormData: React.PropTypes.func,
    processFormError: React.PropTypes.func
};

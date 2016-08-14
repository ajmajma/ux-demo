import React from 'react';
import { validateForm, cleanForm } from './validator';
import textArea from '../ux-text-area';
import _ from 'lodash';

export default class UxForm extends React.Component {
    constructor(props) {
        super(props);

        this.cancelForm = this.cancelForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
    }

    cancelForm(e) {
        e.preventDefault();
    }

    submitForm(e) {
        e.preventDefault();

        const cleanData = cleanForm(this.props.form);
        const formErrors = validateForm(cleanData);

        if (_.isEmpty(formErrors)) {
            this.props.processFormData({
                ...cleanData
            });
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

    render() {

        return (
            <div className="jumbotron">
                <form ref="innerForm" onSubmit={this.submitForm}>
                    <div className="row">
                       <h2> Field Builder </h2>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-sm-12 col-md-3">
                                Label
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <input
                                    className="form-control"
                                    value={this.props.form.label}
                                    onChange={this.changeLabel}
                                    type="text"

                                    />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-sm-6 col-md-3">
                                Type
                            </div>
                            <div className="col-sm-6 col-md-4">
                                Multi-selected Text
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
                    <div className="row">
                        <div className="form-group">
                            <div className="col-sm-12 col-md-3">
                                Default Value
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.props.form.default}
                                    onChange={this.changeDefaultValue}
                                    />
                            </div>
                            </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-sm-12 col-md-3">
                                Choices
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <textArea.Component
                                    className="form-control"
                                    content={this.props.form.choices}
                                    onChange={this.props.changeChoicesValue}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-sm-12 col-md-3">
                                Order
                            </div>
                            <div className="col-sm-12 col-md-9">
                                <select className="form-control" onChange={this.changeOrder}>
                                    <option value="alphabetical">Display choices in alphabetical order</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-default">Save Changes</button>
                        <span> or </span>
                        <button onClick={this.cancelForm} className="btn btn-default">CANCEL</button>
                    </div>
                </form>
            </div>
        );
    }
}

UxForm.displayName = 'UxForm';

UxForm.propTypes = {
    changeChoicesValue: React.PropTypes.func,
    changeLabelValue: React.PropTypes.func,
    changeOrderValue: React.PropTypes.func,
    form: React.PropTypes.object,
    processFormData: React.PropTypes.func
};

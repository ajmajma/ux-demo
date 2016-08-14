import React from 'react';
import uxForm from '../ux-form';

export default class DemoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <uxForm.Component
                    changeChoicesValue={this.props.changeChoicesValue}
                    changeDefaultValue={this.props.changeDefaultValue}
                    changeLabelValue={this.props.changeLabelValue}
                    changeOrderValue={this.props.changeOrderValue}
                    form={this.props.form}
                    processFormData={this.props.processFormData}
                    processFormError={this.props.processFormError}
                    />
            </div>
        );
    }
}

DemoComponent.displayName = 'DemoComponent';

DemoComponent.propTypes = {
    changeChoicesValue: React.PropTypes.func,
    changeDefaultValue: React.PropTypes.func,
    changeLabelValue: React.PropTypes.func,
    changeOrderValue: React.PropTypes.func,
    form: React.PropTypes.object,
    processFormData: React.PropTypes.func,
    processFormError: React.PropTypes.func
};

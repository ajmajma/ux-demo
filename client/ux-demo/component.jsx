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
                    form={this.props.form}
                    changeChoicesValue={this.props.changeChoicesValue}
                    changeLabelValue={this.props.changeLabelValue}
                    changeOrderValue={this.props.changeOrderValue}
                    />
            </div>
        );
    }
}

DemoComponent.displayName = 'DemoComponent';

DemoComponent.propTypes = {
    form: React.PropTypes.object,
    changeChoicesValue: React.PropTypes.func,
    changeLabelValue: React.PropTypes.func,
    changeOrderValue: React.PropTypes.func
};

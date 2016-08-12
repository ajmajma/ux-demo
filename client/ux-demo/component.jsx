import React from 'react';
import uxForm from '../ux-form';

export default class DemoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <uxForm.Component />
            </div>
        );
    }
}

DemoComponent.displayName = 'DemoComponent';

DemoComponent.propTypes = {
};

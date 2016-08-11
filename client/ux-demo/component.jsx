import React from 'react';

export default class DemoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Init Scaffold
            </div>
        );
    }
}

DemoComponent.displayName = 'DemoComponent';

DemoComponent.propTypes = {
};

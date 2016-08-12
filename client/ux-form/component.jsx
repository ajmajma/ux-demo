import React from 'react';


export default class UxForm extends React.Component {
    constructor(props) {
        super(props);

        this.cancelForm = this.cancelForm.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    cancelForm(e) {
        e.preventDefault();
    }

    saveChanges(e) {
        e.preventDefault();
    }

    render() {

        return (
            <div>
                <form ref="innerForm" onSubmit={this.saveChanges}>
                    <div className="row">
                       <h3> Field Builder </h3>
                    </div>
                    <div className="row">
                    label

                    </div>
                    <div className="row">
                    type

                    </div>
                    <div className="row">
                    default Value

                    </div>
                    <div className="row">
                    choices

                    </div>
                    <div className="row">
                    order

                    </div>

                    <div>
                        <button type="submit">Save Changes</button>
                        <button onClick={this.cancelForm} >CANCEL</button>
                    </div>
                </form>
            </div>
        );
    }
}

UxForm.displayName = 'UxForm';

UxForm.propTypes = {
};

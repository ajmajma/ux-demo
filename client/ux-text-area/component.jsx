import React from 'react';

export default class EditableTextArea extends React.Component {
    constructor(props) {
        super(props);

        this.emitChange = this.emitChange.bind(this);
        this.joinValuesForTextarea = this.joinValuesForTextarea.bind(this);
    }

    emitChange(e){
        const content = e.target.value;
        const choiceValues = content.split(/\r?\n/);

        if (this.props.onChange && choiceValues !== this.lastContent) {
            this.props.onChange(choiceValues);
        }
        this.lastContent = choiceValues;
    }

    joinValuesForTextarea(){
        return this.props.content.join('\n');
    }

    render() {
        return (
            <textarea
                ref="textarea"
                className="form-control"
                onChange={this.emitChange}
                value={this.joinValuesForTextarea()}
                >
            </textarea>
        );
    }
}

EditableTextArea.displayName = 'EditableTextArea';

EditableTextArea.propTypes = {
    content: React.PropTypes.array,
    onChange: React.PropTypes.func
};

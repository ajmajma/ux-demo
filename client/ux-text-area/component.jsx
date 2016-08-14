import React from 'react';
import { fromJS } from 'immutable';
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';

function checkChoiceLength(memo, value, key) {
    if (value.length > 40) {
        const modValue = value.slice(0, 40) + "<b>" + value.slice(40) + "</b>";

        return [
            ...memo,
            modValue
        ];
    } else {
        return [
            ...memo,
            value
        ];
    }
}

function reduceBlockMaps(memo, value, key) {
    const splitValues = value.text.split(/\r?\n/);
    const filteredChoices = splitValues.reduce(checkChoiceLength, []);
    const joinedChoices = filteredChoices.join(/\r?\n/);

    memo += joinedChoices

    return memo;
}

export default class EditableTextArea extends React.Component {
    constructor(props) {
        super(props);

        this.emitChange = this.emitChange.bind(this);
        this.joinValuesForTextarea = this.joinValuesForTextarea.bind(this);
        this.joinHTMLForInit = this.joinHTMLForInit.bind(this);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.joinValuesForTextarea(this.props.content))))
        };
    }

    emitChange(editorState){
        const currentState = editorState.getCurrentContent().toJS();
        const modifiedState = _.reduce(currentState.blockMap, reduceBlockMaps, "");
        const convertToArray = modifiedState.join('<br/>');

        const newState = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.joinValuesForTextarea(convertToArray))));


        this.setState({ editorState: newState });
    }

    joinValuesForTextarea(content) {
        const filteredChoices = content.reduce(checkChoiceLength, []);
        const joinedContent = filteredChoices.join('<br/>');

        return joinedContent;
    }

    joinHTMLForInit(html) {
        const splitHTML = html.split('<br>');

        return this.joinValuesForTextarea(splitHTML);
    }


    render() {
        return (
            <Editor editorState={this.state.editorState}  onChange={this.emitChange} />
        );
    }
}

EditableTextArea.displayName = 'EditableTextArea';

EditableTextArea.propTypes = {
    content: React.PropTypes.array,
    onChange: React.PropTypes.func
};

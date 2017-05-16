import React from 'react';
import Simditor from 'simditor';
import $ from 'jquery';
import 'simditor/styles/simditor.css';
import autobind from 'autobind-decorator';

class Editor extends React.Component {
    componentDidMount () {
        this.editor = new Simditor({
            textarea: $(this.refs.textarea),
            toolbar: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontScale',
                'color',
                'ol',
                'ul',
                'blockquote',
                'code',
                'table',
                'link',
                'image',
                'hr',
                'indent',
                'outdent',
                'alignment',
            ],
        });
    }

    setValue(content) {
        return this.editor.setValue(content);
    }

    getValue() {
        return this.editor.getValue();
    }

    render () {
        return (
            <div>
                <textarea ref='textarea' placeholder="文章内容..." />
            </div>
        );
    }
}

export default autobind(Editor);

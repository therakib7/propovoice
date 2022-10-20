import React, { Component } from 'react'

import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/lists';
import 'tinymce/skins/ui/oxide/skin.min.css';
import { Editor } from '@tinymce/tinymce-react'

class BlockEditor extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			value: '',
			content: '',
		};

		this.editorRef = React.createRef();
	}

	handleEditorChange = (content, editor) => {
		this.setState({ content }, () => {
			if (this.props.index == null) {
				this.props.changeHandler(this.state.content);
			} else {
				this.props.changeHandler(this.props.index, this.state.content);
			}
		});
	}; 

	componentDidUpdate() {
		if (this.state.loaded == false && this.props.value) {
			this.setState({ loaded: true, content: this.props.value });
		}
	}

	render = () => {
		const { content } = this.state;
		return (
			<>
				<Editor
					onInit={(evt, editor) => this.editorRef.current = editor}
					// initialValue={value}
					// initialValue="<p>This is the initial content of the editor</p>"
					init={{
						skin: false,
						branding: false,
						content_css: false,
						height: 150,
						menubar: false,
						plugins: ['lists'],
						toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist',
						/* setup: function (ed) {
							ed.on('init', function () {
								this.getDoc().body.style.fontSize = '14';
								this.getDoc().body.style.fontFamily = 'Inter';
							});
						}, */
						/* setup: function (ed) {
							ed.on('init', function (e) {
								ed.execCommand("fontName", false, "Inter");
							});
						} */
					}}
					value={content}
					onEditorChange={this.handleEditorChange}
				/>
			</>
		)
	}
}

export default BlockEditor

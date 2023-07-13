import React, { useState } from "react";
import { toast } from 'react-toastify';
import "./style.css";

import Dropzone from "react-dropzone";
import Api from 'api/media';

export default function Index(props) {
	const [fileNames, setFileNames] = useState([]);
	const handleDrop = ( acceptedFiles ) => { 
		acceptedFiles.map(file => onFileUpload(file) );		
	}

	const onFileUpload = (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', 'sign');

		Api.create(formData)
			.then(resp => { 
				if (resp.data.success) {
					props.newMedia(resp.data.data); 
				} else {
					resp.data.data.forEach(function (value) {
						toast.error(value);
					});
				}
			});
	};

  return (
    <>
		<Dropzone
			onDrop={handleDrop}
			accept="image/*"
			// minSize={1024}
			// maxSize={3072000}
		>
		{({ getRootProps, getInputProps, isDragActive }) => (
			<div {...getRootProps({ className: "pv-dropzone" })}>
			<input {...getInputProps()} />
			{
				isDragActive ?
				<p>Drop the files here ...</p> :
				<p>Drag & drop some files here, or click to select files</p>
			}
			</div>
		)}
		</Dropzone> 
    </>
  );
}

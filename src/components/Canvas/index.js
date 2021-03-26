import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

import templatePath from 'assets/certificate-template.png';
import { ThreeColorsTemplatePortrait } from 'components/common/icons';

/** Ref:
 * https://stackoverflow.com/questions/23104008/where-to-change-default-pdf-page-width-and-font-size-in-jspdf-debug-js
*/

const SIZE_HEIGHT = 679;
const SIZE_WEIGHT = 480;

const InputGroup = styled.div`
	padding: 20px 0px;
`;

const ButtonGroup = styled.div`
	display: flex;
	padding: 12px 0px;
	& > *:not(:first-child) {
		margin-left: 12px;
	}
`;

const Button = styled.button`
	cursor: pointer;
`;

const CanvasWrapper = styled.div`
	width: ${SIZE_WEIGHT}px;
	height: ${SIZE_HEIGHT}px;
	position: relative;

	/* background: url(${props => props.imageUrl});
	background-size: contain;
	background-repeat: no-repeat; */
	background: pink;
`;

const StudentName = styled.div`
	position: absolute;
	top: 380px;
	width: 100%;
	display: flex;
	justify-content: center;
	font-size: 32px;
	font-weight: 700;
	cursor: grab;
	cursor: -moz-grab;
	cursor: -webkit-grab;
`;

const CourseName = styled.div`
	position: absolute;
	top: 430px;
	width: 100%;
	display: flex;
	justify-content: center;
	font-size: 16px;
	color: #4B7F83;

	cursor: grab;
	cursor: -moz-grab;
	cursor: -webkit-grab;
`;

const Canvas = () => {
	const [studentName, setStudentName] = useState('金城武');
	const [courseName, setCourseName] = useState('我要成為開課王');
	const [backgroundUrl, setBackgroundUrl] = useState();

	const handleDownloadAsPng = () => {
		html2canvas(document.querySelector("#capture")).then(canvas => {
			var link = document.createElement('a');
			link.download = 'filename.png';
			console.log('canvas: ', canvas);
			console.log('link: ', link);
			link.href = canvas.toDataURL();
			link.click();
		});
	};

	const handleDownloadAsPdf = () => {
		console.log('download as pdf')
		var doc = new jsPDF('p', 'mm', [SIZE_HEIGHT, SIZE_WEIGHT]); // p => portrait, l => landscape
		html2canvas(document.querySelector("#capture")).then(canvas => {
			doc.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, canvas.width, canvas.height);
			doc.save('sample-file.pdf');
		});
	};

	const handleChangeStudentName = (event) => {
		const value = event.target.value;
		setStudentName(value);
	}

	const handleChangeCourseName = (event) => {
		const value = event.target.value;
		setCourseName(value);
	}

	const handleChangeBackgroundUrl = (event) => {
		const value = event.target.value;
		setBackgroundUrl(value);
	}

	console.log('templatePath: ', templatePath)

	return (
		<div>
			<ButtonGroup>
				<Button onClick={handleDownloadAsPng}>Download as *.png</Button>
				<Button onClick={handleDownloadAsPdf}>Download as *.pdf</Button>
			</ButtonGroup>
			<InputGroup>
				<div>
					<label htmlFor="">學生姓名：</label>
					<input type="text" value={studentName} onChange={handleChangeStudentName} />
				</div>
				<div>
					<label htmlFor="">課程名稱：</label>
					<input type="text" value={courseName} onChange={handleChangeCourseName} />
				</div>
				<div>
					<label htmlFor="">背景圖片 URL ：</label>
					<input type="text" onChange={handleChangeBackgroundUrl} />
				</div>
			</InputGroup>
			<CanvasWrapper id="capture">
				<ThreeColorsTemplatePortrait />
				<Draggable>
					<StudentName>{studentName}</StudentName>
				</Draggable>
				<Draggable>
					<CourseName>{courseName}</CourseName>
				</Draggable>
			</CanvasWrapper>
		</div>
	);
};

export default Canvas;

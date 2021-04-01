import React, { useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { ThreeColorsTemplatePortrait } from 'components/common/icons';

/** Ref:
 * https://stackoverflow.com/questions/23104008/where-to-change-default-pdf-page-width-and-font-size-in-jspdf-debug-js
*/

const SIZE_HEIGHT = 679;
const SIZE_WEIGHT = 480;

const InputGroup = styled.div`
	padding: 20px 0px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
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

const Canvas = () => {
	const [color01, setColor01] = useState('#4B7F83');
	const [color02, setColor02] = useState('#AC4E41');
	const [color03, setColor03] = useState('#C68539');
	const [htmlString, setHtmlString] = useState('');
	const [dataUrl, setDatUrl] = useState('');

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

	const handleConvertToHtml = () => {
		const html = document.getElementById('capture');
		setHtmlString(html.innerHTML);
	};

	const handleConvertToDataUrl = () => {
		html2canvas(document.querySelector("#capture")).then(canvas => {
			setDatUrl(canvas.toDataURL("image/png"));
		});
	};

	return (
		<div>
			<ButtonGroup>
				<Button onClick={handleDownloadAsPng}>Download as *.png</Button>
				<Button onClick={handleDownloadAsPdf}>Download as *.pdf</Button>
				<Button onClick={handleConvertToHtml}>Update SVG string</Button>
				<Button onClick={handleConvertToDataUrl}>Convert to data url</Button>
			</ButtonGroup>
			<InputGroup>
				<div>
					<label htmlFor="">Color01：</label>
					<input type="color" id="head" name="head" value={color01} onChange={(event) => setColor01(event.target.value)} />
				</div>
				<div>
					<label htmlFor="">Color02：</label>
					<input type="color" id="head" name="head" value={color02} onChange={(event) => setColor02(event.target.value)} />
				</div>
				<div>
					<label htmlFor="">Color03：</label>
					<input type="color" id="head" name="head" value={color03} onChange={(event) => setColor03(event.target.value)} />
				</div>
			</InputGroup>
			<textarea name="" id="" cols="30" rows="10" value={htmlString} readOnly></textarea>
			<textarea name="" id="" cols="30" rows="10" value={dataUrl} readOnly></textarea>
			<div id="capture">
				<ThreeColorsTemplatePortrait
					color01={color01}
					color02={color02}
					color03={color03}
				/>
			</div>
		</div>
	);
};

export default Canvas;

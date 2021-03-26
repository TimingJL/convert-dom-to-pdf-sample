import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

const Button = styled.button`
	margin: 8px 0px;
	cursor: pointer;
`;

const CanvasWrapper = styled.div`
	width: 595px;
	height: 842px;
`;

const Canvas = () => {
	const handleClickDownload = () => {
		console.log('download');
		html2canvas(document.querySelector("#capture")).then(canvas => {
			var link = document.createElement('a');
			link.download = 'filename.png';
			link.href = canvas.toDataURL();
			link.click();
		});
	};

	return (
		<div>
			<Button onClick={handleClickDownload}>Click to download</Button>
			<CanvasWrapper id="capture" style={{ padding: '10px', background: '#f5da55' }}>
				<h4 style={{ color: '#000' }}>Hello world!</h4>
			</CanvasWrapper>
		</div>
	);
};

export default Canvas;

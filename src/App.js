import styled from 'styled-components';
import Canvas from 'components/Canvas';

const AppWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
`;

const App = () => {
	return (
		<AppWrapper>
			<Canvas />
		</AppWrapper>
	);
};

export default App;
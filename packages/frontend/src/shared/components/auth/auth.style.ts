import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const starBlock = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 90px;
    max-width: 600px;
	margin: 0 auto;
    gap: 35px;
    position: relative;
`;

export const secondTitle = css`
	font-size: 38px;
`;

export const startBtnBlock = css`
	display: flex;
	gap: 35px;
	justify-content: center;
`;

export const authBtn = css`
	width: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${colors.blue};
	border: none;
	border-radius: 5px;
	color: ${colors.white};
	height: 40px;
	border: 1px solid ${colors.blue};

	@media screen and (max-width: 400px) {
		width: 120px;
	}

	&:hover {
		border: 1px solid ${colors.blue};
		background-color: ${colors.white};
		cursor: pointer;
		color: ${colors.blue};
	}
`;


export const authExit = css`
    font-size: 24px;
	position: absolute;
    cursor: pointer;
    right: 0;
    top: 50px;
`


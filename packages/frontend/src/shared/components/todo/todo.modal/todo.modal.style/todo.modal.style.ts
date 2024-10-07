import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const modalOverlayStyle = css`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(5px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
    padding: 0px 5px;
`;

export const modalContentStyle = css`
	background-color: white;
	padding: 35px 20px;
	border-radius: 8px;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	max-width: 500px;
	width: 100%;
	z-index: 1001;
	position: relative;
`;

export const modalTitle = css`
	font-size: 36px;
	text-align: center;
	margin-bottom: 15px;
`;

export const formBlock = css`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const formBlockItem = css`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const modalFormInput = css`
	border: 1px solid ${colors.darkGrey};
	border-radius: 5px;
	height: 30px;
	padding: 5px;

    &:focus{
        border: 1px solid ${colors.blue};
    }
`;

export const modalFormLabel = css`
	font-size: 18px;

	&:hover {
		cursor: pointer;
	}
`;

export const modalFormError = css`
	color: ${colors.error};
`;

export const modalExit = css`
	font-size: 24px;
	position: absolute;
	top: 5%;
	right: 5%;
    cursor: pointer;
`;

export const modalFormSubmit = css`
    background-color: ${colors.blue};
    height: 35px;
    border: none;
    border-radius: 10px;
    width: 70%;
    color: ${colors.white};
    align-self: center;

    &:hover{
        border: 2px solid ${colors.blue};
        background-color: ${colors.white};
        cursor: pointer;
        color: ${colors.blue};
    }
`;

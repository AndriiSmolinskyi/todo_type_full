import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const ContrainerStyle = css`
	padding: 50px 0px;
`;

export const ContainerBtnBlock = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ContainerCreateTodo = css`
	background-color: ${colors.blue};
	border: none;
	border-radius: 5px;
	color: ${colors.white};
	height: 30px;
    width: 150px;
    margin-top: 20px;
    margin-bottom: 20px;

	&:hover {
		border: 1px solid ${colors.blue};
		background-color: ${colors.white};
		cursor: pointer;
		color: ${colors.blue};
	}
`;

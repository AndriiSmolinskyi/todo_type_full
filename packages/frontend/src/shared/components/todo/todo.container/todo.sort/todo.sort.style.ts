import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const TodoSortBlock = css`
	display: flex;
`;

export const TodoSortBtn = css`
	height: 30px;
	padding: 0px 15px;
	border-radius: 0;
	border: 1px solid ${colors.darkGrey};
	background-color: transparent;

	&:hover {
		background-color: ${colors.blue};
		cursor: pointer;
	}
`;

export const TodoSortBtnSelected = css`
	background-color: ${colors.blue};
	color: white;
`;

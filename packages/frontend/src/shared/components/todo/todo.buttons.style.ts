import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const todoButtons = css`
	background-color: ${colors.blue};
	border: none;
	border-radius: 5px;
	color: ${colors.white};
	padding: 5px 10px;
	border: 1px solid ${colors.blue};

	&:hover {
		background-color: ${colors.white};
		cursor: pointer;
		color: ${colors.blue};
	}
`;

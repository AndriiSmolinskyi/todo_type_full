import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const todoDesktop = css`
	display: grid;
	grid-template-columns: 1fr 4fr 1.5fr;
	grid-auto-rows: 50px;
	border: 1px solid ${colors.black};

	& > *:nth-child(6n + 1),
	& > *:nth-child(6n + 2),
	& > *:nth-child(6n + 3) {
		background-color: ${colors.lightGrey};
	}

	& > * {
		padding: 10px;
		border-right: 1px solid ${colors.black};
		display: flex;
		align-items: center;
		white-space: nowrap; 
		overflow: hidden; 
		text-overflow: ellipsis;
	}

	& > *:nth-child(3n) {
		border-right: none;
	}
`;

export const todoDesktopBtns = css`
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

export const pagesBlockBtns = css`
	display: flex;
	justify-content: center;
	margin-top: 40px;
	gap: 10px;
`

export const pagesBtns = css`
	 background-color: ${colors.blue};
    border: none;
    border-radius: 5px;
    color: ${colors.white};
    padding: 5px 10px;
	border: 1px solid ${colors.blue};

    &:hover{
        background-color: ${colors.white};
        cursor: pointer;
        color: ${colors.blue};
    }
`
export const pagesGoBtns = css`
	 background-color: ${colors.blue};
    border: none;
    border-radius: 5px;
    color: ${colors.white};
    padding: 5px 10px;
	border: 1px solid ${colors.blue};

    &:hover{
        background-color: ${colors.white};
        cursor: pointer;
        color: ${colors.blue};
    }
`


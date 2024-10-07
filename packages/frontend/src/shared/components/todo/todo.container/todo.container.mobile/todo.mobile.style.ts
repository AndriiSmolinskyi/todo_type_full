import { css } from "@emotion/css";
import { colors } from "~shared/styles";

export const ContaineMobileStyles = css`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

export const ItemMobileStyles = css`
	width: 100%;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 15px;
`;

export const ItemMobileBtnBlock = css`
	display: flex;
	justify-content: space-between;
`;

export const ItemMobileBtn = css`
	display: flex;
	gap: 10px;
`;

export const ItemMobileBody = css`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	max-height: 75px;
	line-height: 1.25;
`;
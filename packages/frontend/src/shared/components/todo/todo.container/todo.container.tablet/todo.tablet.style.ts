import { colors } from '~shared/styles';
import { css } from '@emotion/css';

export const ItemTabletStyles = css`
	width: 300px;
	height: 150px;
	border: 2px solid ${colors.darkGrey};
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 15px;
`;

export const ItemTabletBtnBlock = css`
	display: flex;
	justify-content: space-between;
`;

export const ItemTabletBtn = css`
	display: flex;
	gap: 10px;
`;

export const ItemTabletBody = css`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	max-height: 75px;
	line-height: 1.25;
`;

export const swiperSlide = css`
	width: 300px;
`;

export const Swiper = css`
	padding: 20px 35px 0px 0px;
`;

const buttonBaseStyles = css`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${colors.white};
  border: none;
  cursor: pointer;
  z-index: 10;
  border: 1px solid ${colors.blue};
  border-radius: 50%;
  color: ${colors.blue};
`;

export const prevButton = css`
  ${buttonBaseStyles};
  left: 0;
`;

export const nextButton = css`
  ${buttonBaseStyles};
  right: 0;
`;
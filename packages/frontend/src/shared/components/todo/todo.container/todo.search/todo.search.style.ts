import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const searchContainer = css`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.lightGrey};
  padding: 5px 10px;
  border-radius: 20px;
  height: 30px;
  background-color: ${colors.white};
  max-width: 215px;
`;

export const searchIcon = css`
  color: ${colors.lightGrey};
  font-size: 16px;
  margin-right: 10px;
`;

export const searchInput = css`
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;

  &::placeholder {
    color: ${colors.lightGrey};
  }
`;
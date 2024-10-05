import { colors } from "~shared/styles";
import { css } from "@emotion/css";

export const todoDetails = css`
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const todoDetailsTitle = css`
    margin-bottom: 10px;
    font-size: 26px;
`

export const todoDetailsDesc = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const todoDetailsComp = css`
    display: flex;
    justify-content: space-between;
`

export const todoDetailsButtonsBlock = css`
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
`;

export const todoDetailsButtons = css`
    background-color: ${colors.blue};
    border: none;
    border-radius: 5px;
    color: ${colors.white};
    padding: 5px 30px;

    &:hover{
        border: 1px solid ${colors.blue};
        background-color: ${colors.white};
        cursor: pointer;
        color: ${colors.blue};
    }
`;

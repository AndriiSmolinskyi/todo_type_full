import { css } from "@emotion/css";
import { colors } from "~shared/styles";

export const headerCont = css`
    padding: 25px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colors.lightGrey};
`

export const headerTitle = css`
    font-size: 32px;
`

export const headerUserBtn = css`
    color: ${colors.blue};
    font-size: 28px;

    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
`


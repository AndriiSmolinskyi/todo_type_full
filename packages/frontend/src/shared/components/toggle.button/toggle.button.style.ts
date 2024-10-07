import { css } from "@emotion/css";
import { colors } from "~shared/styles";

export const switchStyles = css`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px; 

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.toggleGrey};
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 16px; 
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: ${colors.green};
  }

  input:checked + .slider:before {
    transform: translateX(20px); 
  }
`;
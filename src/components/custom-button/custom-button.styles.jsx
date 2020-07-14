import styled, { css } from "styled-components";

const ButtonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const InvertedButtonStyles = css`
  background-color: white;
  color: black;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const GoogleSigninButtonStyles = css`
  background-color: #4285f4;
  color: #fff;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const relativeStyles = css`
  width: 80%;
  top: 280px;
  position: absolute;
  opacity: 0.7;

  &:hover {
    opacity: 0.85;
  }
`;

const getRelativeStyles = (props) => {
  if (props.relative) {
    return relativeStyles;
  }
};

const getCustomButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return GoogleSigninButtonStyles;
  }

  return props.inverted ? InvertedButtonStyles : ButtonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getRelativeStyles}

  ${getCustomButtonStyles}
`;

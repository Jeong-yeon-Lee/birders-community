import React from "react";
import styled from "styled-components";

const SButton = styled.button`
  background-color: ${(props) => (props.primary ? "#006e5f" : "white")};
  color: ${(props) => (props.primary ? "white" : "#006e5f")};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "16px")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  padding: ${(props) => (props.padding ? props.padding : "0.5rem 1rem")};
  border: 1px solid #006e5f;
  border-radius: 3px;
  cursor: pointer;
  white-space: nowrap;
`;

export default function Button(props) {
  const { isPrimary, text, fontSize, margin, children, _onClick, padding } =
    props;
  Button.defaultProps = {
    _onClick: () => {},
    isPrimary: false,
  };
  const styles = {
    margin: margin,
    fontSize: fontSize,
    padding: padding,
  };
  if (isPrimary) {
    return (
      <SButton {...styles} primary onClick={_onClick}>
        {text ? text : children}
      </SButton>
    );
  } else {
    return (
      <SButton {...styles} onClick={_onClick}>
        {" "}
        {text ? text : children}
      </SButton>
    );
  }
}

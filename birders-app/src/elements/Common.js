import styled from "styled-components";
export const PageTitle = styled.h1`
  color: #757677;
`;

export const Text = (props) => {
  const { bold, color, size, children, margin } = props;

  const styles = { bold: bold, color: color, size: size, margin };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  inline: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.inline ? `display: inline` : "")}
`;

export const Content = styled.main`
  display: block;
  margin: 0 auto;
  max-width: 930px;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

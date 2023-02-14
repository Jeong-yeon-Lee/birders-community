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
  padding: 2rem 0 4rem 0;
`;

export const Tag = styled.span`
  background: #cce2df;
  padding: ${(props) =>
    props.size === "sm" ? "0.25rem 0.5rem" : "0.5rem 0.75rem"};
  border-radius: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.5rem;
  color: #006e5f;
  text-decoration: none;
  font-weight: 500;
  font-size: ${(props) => (props.size === "sm" ? "0.7rem" : "1rem")};
`;

import React from "react";
import styled from "styled-components";

const SFooter = styled.footer`
  width: 100%;
  height: 200px;
  text-align: center;
  background-color: #eaebed;
  display: flex;
  align-items: start;

  & p {
    width: 100%;
    text-align: center;
    padding-top: 3rem;
    color: gray;
  }
`;
export default function Footer() {
  return (
    <SFooter>
      <p>Birder's Community 2023</p>
    </SFooter>
  );
}

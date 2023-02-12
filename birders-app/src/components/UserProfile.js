import React, { useContext } from "react";
import styled from "styled-components";
import SampleImg from "../images/bird_sample.jpg";

const FilledBox = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 110, 95, 0.2);
  border: 1px solid #006e5f;
  border-radius: 3px;
  gap: 1rem;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Column = styled.div``;
export default function UserProfile(props) {
  return (
    <FilledBox>
      <Column>
        <Img
          src={props.userInfo.photoURL ? props.userInfo.photoURL : SampleImg}
          alt="profile"
        />
      </Column>
      <Column>
        <p>{props?.userInfo.displayName}</p> <p>{props?.userInfo.email}</p>
      </Column>
    </FilledBox>
  );
}

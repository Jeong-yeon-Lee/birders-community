import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Grid from "../elements/Grid";
import { Text } from "../elements/Common";
import SampleImg from "../images/bird_sample.jpg";
import { Link, useParams } from "react-router-dom";

const CategoryTab = (props) => {
  //console.log(props);
  const [category, setCategory] = useState("all");
  function handleChange(e) {
    //setTemperature(e.target.value);
    const tabNumber = parseInt(e.target.dataset.tab);
    props.onCategoryChange({
      tabNum: tabNumber,
      displayName: e.target.dataset.name,
    });
  }
  return (
    <>
      <TabContainer>
        <Tabs>
          <TabButton
            onClick={handleChange}
            tabNum={props.tabNum}
            data-tab="0"
            data-name="all"
          >
            전체
          </TabButton>
          <TabButton
            onClick={handleChange}
            tabNum={props.tabNum}
            data-tab="1"
            data-name="news"
          >
            새뉴스
          </TabButton>
          <TabButton
            onClick={handleChange}
            tabNum={props.tabNum}
            data-tab="2"
            data-name="question"
          >
            새문답
          </TabButton>
          <TabButton
            onClick={handleChange}
            tabNum={props.tabNum}
            data-tab="3"
            data-name="fieldNote"
          >
            탐조기록
          </TabButton>
        </Tabs>
      </TabContainer>
    </>
  );
};
const TabContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;

const Tabs = styled.div`
  max-width: 1440px;
  min-height: min-content;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const TabButton = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  height: 3rem;
  text-decoration: none;
  &:nth-child(${(props) => props.tabNum + 1}) {
    color: rgb(52, 58, 64);
    font-weight: bold;
  }
  color: rgb(134, 142, 150);
  cursor: pointer;
  padding: 0.25rem 1rem;
`;

export default CategoryTab;

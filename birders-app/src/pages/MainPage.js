import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CarouselComponent from "../components/Banner";
import { Content, PageTitle } from "../elements/Common";
import Board from "../components/Board";
export default function MainPage() {
  return (
    <>
      <CarouselComponent></CarouselComponent>
      <Content>
        <PageTitle>커뮤니티 최근 글</PageTitle>
        <Board currentCategoryName={"all"} />
      </Content>
    </>
  );
}

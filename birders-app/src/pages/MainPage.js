import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CarouselComponent from "../components/Banner";
import { Content } from "../elements/Common";
export default function MainPage() {
  return (
    <>
      <CarouselComponent></CarouselComponent>
      <Content>
        <h1>Main</h1>
      </Content>
    </>
  );
}

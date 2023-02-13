import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1Img from "../images/banner_1.jpg";
import Banner2Img from "../images/banner_2.jpg";
import Banner3Img from "../images/banner_3.jpg";
import Banner4Img from "../images/banner_4.jpg";
import styled from "styled-components";

const CarouselImg = styled.img`
  object-fit: cover;
  height: 100%;
`;
const ImgContainer = styled.div`
  height: 100%;
`;
const BannerLegend = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  font-size: ${(props) => props.fontSize};
  color: white;
  text-align: start;
`;
export default function CarouselComponent() {
  return (
    <div className="carousel-wrapper">
      <Carousel
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showThumbs={false}
        showIndicators={false}
      >
        <ImgContainer>
          <CarouselImg src={Banner4Img} alt="bird" />
          <BannerLegend top={"20%"} left={"20%"} fontSize={"60px"}>
            Birds <br />
            Every <br />
            Day
          </BannerLegend>
        </ImgContainer>
        <ImgContainer>
          <CarouselImg src={Banner1Img} alt="bird" />
          <BannerLegend top={"30%"} left={"70%"} fontSize={"50px"}>
            Birds <br />
            Every <br />
            Day
          </BannerLegend>
        </ImgContainer>
        <ImgContainer>
          <CarouselImg src={Banner2Img} alt="bird" />
          <BannerLegend top={"40%"} left={"70%"} fontSize={"30px"}>
            Birds Every Day
          </BannerLegend>
        </ImgContainer>
        <ImgContainer>
          <CarouselImg src={Banner3Img} alt="bird" />
          <BannerLegend top={"20%"} left={"20%"} fontSize={"60px"}>
            Birds <br />
            Every <br />
            Day
          </BannerLegend>
        </ImgContainer>
      </Carousel>
    </div>
  );
}

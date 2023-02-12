import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const Content = styled.main`
  display: block;
  margin: 0 auto;
  max-width: 930px;
  width: 100%;
  height: 100%;
`;

function Layout({ children }) {
  return (
    <>
      <LayoutWrapper>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export default Layout;

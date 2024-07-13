import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// //利用第三方库styled创建html元素样式
// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: yellow;
// `;

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            {/* 上面那些创建的样式的component可以在App的component里面使用，就像平常创建的component一样 */}
            <Heading as="h1">Hello,Final Project</Heading>{" "}
            {/* 在创建的html样式的jsx里面，也可以传递pro,对里面的样式进行判定 */}
            <div>
              <Heading as="h2">Check in and out </Heading>
              <Button
                variation="primary"
                size="medium"
                onClick={() => console.log("Hello")}
              >
                Check in
              </Button>
              <Button
                variation="secondary"
                size="medium"
                onClick={() => console.log("Hello")}
              >
                Check out
              </Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests"></Input>
              <Input type="number" placeholder="Number of guests"></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;

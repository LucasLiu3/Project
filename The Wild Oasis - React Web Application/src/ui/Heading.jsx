import styled, { css } from "styled-components";

//利用第三方库styled创建html元素样式
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
       {
        /* 这个CSS是为了给下面的html样式内容highlight */
      }
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
       {
        /* 这个CSS是为了给下面的html样式内容highlight */
      }
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
       {
        /* 这个CSS是为了给下面的html样式内容highlight */
      }
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
       {
        /* 这个CSS是为了给下面的html样式内容highlight */
      }
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    line-height: 1.4;
`;
export default Heading;

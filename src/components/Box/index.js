import styled from "styled-components";

const Box = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  
  /* CSS pré pronto */ 
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2e7bb4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subtitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }
  input {
    width: 100%;
    background-color: #f4f4f4;
    color: #333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #fff;
    border-radius: 10000px;
    background-color: #a1a1a1;
    /* background-color: #6f92bb; */
  }
`;

export default Box;
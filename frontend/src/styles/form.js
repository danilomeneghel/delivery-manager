import styled from "styled-components";

export const Container = styled.div`
  justify-content: center;
`;

export const Form = styled.form`
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    margin-bottom: 15px;
    padding: 10px;
    text-align: center;
  }
  input {
    height: 34px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #fc6963;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;
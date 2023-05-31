import styled from "styled-components";

export const Container = styled.div`
  justify-content: center;
`;

export const Form = styled.form`
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
    background-color: #ff6d00 !important;
    color: #fff !important;
    border: 1px solid #ff9042 !important;
    box-shadow: 1px 2px 3px 0px #ff852d !important;
    padding: 10px 16px;
    margin-right: 10px;
    border-radius: 6px;
    font-weight: 600;
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
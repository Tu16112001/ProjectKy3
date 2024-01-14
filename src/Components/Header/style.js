import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderPages = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
cursor: pointer;
`
export const LogoPage = styled.a`
margin-left: 120px;
`
export const PhonePage = styled.a`
display: flex;
align-items: center;
font-size: 15px;
margin-right: 140px;
color:#777;
cursor: pointer;
text-decoration: none;
&:hover {
    color: red;
}
`
export const NavarPage = styled.div`
height: 70px;
width: 100%;
background-color: black;
display: flex;
justify-content: space-between;
align-items: center;

`
export const ButtonPage = styled.button`
width: 30px;
  height: 30px;
  border-radius: 3px;
  border: none;
  background: rgb(53, 131, 183);
  color:white;
  margin-right: 20px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    opacity: 0.8;
}
`
export const StyledInput = styled.input`
  width: 230px;
  border: none;
  height: 30px;
  padding-left: 7px;
  outline:none;

 position: relative;
 left: 30px;
 border-radius: 3px;
`

export const ButApage = styled.button`
width: 152px;
height:30px;
border:none;
font-size:15px;
&:hover {
  background:#777;
}
`
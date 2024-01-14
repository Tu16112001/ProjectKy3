import styled from "styled-components";
import banner from "../../Image/background.webp"

export const BackgroundPage = styled.div`
background-image:url(${banner}) ;
height: 100%;
background-size: cover;
position: relative;
text-align: center;
`
export const ProductPage = styled.div`
max-width: 365px;
min-width:268px;
height: 335px;
background: white;
margin: 40px 10px 0 20px;
`
export const ButtonPage = styled.button`
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0; 
  color: white; 
  font-size: 20px;
  text-align: center;
  border: none;
border-radius: 3px;
  &:hover  {
    background: rgb(53, 131, 183);
  }
`
export const ImgProduct = styled.div`
position: relative;
  width: 268px;
  height: 270px;
  cursor: pointer;
  &:hover  {
    opacity: 0.7; 
  }
  &:hover ${ButtonPage} {
    opacity: 1; 
  }

`
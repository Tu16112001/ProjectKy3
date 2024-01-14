import { exact } from "prop-types";
import styled from "styled-components";


export const HoverText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0; 
  color: white; 
  font-size: 20px;
  text-align: center;
  z-index: -1;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 365px;
  height: 365px;
  margin: 40px 10px 0 20px;
  cursor: pointer;
  &:hover  {
    opacity: 0.8; 
    background: rgb(53, 131, 183);

  }
  &:hover ${HoverText} {
    opacity: 1; 
  }
`;

export const ImagePage = styled.img`
&:hover  {
    opacity: 0.2; 
  }
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
export const ProductPages = styled.div`
max-width: 365px;
min-width:268px;
height: 268px;
background: white;
margin: 40px 10px 0 20px;

`


export const ButtonPages = styled.button`
position: absolute;
  top: 50%;
  left: 50%;
  width:130px;
  transform: translate(-50%, -50%);
  opacity: 0; 
  color: white; 
  font-size: 18px;
  text-align: center;
  border: none;
border-radius: 3px;
  &:hover  {
    background: rgb(53, 131, 183);
  }
`
export const ImgProducts = styled.div`
position: relative;
  width: 268px;
  height: 260px;
  cursor: pointer;
  &:hover  {
    background: rgb(53, 131, 183);
    opacity: 0.7; 
  }
  &:hover ${ButtonPages} {
    opacity: 1; 
  };
`
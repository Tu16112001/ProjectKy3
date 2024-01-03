import React from "react"
import Banner1 from "../../Image/slider1.webp"
import Banner2 from "../../Image/categories_cupple.webp"
import Banner3 from "../../Image/categories_man.webp"
import Banner4 from "../../Image/categories_women.webp"
import { ImagePage, HoverText, ImageContainer, ProductPage } from "./style"
import faDiamond from '../../Image/ic.png';
import {Footer} from '../../Components/Footer/index'

const Home = () => {

  return (
    <div >
      <img src={Banner1} />



      <div style={{ display: "flex", justifyContent: "center" }}>
        <ImageContainer>
          <ImagePage src={Banner2} alt="Banner2" />
          <HoverText>Chữ hiển thị khi hover</HoverText>
        </ImageContainer>

        <ImageContainer>
          <ImagePage src={Banner4} alt="Banner4" />
          <HoverText>Chữ hiển thị khi hover</HoverText>
        </ImageContainer>

        <ImageContainer>
          <ImagePage src={Banner3} alt="Banner3" />
          <HoverText>Chữ hiển thị khi hover</HoverText>
        </ImageContainer>
      </div>



      <div class="headding-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
        <h3 class="theme-headdings" style={{ fontSize: "26px", margin: "40px 0 10px 0" }}>Xu hướng mới</h3>
        <div >
          <a>________________________________</a>
            <img src={faDiamond} width="60px" height="60px" />
            <img src={faDiamond} width="90px" height="90px" />
            <img src={faDiamond} width="60px" height="60px" />
            <a> ________________________________  </a>
        </div>
        <p>
          Những sản phẩm hot
        </p>
        <p>
          nhất mùa hè này đang chờ bạn
        </p>
      </div>


      <div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
        </div>
        <div style={{display:"flex",justifyContent:"center"}} >
        <ProductPage></ProductPage>
        <ProductPage></ProductPage>
        <ProductPage></ProductPage>
        <ProductPage></ProductPage>
        </div>


        <div>
        <div style={{width:"100%",height:"350px", background:"aqua"}}>
          
          </div>
          <div>
          
        </div>
        </div>
      </div>




      <div class="headding-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
        <h3 class="theme-headdings" style={{ fontSize: "26px", margin: "40px 0 10px 0" }}>Xu hướng mới</h3>
        <div >
          <a>________________________________</a>
            <img src={faDiamond} width="60px" height="60px" />
            <img src={faDiamond} width="90px" height="90px" />
            <img src={faDiamond} width="60px" height="60px" />
            <a> ________________________________  </a>
        </div>
        <p>
          Những sản phẩm hot
        </p>
        <p>
          nhất mùa hè này đang chờ bạn
        </p>
      </div>


      <div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
        </div>
      </div>


      <div class="headding-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
        <h3 class="theme-headdings" style={{ fontSize: "26px", margin: "40px 0 10px 0" }}>Xu hướng mới</h3>
        <div >
          <a>________________________________</a>
            <img src={faDiamond} width="60px" height="60px" />
            <img src={faDiamond} width="90px" height="90px" />
            <img src={faDiamond} width="60px" height="60px" />
            <a> ________________________________  </a>
        </div>
        <p>
          Những sản phẩm hot
        </p>
        <p>
          nhất mùa hè này đang chờ bạn
        </p>
      </div>


      <div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
          <ProductPage></ProductPage>
        </div>
      </div>



      <div class="headding-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
        <h3 class="theme-headdings" style={{ fontSize: "26px", margin: "40px 0 10px 0" }}>Xu hướng mới</h3>
        <div >
          <a>________________________________</a>
            <img src={faDiamond} width="60px" height="60px" />
            <img src={faDiamond} width="90px" height="90px" />
            <img src={faDiamond} width="60px" height="60px" />
            <a> ________________________________  </a>
        </div>
        <p>
          Những sản phẩm hot
        </p>
        <p>
          nhất mùa hè này đang chờ bạn
        </p>
      </div>


    <Footer/>
    </div>
    
  )
}

export default Home

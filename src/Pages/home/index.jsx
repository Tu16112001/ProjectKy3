import React,{useEffect,useState} from "react"
import axios from "axios"
import Banner1 from "../../Image/slider1.webp"
import Banner2 from "../../Image/categories_cupple.webp"
import Banner3 from "../../Image/categories_man.webp"
import Banner4 from "../../Image/categories_women.webp"
import A11 from "../../Image/11.webp"
import A12 from "../../Image/12.webp"
import A13 from "../../Image/13.webp"
import A18 from "../../Image/18.webp"
import A19 from "../../Image/19.webp"
import A20 from "../../Image/20.webp"
import { ImagePage, HoverText, ImageContainer, ProductPage, ImgProduct, ButtonPage, ProductPages, ImgProducts, ButtonPages} from "./style"
import faDiamond from '../../Image/ic.png';
import { Footer } from '../../Components/Footer/index'
import { Button } from "antd"
import { SearchOutlined, StarFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
const Home = () => {

  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const handProduct =()=>{
    navigate(`/ProductDetail/${products[0].id}`)
  }
  const handProduct2 =()=>{
    navigate(`/ProductDetail/${products[2].id}`)
  }
  const handProduct3 =()=>{
    navigate(`/ProductDetail/${products[3].id}`)
  }
  const handProduct4 =()=>{
    navigate(`/ProductDetail/${products1[0].id}`)
  }
  const handProduct5 =()=>{
    navigate(`/ProductDetail/${products1[1].id}`)
  }
  const handProduct6 =()=>{
    navigate(`/ProductDetail/${products1[2].id}`)
  }
  const handProduct7 =()=>{
    navigate(`/ProductDetail/${products2[0].id}`)
  }
  const handProduct8 =()=>{
    navigate(`/ProductDetail/${products3[0].id}`)
  }
  const handProduct1 =()=>{
    navigate(`/ProductDetail/${products[1].id}`)
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://103.166.182.247:3001/categories");
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await axios.get("http://103.166.182.247:3001/products?categoryId=1");
              const response1 = await axios.get("http://103.166.182.247:3001/products?categoryId=2");
              const response2 = await axios.get("http://103.166.182.247:3001/products?categoryId=3");
              const response3 = await axios.get("http://103.166.182.247:3001/products?categoryId=5");
              setProducts(response.data.data.products);
              setProducts1(response1.data.data.products);
              setProducts2(response2.data.data.products);
              setProducts3(response3.data.data.products);
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      };

      fetchProducts();
  }, []);
  const handleCategoryClick = (categoryId) => {
    navigate('/Products', { state: { categoryId } });
  };

  return (
    <div >
      <img src={Banner1} style={{ width: "100%" }} />


      
      <div style={{ display: "flex", justifyContent: "center", background: 'rgb(233, 232, 232)' }}>
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



      <div class="headding-box" style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-evenly", background: 'rgb(233, 232, 232)'
      }}>
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


      <div style={{ background: 'rgb(233, 232, 232)' }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
        {products.slice(0,1).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
                {products.slice(1,2).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct1}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
                {products.slice(2,3).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct2}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
                 {products.slice(3,4).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct3}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }} >
          
        {products1.slice(0,1).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct4}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
                {products1.slice(1,2).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct5}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
                {products1.slice(2,3).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct6}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
          
          {products2.slice(0, 1).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                                <ButtonPage onClick={handProduct7}><SearchOutlined /></ButtonPage>
                            </ImgProduct>

                            <div style={{ textAlign: "center", marginTop: "8px" }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
        </div>

        {products3.map((product, index) => (
        <div  style={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
       
          <div key={index} style={{ marginRight: "30px" }}>
            <img src={product.image} alt="" />
          </div>
            
          <div>
            <h2>{product.title}</h2>
            <p> Status: {product.quantity === 0 ? 'It`s over' : 'Still for sale'}</p>
            <p style={{ color: "blue" }}><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></p>
            <h4>Liên hệ</h4>
            <p style={{ width: "560px" }}>{product.sumary}</p>
            <Button onClick={handProduct8} style={{ background: 'rgb(53, 131, 183)', color: "white" }}>Xem Ngay</Button>
          </div>
          
        </div>
        ))}
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        {categories
          .slice(0, 1)
          .filter((category) => category.isAvailable !== false)
          .map((category, index) => (
            <ProductPages key={index}>
              <ImgProducts style={{background:"#eef1f4"}}>
                <img src={A12} alt="" style={{ width: "268px", height: "270px" }} />
                <ButtonPages onClick={() => handleCategoryClick(category.id)}>{category.name}</ButtonPages>
              </ImgProducts>
             
            </ProductPages>
          ))}
           {categories
          .slice(1, 2)
          .filter((category) => category.isAvailable !== false)
          .map((category, index) => (
            <ProductPages key={index}>
             <ImgProducts style={{background:"#eef1f4"}}>
                <img src={A11} alt="" style={{ width: "268px", height: "270px" }} />
                <ButtonPages onClick={() => handleCategoryClick(category.id)}>{category.name}</ButtonPages>
              </ImgProducts>
             
            </ProductPages>
          ))}
           {categories
          .slice(2, 3)
          .filter((category) => category.isAvailable !== false)
          .map((category, index) => (
            <ProductPages key={index}>
              <ImgProducts style={{background:"#eef1f4"}}>
                <img src={A13} alt="" style={{ width: "268px", height: "270px" }} />
                <ButtonPages onClick={() => handleCategoryClick(category.id)}>{category.name}</ButtonPages>
              </ImgProducts>
             
            </ProductPages>
          ))}
           {categories
          .slice(3, 4)
          .filter((category) => category.isAvailable !== false)
          .map((category, index) => (
            <ProductPages key={index}>
              <ImgProducts style={{background:"#eef1f4"}}>
                <img src={A13} alt="" style={{ width: "268px", height: "260px" }} />
                <ButtonPages onClick={() => handleCategoryClick(category.id)}>{category.name}</ButtonPages>
              </ImgProducts>
             
            </ProductPages>
          ))}
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
        <div style={{ display: "flex", justifyContent: "center" }}>
        {products.slice(0, 4).map((product, index) => (
                    <ProductPage key={index}>
                        <div>
                            <ImgProduct>
                                <img src={product.image} alt="" style={{ width: "268px", height: "270px" }} />
                            </ImgProduct>

                            <div style={{ textAlign: "center", padding: "5px", background: 'rgb(233, 232, 232)'  }}>
                                <h4>{product.title}</h4>
                                <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                            </div>
                        </div>
                    </ProductPage>
                ))}
          
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

      <div style={{ width: "100%", height: "450px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", float: "left", width: "400px", margin: "15px" }}><img src={A18} alt="" style={{ width: "400px" }} />
          <h4 style={{marginTop:"15px"}}>Bài viết mẫu</h4>
          <p style={{marginTop:"15px"}}>Lorem Ipsum is simply dummy text of the rinting and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever sincer they 1500s. Nullam id condimentum purus. In...</p></div>
        <div style={{ display: "flex", flexDirection: "column", float: "left", width: "400px", margin: "15px" }}><img src={A19} alt="" style={{ width: "400px" }} />
          <h4 style={{marginTop:"15px"}}>Bài viết mẫu</h4>
          <p style={{marginTop:"15px"}}>Lorem Ipsum is simply dummy text of the rinting and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever sincer they 1500s. Nullam id condimentum purus. In...</p></div>
        <div style={{ display: "flex", flexDirection: "column", float: "left", width: "400px", margin: "15px" }}><img src={A20} alt="" style={{ width: "400px" }} />
          <h4 style={{marginTop:"15px"}}>Bài viết mẫu</h4>
          <p style={{marginTop:"15px"}}>Lorem Ipsum is simply dummy text of the rinting and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever sincer they 1500s. Nullam id condimentum purus. In...</p></div>
      </div>
      <Footer />
    </div>

  )
}

export default Home

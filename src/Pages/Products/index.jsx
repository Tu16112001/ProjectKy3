import React, { useEffect, useState } from "react";
import { BackgroundPage, ProductPage, ImgProduct, ButtonPage } from "./style";
import diamond1 from "../../Image/ic.png";
import { ShiderBar } from "../../Components/ShiderBar";
import { Divider,Pagination } from "antd";
import { Footer } from "../../Components/Footer";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
export const Products = ({product}) => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const categoryId = location.state && location.state.categoryId;
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(9);

const ProductWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;

const ProductPage = styled.div`
width: calc(30% - 15px); 
margin-bottom: 30px;
`;

const handleSearch = (keyword) => {
  // Update the state or perform any other actions when a search is initiated
  setSearchKeyword(keyword);
};
useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://103.166.182.247:3001/products';
        if (categoryId) {
          url += `?categoryId=${categoryId}`;
        }
        if (searchKeyword) {
          url += `/search?keyword=${searchKeyword}`;
        }
        
        const response = await axios.get(url);
        setProducts(response.data.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      
    };
  
    fetchProducts();
  }, [categoryId, pageSize, searchKeyword]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductClick = (product) => {
   
        navigate(`/ProductDetail/${product}`);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "260px" }}>
        <BackgroundPage>
          <div style={{ background: "black", opacity: "0.7" }}>
            <h3 style={{ fontSize: "26px", color: "white", paddingTop: "100px" }}>Sign in to your account</h3>

            <div>
              ________________________________
              <img src={diamond1} width="60px" height="60px" />
              <img src={diamond1} width="90px" height="90px" />
              <img src={diamond1} width="60px" height="60px" />
              ________________________________
            </div>
            <h2 style={{ paddingBottom: "80px" }}>Always bringing you beautiful jewelry</h2>
          </div>
        </BackgroundPage>
        <ShiderBar onSearch={(keyword) => setSearchKeyword(keyword)} />
        <div style={{ position: "absolute", width: "70%", marginLeft: "30%", float: "right" }}>
          <div style={{ marginLeft: "5%", marginRight: "10%" }}>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h1>PRODUCTS</h1>
              <Divider></Divider>
            </div>
            <ProductWrapper >
              {products
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((product) => (
                <ProductPage key={product}>
                  <div>
                  <ImgProduct>
                    <img src={product.image} alt={product.title} style={{ width: "100%", height: "270px" }} />
                    <ButtonPage onClick={() => handleProductClick(product.id)}>
                      <SearchOutlined />
                    </ButtonPage>
                  </ImgProduct>

                  <div style={{ textAlign: "center",width:"268px",padding:"5px", background: 'rgb(233, 232, 232)'  }}>
                    <h4>{product.title}</h4>
                    <h5 style={{ color: "blue" }}>{`${product.price}$`}</h5>
                  </div>
                  </div>
                </ProductPage>
              ))}
            </ProductWrapper>
          </div>
          <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
              onChange={handlePageChange}
              style={{textAlign: "center", marginTop: "20px",marginLeft:"10%" }}
            />
        </div>
      </div>
      <Footer />
    </div>
  );
};

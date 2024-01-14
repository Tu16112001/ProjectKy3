import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Input, Slider, Checkbox,message } from 'antd';
import { A } from './style'
import axios from "axios";
import {SearchOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
export const ShiderBar = ({onSearch}) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(""); 
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
    const [sliderValue, setSliderValue] = useState(30); // Giá trị mặc định của Slider
    const [inputValue, setInputValue] = useState(30); // Giá trị mặc định của Input
  
    const handleSliderChange = (value) => {
      setSliderValue(value);
      setInputValue(value);
    };
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
  
      // Đảm bảo giá trị nhập vào là số và không âm
      if (!isNaN(value) && value >= 0 && value <= 100000) {
        setSliderValue(value);
      }
    };
  
    const handleFilterClick = () => {
      // Xử lý khi nhấp vào nút "PRICE FILTER"
      
      onSearch(searchKeyword);
      // Thêm xử lý lọc theo giá ở đây
    };

    const handleCategoryClick = (categoryId) => {
        navigate('/Products', { state: { categoryId } });
      };

    return (
        <div style={{ minWidth: "30%", float: "left" }}>
            <div style={{ marginLeft: "27%" }}>
                <div style={{ marginTop: "30px" }}>
                <Search
            placeholder="input search text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onSearch={() => onSearch(searchKeyword)}
            enterButton={<SearchOutlined style={{marginBottom:"10px"}} onClick={handleFilterClick}/>}
          />
                </div>
                <div style={{ marginTop: "30px" }}>
                    <h2>
                        CATEGORY</h2>
                    {categories
                        .slice(0, 4)
                        .filter((category) => category.isAvailable !== false)
                        .map((category, index) => (
                            <A onClick={() => handleCategoryClick(category.id)}
                                style={{
                                    border: "none",
                                    display: "flex",
                                    flexDirection: "column",
                                    fontSize: "14px", padding: "10px", cursor: 'pointer'
                                }}>
                                {category.name}</A>
                        ))}
                </div>

                <div style={{ marginTop: "30px" }}>
      <h2>PRICE</h2>
      <Slider
        defaultValue={sliderValue}
        value={sliderValue}
        max={100000}
        onChange={handleSliderChange}
      />
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        style={{ marginTop: "10px" }}
      />
      <br />
      <Button style={{ marginTop: "10px" }} onClick={handleFilterClick}>
        PRICE FILTER
      </Button>
    </div>
                <div style={{ marginTop: "30px" }}>
                    <h2>
                        SIZE</h2>
                    <div>
                        <div>
                            <Checkbox style={{ padding: "10px" }}>XS</Checkbox>
                            <Checkbox style={{ padding: "10px" }}>M</Checkbox>

                        </div>
                        <div>
                            <Checkbox style={{ padding: "10px" }}>S</Checkbox>
                            <Checkbox style={{ padding: "10px", marginLeft: "10px" }}>L</Checkbox>
                        </div>
                        <div>
                            <Checkbox style={{ padding: "10px" }}>XL</Checkbox>
                            <Checkbox style={{ padding: "10px", marginLeft: "3px" }}>XXL</Checkbox>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "30px" }}>
                    <h2>PRODUCTS</h2>

                    <div>
                        <div>
                            <Checkbox style={{ padding: "10px", marginRight: "15px" }}>Earring</Checkbox>
                            <Checkbox style={{ padding: "10px" }}> Ring</Checkbox>

                        </div>
                        <div>
                            <Checkbox style={{ padding: "10px" }}> Necklace</Checkbox>
                            <Checkbox style={{ padding: "10px" }}> Bracelet</Checkbox>

                        </div>

                    </div>
                </div>
                <div style={{ marginTop: "30px" }}>
                    <h2>TRADEMARK</h2>
                    <div>
                        <div>
                            <Checkbox style={{ padding: "10px" }}> DQDT</Checkbox>
                            <Checkbox style={{}}> DQDT</Checkbox>

                        </div>
                        <div>
                            <Checkbox style={{ padding: "10px" }}>TCO</Checkbox>
                            <Checkbox style={{ padding: "10px" }}>TCO</Checkbox>

                        </div>
                        <div>
                            <Checkbox style={{ padding: "10px" }}>TQT</Checkbox>
                            <Checkbox style={{ padding: "10px" }}>TQT</Checkbox>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
import Logo from '../../Image/logo.png'
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { HeaderPages, LogoPage, PhonePage, NavarPage, ButtonPage, StyledInput, ButApage } from './style.js'
import { PhoneOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { Dropdown, Space, message, Button, Modal, Input, Badge } from 'antd';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isSearchResultModalVisible, setIsSearchResultModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [cartItemsLength, setCartItemsLength] = useState(0);
  useEffect(() => {
    // Retrieve the cartItemsLength from local storage
    const storedCartItemsLength = localStorage.getItem('cartItemsLength');
    setCartItemsLength(storedCartItemsLength ? parseInt(storedCartItemsLength) : 0);
  }, []);

  useEffect(() => {
    // Check if the user is logged in based on the presence of accessToken in localStorage
    const accessToken = localStorage.getItem('accessToken');
    const storedFullName = localStorage.getItem('fullName');

    if (accessToken && storedFullName) {
      setIsLoggedIn(true);
      setFullName(storedFullName);
    } else {
      setIsLoggedIn(false);
      setFullName('');
    }
  }, []);
  const navigate = useNavigate();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const handleNavigateLogin = () => {
    navigate('/Login')
  }

  const handleNavigateLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access Token not found.');
        return;
      }

      // Make a GET request to the logout API
      const response = await axios.get(
        "http://103.166.182.247:3001/users/logout",
        {
          headers: {
            'x_authorization': accessToken,
          },
        }
      );

      console.log('Logout Response:', response.data);

      // Clear local storage items
      localStorage.removeItem('fullName');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userID');
      localStorage.removeItem('cartId');
      localStorage.removeItem('productIdForEdit');
      localStorage.removeItem('productId');
      localStorage.removeItem('cartItemsLength');
      // Navigate to the Login page
      navigate('/Login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle logout error, if necessary
    }
  };
  const handleNavigateSignup = () => {
    navigate('/Sigup')
  }
  const handleNavigateHome = () => {
    navigate('/')
  }
  const handleProductsClick = () => {
    // Chuyển hướng đến trang Products khi nhấn vào "Products"
    navigate('/Products')
  };
  const handleNavigateCart = () => {
    navigate('/Cart')
  }
  const handEdit = () => {
    navigate('/Edit')
  }
  const handmyoder = () => {
    navigate('/my-order')
  }
  const handHistory = () => {
    navigate('/history')
  }
  const handleButtonClick = () => {
    setIsSearchModalVisible(true);
  };

  const handleSearch = async (searchQuery) => {
    // Perform the search action based on the searchQuery
    try {
      const response = await axios.get(`http://103.166.182.247:3001/products/search?keyword=${searchQuery}`);
      setSearchResults(response.data.data.products);
      setIsSearchResultModalVisible(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleProductClick = (product) => {

    navigate(`/ProductDetail/${product}`);
  };

  const searchModalContent = (
    <div style={{ display: 'flex', justifyContent: "space-between" }}>
      <StyledInput
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="primary" onClick={() => handleSearch(searchQuery)}>Search</Button>
    </div>
  );
  const handContact = () => {
    navigate('/contact')
  }
  const handLoginclick = () => {
    setIsLoginModalVisible(!isLoginModalVisible);
  }
  const handleCategoryClick = (categoryId) => {
    navigate('/Products', { state: { categoryId } });
  };
  const [categories, setCategories] = useState([]);

  useEffect((onSearch) => {
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




  const dropdownMenu = (
    <div
      style={{
        position: 'absolute',
        right: "-30px",
        width: '152px',
        zIndex: 2,
        background: 'white',
      }}
    >
      {categories
        .slice(0, 4)
        .filter((category) => category.isAvailable !== false)
        .map((category, index) => (
          <li key={category.id}>
            <ButApage onClick={() => handleCategoryClick(category.id)}>{category.name}</ButApage>
          </li>
        ))}
    </div>);
  const dropdownLogin = (
    <div style={{
      width: "152px", position: 'absolute', right: "-60px",
      zIndex: 2, background: "white", marginTop: "17px",
      paddingBottom: "10px", borderRadius: "4px"
    }}
    >
      {isLoggedIn ? (
        <div style={{ textAlign: "center", padding: "10px" }}><h3>Hello : {fullName}</h3>
          <Button onClick={handEdit} style={{ width: "100%", marginTop: "13px" }}>Edit </Button>
          <Button onClick={handmyoder} style={{ width: "100%", marginTop: "10px" }}>My-Order</Button>
          <Button onClick={handleNavigateLogout} style={{ width: "100%", marginTop: "10px" }}>Logout </Button>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "10px" }}>
          <Button key="login" onClick={handleNavigateLogin}
            style={{ width: "100%", marginTop: "13px" }}>
            Login
          </Button>,
          <Button key="signup" onClick={handleNavigateSignup}
            style={{ width: "100%" }} >
            Register
          </Button>
        </div>
      )}
    </div>

  )
  return (
    <div style={{ width: "100%" }}>
      <HeaderPages>
        <LogoPage>

          <img src={Logo} style={{ width: "120px", height: "120px" }} />

        </LogoPage>
        <PhonePage><PhoneOutlined /> Hotline : 0328063556</PhonePage>
      </HeaderPages>

      <NavarPage>
        <ul style={{ marginLeft: "90px" }}>
          <li><a onClick={handleNavigateHome} style={{ color: "white" }}>Home</a></li>
          <li >
            <Dropdown overlay={dropdownMenu} trigger={['hover']}>
              <a onClick={handleProductsClick}>Products</a>
            </Dropdown>
          </li>
          <li><a href="#contact">News</a></li>
          <li><a style={{ color: "white" }} onClick={handContact}>Contact</a></li>
          <li><a onClick={handHistory} style={{ color: "white" }}>History</a></li>
        </ul>

        <div style={{ marginRight: "30px", display: "flex", justifyContent: "space-between" }}>
          <ButtonPage onClick={() => handleButtonClick()}>
            <SearchOutlined style={{ fontSize: '15px' }} />
          </ButtonPage>


          <Modal
            title="Search"
            visible={isSearchModalVisible}
            onCancel={() => setIsSearchModalVisible(false)}
            footer={null}
          >
            <div >
              <Space.Compact style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 15px 0" }}>
                <Input
                  placeholder="Search..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="primary" onClick={() => handleSearch(searchQuery)}>Search</Button>
              </Space.Compact>

              {searchResults.length > 0 && (
                <div>
                  {searchResults.map(product => (
                    <div key={product.id}>
                      <p style={{ cursor: "pointer" }} onClick={() => handleProductClick(product.id)}>{product.title}</p>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Modal>
          <Dropdown overlay={dropdownLogin} trigger={['hover']}>
            <ButtonPage onClick={handLoginclick}><UserOutlined style={{ fontSize: '15px' }} /></ButtonPage>
          </Dropdown>

          <ButtonPage onClick={handleNavigateCart}><Badge count={cartItemsLength} style={{position:'absolute',top:"-8px",right:"-8px"}} >
            <ShoppingCartOutlined style={{ fontSize: '19px', color: "white" }} /></Badge></ButtonPage>
        </div>


      </NavarPage>

    </div>
  )
} 
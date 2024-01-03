import Logo from '../../Image/logo.png'
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { HeaderPages, LogoPage, PhonePage, NavarPage, ButtonPage, StyledInput, IL, AL } from './style.js'
import { PhoneOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Dropdown, Space, message, Button } from 'antd';
import {useNavigate} from 'react-router-dom'

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items = [
  {
    key: '1',
    label: (
      <a >
        item1
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a>
        item2
      </a>
    ),

  },
  {
    key: '3',
    label: (
      <a>
        item 3
      </a>
    ),

  },
];


export const Header = () => {
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const handleNavigateLogin = () => {
    navigate('/Login')
  }  
  const handleNavigateSignup = () => {
    navigate('/Sigup')
  } 
  const handleNavigateHome = () => {
    navigate('/')
  } 

  const handleButtonClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  const handLoginclick = () => {
    setIsLoginModalVisible(!isLoginModalVisible);
  }



  return (
    <div style={{width:"100%"}}>
      <HeaderPages>
        <LogoPage>

          <img src={Logo} style={{ width: "120px", height: "120px" }} />

        </LogoPage>
        <PhonePage><PhoneOutlined /> Hotline : 0328063556</PhonePage>
      </HeaderPages>

      <NavarPage>
        <ul style={{ marginLeft: "90px" }}>
          <li><a onClick={handleNavigateHome} style={{color:"white"}}>Home</a></li>
          <li >
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <a >
                <Space>
                  Products
                </Space>
              </a>
            </Dropdown>
          </li>
          <li><a href="#contact">News</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">History</a></li>
        </ul>

        <div style={{ marginRight: "30px", display: "flex", justifyContent: "space-between" }}>
          {isSearchVisible && (
            <StyledInput
              placeholder="Nhập từ khóa tìm kiếm..."
            />
          )}
          <ButtonPage onClick={handleButtonClick}>
            <SearchOutlined style={{ fontSize: '15px' }} />
          </ButtonPage>
          {isLoginModalVisible && (


            <div
              style={{position:"absolute",width:"152px" ,zIndex:2,background:"white" ,margin:"40px 0 0 0",paddingBottom:"10px"}}
            >
              <Button key="login" onClick={handleNavigateLogin}
                style={{ margin: "10px -19px 0 -19px", width: "140px",right:"-25px" }} >
                Đăng nhập
              </Button>,

              <Button key="signup" onClick={handleNavigateSignup}
                style={{ margin: "3px -19px 0 -19px", width: "140px",right:"-25px" }} >
                Đăng ký
              </Button>
            </div>
          )}
          <ButtonPage onClick={handLoginclick}><UserOutlined style={{ fontSize: '15px' }} /></ButtonPage>
          <ButtonPage><ShoppingCartOutlined style={{ fontSize: '19px' }} /></ButtonPage>
        </div>


      </NavarPage>

    </div>
  )
} 
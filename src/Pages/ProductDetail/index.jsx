import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { Button,Rate,Row,Col, Image, message,} from "antd";
export const ProductDetail = () => {
  const  productId  = useParams();
  const [product, setProduct] = useState();
  const cartId = localStorage.getItem('cartId');
  const accessToken = localStorage.getItem('accessToken');
  const Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);
 const handEdit =()=>{

localStorage.setItem('productIdForEdit', product.id);
if (isLoggedIn) {
  // User is logged in, navigate to the Edit page
  Navigate("/Edit");
} else {
  // User is not logged in, navigate to the Login page
  Navigate("/Login");
}
 }

const  handLogin =()=>{
  localStorage.setItem('productId', product.id);
  Navigate("/Login")
}
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://103.166.182.247:3001/products/${productId.id}`);
        setProduct(response.data.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);
  const [quantity, setQuantity] = useState(1);
      
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

const handleIncrease = () => {

setQuantity(quantity + 1);
  };
  const handleAddToCart = async () => {
    if (product.quantity > 0) {
    try {
      const response = await axios.post('http://103.166.182.247:3001/cartItems', {
        cartId: cartId,
        productId: product.id,
        price: product.price,
        discount: product.discount,
        quantity: quantity
      }, {
        headers: {
          'x_authorization': accessToken
        }
      });
      localStorage.removeItem('cartItemsLength')
      const cartResponse = await axios.get(`http://103.166.182.247:3001/carts/${cartId}`, {
        headers: {
          'x_authorization': accessToken,
        },
      });

      const cartItemsLength = cartResponse.data.data.cart.items.length;
      localStorage.setItem('cartItemsLength', cartItemsLength);
      
      message.success('AProduct added to cart')
      console.log('Product added to cart:', response.data);
      // Handle success or navigate to the cart page, etc.
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  } else {
    message.error('This product is out of stock');
    // You can take additional actions here, such as showing a message or disabling the add to cart button.
  }
  };





  return (
    <div>
      {product && (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height:'100%' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={product.image} alt="image prodcut" preview={false} width="100%" />
                </Col>
                
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{product.title}</WrapperStyleNameProduct>
                    <div>
                        <Rate  /><br/>
                        <WrapperStyleTextSell>  Sold | 100+ </WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{product.price}$</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Delivery to address :</span>
                         -
                        <span onClick={handEdit} style={{cursor:"pointer"}} className='change-address'>Change the address</span>
                    </WrapperAddressProduct>
                    
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Quantity</div>
                        <WrapperQualityProduct>
                            <button onClick={handleDecrease} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber  value={quantity}  min={1}  size="small" onChange={setQuantity}/>
                            <button onClick={handleIncrease} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                        <div>
                        
                        <Button
  size={40}
  onClick={isLoggedIn ? handleAddToCart :  handLogin}
  styleButton={{
    background: 'rgb(64, 144, 241)',
    height: '48px',
    width: '220px',
    border: 'none',
    borderRadius: '4px'
  }}
  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
>
  {isLoggedIn ? "Add to Cart" : "Login"}
</Button>
                           
                        
                             
                        </div>
                        <Button
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px'
                                
                            }}
                            
                        
                            styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></Button>
                    </div>
                   <div>
                    <h1>Thông tin </h1>
                   <p>{product.content}</p>
                   </div>
                </Col>
                
            </Row >
            
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Checkbox } from 'antd';
import{Button,Divider} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
export const DeleteCart = () => {
    const Navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartId = localStorage.getItem('cartId');
                const response = await axios.get(`http://103.166.182.247:3001/carts/${cartId}`, {
                    headers: {
                        'x_authorization': localStorage.getItem('accessToken'),
                    },
                });
                setCart(response.data.data.cart);
                localStorage.setItem('cartItemsLength', response.data.data.cart.items.length);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, []);

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            // Find the cart item based on the productId
            const cartItem = cart.items.find(item => item.id === itemId);

            // Fetch cartId from local storage
            const cartId = localStorage.getItem('cartId');
            // Send a request to update the quantity in your API
            const response = await axios.put(`http://103.166.182.247:3001/cartItems/${itemId}`, {
                cartId,
                productId: cartItem.productId,
                price: cartItem.price,
                quantity: newQuantity,
            }, {
                headers: {
                    'x_authorization': localStorage.getItem('accessToken'),
                },
            });

            setCart((prevCart) => {
                const updatedItems = prevCart.items.map((item) => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            quantity: newQuantity,
                        };
                    }
                    return item;
                });

                return {
                    ...prevCart,
                    items: updatedItems,
                };
            });

            console.log('Quantity updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
         
    
    const HandDeleteProduct = async (itemId) => {
        try {
          
            // Find the cart item based on the itemId
            const cartItem = cart.items.find(item => item.id);
    
            console.log('cartItem:', cartItem.id);
    
            if (!cartItem) {
                console.error('Cart item not found for deletion');
                return;
            }
            
            // Log the values for verification
            // Send a request to delete the item in your API
            const response = await axios.delete(`http://103.166.182.247:3001/cartItems/${cartItem.id}`, {
                headers: {
                    'x_authorization': localStorage.getItem('accessToken'),
                },
 
            });
            localStorage.removeItem("cartItemsLength");
            Navigate("/Cart")

        } catch (error) {
            console.error('Delete error:', error);
        }
    };
    const handleCheckboxChange = (record) => {
        setSelectedProducts((prevSelectedProducts) => {
            const isSelected = prevSelectedProducts.some((product) => product.id === record.id);

            if (isSelected) {
                // Unselect if already selected
                return prevSelectedProducts.filter((product) => product.id !== record.id);
            } else {
                // Select the product and update the total amount
                const selectedProductTotalAmount = cartWithTotalAmount
                    .filter((item) => item.id === record.id)
                    .reduce((total, item) => total + item.totalAmount, 0);

                const selectedProductDiscount = cartWithTotalAmount
                    .filter((item) => item.id === record.id)
                    .reduce((discount, item) => discount + (item.discount || 0) + (item.quantity > 1 ? (item.quantity - 1) * (item.discount || 0) : 0), 0);

                return [
                    ...prevSelectedProducts,
                    {
                        id: record.id,
                        totalAmount: selectedProductTotalAmount,
                        discount: selectedProductDiscount,
                    },
                ];
            }
        });
    };

    if (!cart) {
        return <Spin />;
    }

    const cartWithTotalAmount = cart.items
        .map((item) => ({
            ...item,
            totalAmount: item.price * item.quantity,
        }))
        .sort((a, b) => a.id - b.id);
    const columns = [
        {
            title: 'Tick',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <div>
                    <Checkbox
                        checked={selectedProducts.some((product) => product.id === record.id)}
                        onChange={() => handleCheckboxChange(record)}
                    />
                </div>
            ),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',

            render: (text, record) => (
                <img src={text} alt={`Product ${record.id}`} style={{ width: '120px', height: '120px' }} />
            ),
        },
        {

            title: 'Price ($)',
            dataIndex: 'price',
            key: 'price',

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <div style={{display:"flex"}}>
                    <button
                        style={{ border: "none", background: "rgb(53, 131, 183)", color: "white" }}
                        onClick={() => handleQuantityChange(record.id, text - 1)}>-</button>
                    <input
                        type="number"
                        value={text}
                        onChange={(e) => handleQuantityChange(record.id, e.target.value)}
                        style={{ width: '50px', textAlign: 'center' }}
                    />
                    <button
                        style={{ border: "none", background: "rgb(53, 131, 183)", color: "white" }}
                        onClick={() => handleQuantityChange(record.id, text + 1)}>+</button>
                </div>
            ),
        },
        {
            title: 'Total Amount ($)',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },{
            title:"Delete",
            render:(_,record) =>(
                    <DeleteOutlined onClick={HandDeleteProduct} style={{fontSize:"20px",cursor:"pointer"}}/>
            )

            
        }
    ];

    const selectedProductsTotalAmount = selectedProducts.reduce((total, product) => total + (product.totalAmount - product.discount), 0);
const handCheckout = () =>{
    Navigate("/CheckOut")
}
    return (
        <div style={{ background: "#f9f6f6" }}>
            <h1 style={{ margin: "0 0 0 3%" }}>Your Cart</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Table dataSource={cartWithTotalAmount} columns={columns} rowKey="id" style={{ width: '65%' }} />
                <div style={{
                    width: '30%', marginLeft: "2%",
                    display: "flex", alignItems: "center", flexDirection: "column", background: 'white', borderRadius: "5px",
                }}>
                    <div style={{ margin: "20px" }}>
                        <h2>Selected Products Price</h2>
                        {selectedProducts.map((selectedProduct) => (
                            <div key={selectedProduct.id} >
                                <h4 style={{ display: "flex",justifyContent:"space-between" }}> <div>Total Amount:</div> <h4 style={{ color: "red", marginLeft: "7px" }}>{selectedProduct.totalAmount}$</h4> </h4>
                                <h4 style={{ display: "flex",justifyContent:"space-between" }}> <div>Discount:</div> <h4 style={{ color: "red", marginLeft: "7px" }}> -{selectedProduct.discount}$</h4> </h4>
                                <h4 style={{ display: "flex",justifyContent:"space-between" }}>
                                 <h4>After discount:</h4>   <h4 style={{ color: "red", marginLeft: "7px" }}> {selectedProduct.totalAmount - selectedProduct.discount}$</h4> </h4>
                            </div>
                        ))}
                        <h4 style={{ display: "flex" }}>The money have to pay: <h4 style={{ color: "red", marginLeft: "7px" }}>{selectedProductsTotalAmount}$</h4></h4>
                       
                    </div>
                    <Button onClick={handCheckout} style={{width:"70%",marginTop:"15%"}}>CheckOut</Button>
                   
                </div>
            </div>
            <Divider></Divider>
            <div>
                {/* Add other relevant information here */}
            </div>
        </div>
    );
};

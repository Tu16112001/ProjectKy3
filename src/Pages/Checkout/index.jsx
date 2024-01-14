import { Divider, Form, Input, Select, Button, Badge, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CheckOut = () => {
    const Navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [carts, setCarts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    const HandCacrt = () => {
        Navigate("/Cart");
    }

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
                setCarts(response.data.data);
                setLoading(false);
                if (localStorage.getItem('cartItemsLength')) {
                    // If it exists, remove it
                    localStorage.removeItem('cartItemsLength');
                }
    
                // Save the new cartItemsLength in local storage
                localStorage.setItem('cartItemsLength', response.data.data.cart.items.length);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, []);

    const updateCartInfo = async () => {
        try {

            const address = form.getFieldValue('address');
            if (!address) {
                message.error('Please enter your address.');
                return;
            }
            const cartId = localStorage.getItem('CartId');
            const response = await axios.put(`http://103.166.182.247:3001/carts/${cartId}`, {
                status: 1,
                fullName: form.getFieldValue('fullName'),
                mobile: form.getFieldValue('mobile'),
                address: form.getFieldValue('address'),
                note: form.getFieldValue('note'),
                paymentMethod: form.getFieldValue('paymentMethod'),
            }, {
                headers: {
                    'x_authorization': localStorage.getItem('accessToken'),
                },
            });

            setCart(response.data.data.cart);
            setCarts(response.data.data);
            setLoading(false);
            message.success('Cart information updated successfully!');
            Navigate("/my-order");
        } catch (error) {
            console.error('Error updating cart data:', error);
        }
    };

    const createOrder = async () => {
        try {
            const cartId = localStorage.getItem('cartId');
            await axios.post(`http://103.166.182.247:3001/orders`, {
                cartId: cart.id,
                // Add other necessary fields for the order based on your API requirements
            }, {
                headers: {
                    'x_authorization': localStorage.getItem('accessToken'),
                },
            });

            message.success('Order created successfully!');
            Navigate("/my-order");
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleUpdateCartInfo = async () => {
        setLoading(true);
        await updateCartInfo();
        await createOrder();  // Create order after updating cart information
        form.resetFields();  // Reset form fields
    };
    const totalValue = cart
        ? cart.items.reduce((total, item) => total + (item.price - item.discount) * item.quantity, 0)
        : 0;

    const { TextArea } = Input;

    if (loading) {
        return <Spin />;
    }

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "65%", borderRight: "1px solid gray" }}>
                {carts &&
                    <Form form={form} style={{ display: "flex", width: "100%" }}>
                        <div style={{ width: "55%", margin: "88px 10% 0 15%" }}>
                            <a style={{ fontSize: "34px", color: "rgb(53, 131, 183)" }}>Jewelry</a><br />
                            <label style={{ fontSize: "20px" }}>Delivery information</label>
                            <Form.Item name="fullName" initialValue={carts.cart.fullName}>
                                <Input placeholder="FullName" />
                            </Form.Item>
                            <Form.Item name="mobile" initialValue={carts.cart.mobile}>
                                <Input placeholder="Mobile" />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                initialValue={carts.cart.address}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your address',
                                    },
                                ]}
                            >
                                <Input placeholder="Address" />
                            </Form.Item>
                            <Form.Item name="note" initialValue={carts.cart.note}>
                                <TextArea placeholder="Note" style={{ height: "130px" }} />
                            </Form.Item>
                        </div>
                        <div style={{ width: "45%", margin: "15% 10% 0 0" }}>
                            <Form.Item name="transport">
                                <label style={{ fontSize: "20px" }}>Transport</label>
                                <Input minLength={0} value=" Please enter delivery information" />
                            </Form.Item>
                            <label style={{ fontSize: "20px" }}>Payment method</label>
                            <Form.Item name="paymentMethod" initialValue={1}>

                                <Select>
                                    <Select.Option value={1}>Payment upon delivery</Select.Option>
                                    <Select.Option value={2}>Pay by paypal</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </Form>
                }
            </div>
            <div style={{ width: "35%", background: "#f9f6f6" }}>
                <div>
                    <h1 style={{ margin: "15% 0 0 10%" }}>Order product ({cart.items.length})</h1>
                </div>
                <Divider />
                <h3 style={{ marginLeft: "10%" }}>Products</h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {cart &&
                        <div style={{ width: "100%" }}>
                            {cart.items.map((item) => (
                                <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                                    <div style={{ margin: "20px 20% 0 10%" }}>
                                        <Badge key={item.id} count={item.quantity}>
                                            <img src={item.image} alt={item.id} width="60px" height="60px" style={{ border: '1px solid #AAA', boxShadow: "1px 1px", borderRadius: "9px" }} />
                                        </Badge>
                                    </div>
                                    <h3 style={{ display: "flex" }}>Price : <h3 style={{ color: "red" }}>{item.price}</h3>$</h3>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <Divider />

                {cart && cart.items.map((carts) => (
                    <div key={carts.id}>
                        <h3 style={{ margin: "10px 0 0 10%", display: "flex" }}>Temporary price :<h3 style={{ color: "red" }}>{carts.price}</h3>$</h3>
                        <h3 style={{ display: "flex", margin: "5px 0 0 10%" }}> Discount :<h3 style={{ color: "red" }}> {carts.discount}</h3>$</h3>
                    </div>
                ))}

                <Divider />
                <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", width: "100%" }}>
                        <h2 style={{ margin: "0 5px 0 10%" }}> Total value: </h2>
                        <h2 style={{ display: "flex" }}> <h2 style={{ color: "red" }}>{totalValue}</h2>$</h2>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", margin: "2%", alignItems: "center" }}>
                        <Button style={{ background: "#f9f6f6", fontSize: "18px", color: "rgb(53, 131, 183)", cursor: "pointer", border: "none", textAlign: "center" }} onClick={HandCacrt}> Return to cart</Button>
                        <Button style={{ fontSize: "18px", background: "rgb(53, 131, 183)", color: "white", height: "40px" }} onClick={handleUpdateCartInfo}>Update order</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

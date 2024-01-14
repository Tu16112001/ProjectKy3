import React, { useEffect, useState } from "react";
import { Table, Space, Button,Steps } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const MyOrder = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
    

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://103.166.182.247:3001/orders/byCurrentUser/",
          {
            headers: {
              'x_authorization': localStorage.getItem('accessToken'),
            },
          }
        );
        setOrders(response.data.data.orders);
        setLoading(false);
        if (localStorage.getItem('cartItemsLength')) {
            // If it exists, remove it
            localStorage.removeItem('cartItemsLength');
        }

        // Save the new cartItemsLength in local storage
        localStorage.setItem('cartItemsLength', response.data.data.cart.items.length);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);
  const handViewDetail =(orderId)=>{
    navigate(`/ViewDetail/${orderId}`);
}

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },{
        title: 'Total payable',
        dataIndex: 'discount',
        key: 'discount',
        render: (text) => <span>{text}$</span>,
    },
    {
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
        render: (paymentMethod) => {
            const paymentMethodMapping = {
              1: 'Payment upon delivery',
              2: 'Pay by PayPal',
              // Nếu có thêm giá trị khác cần xử lý, thêm vào đây
            };
        
            return paymentMethodMapping[paymentMethod] || 'Payment upon delivery';
          }
      },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space style={{display:"flex",alignItems:"end"}}>
          <Button onClick={() => handViewDetail(record.id)}>View Details</Button>
        </Space>
      ),
    },
  ];


  
  return (
   <div style={{with:"100%",height:"100vh",display:"flex",alignItems:"center",flexDirection:"column",background:"#ccc"}}>
       
     <Table style={{width:"80%",margin:"6% 0 0 0"}} dataSource={orders} columns={columns} pagination={{ pageSize: 6 }}/>
   </div>
  )
};


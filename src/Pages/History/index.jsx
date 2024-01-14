import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const History = () => {
  const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

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
  const ViewHistory =(orderId)=>{
    navigate(`/ViewHistory/${orderId}`);
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
    },
    {
      title: 'Total price',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => <span>{text}$</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space style={{display:"flex",alignItems:"end"}}>
          <Button onClick={() => ViewHistory(record.id)}>View History</Button>
        </Space>
      ),
    },
  ];

  return (
   <div style={{with:"100%",height:"100vh",display:"flex",alignItems:"center",flexDirection:"column",background:"#ccc"}}>

     <Table style={{width:"80%",margin:"6% 0 0 0"}} dataSource={orders} columns={columns} pagination={{ pageSize: 7 }}/>
   </div>
  )
};


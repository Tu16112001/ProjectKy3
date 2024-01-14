import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, Steps ,Space,Button, message} from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ViewHistoy = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const description = 'In process...';
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`http://103.166.182.247:3001/orders/${id}`, {
                    headers: {
                        "x_authorization": accessToken
                    }
                });
                setOrder(response.data.data.order);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, [id]);

    if (loading) {
        return <Spin />;
    }
    const handleCancelOrder = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await axios.put(`http://103.166.182.247:3001/orders/status/${id}`, {
            status: 8
          }, {
            headers: {
              "x_authorization": accessToken
            }
          });
          navigate(`/my-order`);
          message.success("Cancellation request sent waiting for confirmation")
        } catch (error) {
          console.error('Error cancelling order:', error);
        }
      };


    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt="Product" style={{ width: '50px', height: '50px' }} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text}$</span>,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (text) => <span>{text}$</span>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key:"updatedAt",
        },
    ];


    
    const getStatusTitle = () => {
        // Ánh xạ giá trị status sang tiêu đề tương ứng với Steps
        switch (order.status) {
            case 8:
                return 'Wait for confirmation';
            case 9:
                return 'Please wait for someone to pick up the goods';
            case 10:
                return 'Complete cancellation';
            default:
                return 'Unknown';
        }
    };
    const currentStatusTitle = getStatusTitle();
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:"center",background:"#ccc",height:"100vh"}}>
            <h1 style={{marginTop:"30px"}}>Order History</h1>
            <div style={{ margin: "3% 0 0 0", width: "80%", background: "white", padding: "20px", borderRadius: "4px" }}>
           
                <Steps
                    current={order.status}
                   
                    items={
                        order.status !== 8 && order.status !== 9 && order.status !== 10 ?[
                        {
                            title: 'Packing',
                            description,
                        },
                        {
                            title: 'Assigned',
                            description,
                        },
                        {
                            title: 'Coming',
                            description,
                        }, {
                            title: 'Transport',
                            description,
                        },
                        {
                            title: 'Wait receive',
                            description,
                        }, {
                            title: 'Delivered',
                            description,
                        }, {
                            title: 'Complete',
                        }
                    ]:[
                        {
                            title: currentStatusTitle,
                            description,
                        }
                    ]}
                   
                />
               
                                   
 
                   

       


        </div>
        <Table style={{width:"80%",marginTop:"20px"}} dataSource={order.items} columns={columns} pagination={{ pageSize: 6 }} rowKey="id" />
    </div >
  );
};

export default ViewHistoy;

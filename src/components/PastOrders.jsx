import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth);
console.log('useruser=', user);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/user/${user._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching past orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <OrdersContainer>
      <h2>Past Orders</h2>
      {orders?.length > 0 ? (
        orders?.map((order) => (
          <OrderCard key={order?._id}>
            <OrderDetails>
              <OrderId>Order ID: {order?._id}</OrderId>
              <OrderStatus>Status: {order?.status}</OrderStatus>
              <OrderDate>Date: {moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</OrderDate>
              <OrderTotal>Total: ${order?.total}</OrderTotal>
            </OrderDetails>
            <ProductList>
                <ProductCard key={order.products[0]._id}>
                  <ProductImage src={order.products[0].image.secure_url} alt={order.products[0].name} />
                  <ProductInfo>
                    <ProductName>{order.products[0].name}</ProductName>
                    <ProductBrand>{order.products[0].brand}</ProductBrand>
                    <ProductDesc>{order.products[0].desc}</ProductDesc>
                    <ProductPrice>${order.products[0].price}</ProductPrice>
                    <ProductQuantity>Quantity: {order.products[0].cartQuantity}</ProductQuantity>
                  </ProductInfo>
                </ProductCard>
            </ProductList>
          </OrderCard>
        ))
      ) : (
        <NoOrdersMessage>No past orders found.</NoOrdersMessage>
      )}
    </OrdersContainer>
  );
};

export default PastOrders;

const OrdersContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const OrderCard = styled.div`
display: flex;
justify-content: space-between;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const OrderDetails = styled.div`
  margin-bottom: 20px;
`;

const OrderId = styled.p`
  font-weight: bold;
`;

const OrderStatus = styled.p`
  color: green;
`;

const OrderDate = styled.p`
  color: #555;
`;

const OrderTotal = styled.p`
  font-size: 1.2em;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  width: 30rem;
  // width: calc(33.333% - 20px);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 10rem;
  border-radius: 5px;
`;

const ProductInfo = styled.div`
  padding: 10px 0;
`;

const ProductName = styled.h4`
  margin: 0;
  font-size: 1.1em;
`;

const ProductBrand = styled.p`
  color: #888;
  font-size: 0.9em;
`;

const ProductDesc = styled.p`
  font-size: 0.9em;
`;

const ProductPrice = styled.p`
  font-weight: bold;
`;

const ProductQuantity = styled.p`
  color: #555;
`;

const NoOrdersMessage = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: #777;
`;

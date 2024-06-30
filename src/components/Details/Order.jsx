import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../features/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Order() {
  const pdfRef = useRef();
  const params = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/orders/findOne/${params.id}`,
          setHeaders()
        );
        setOrder(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [params.id]);
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };
  return (
    <StyledOrder>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <OrdersContainer ref={pdfRef}>
            <div>
              <h2>Order Details</h2>
              <p>
                Delivery Status:
                {order.status === "pending" ? (
                  <Pending>Pending</Pending>
                ) : order.status === "dispatched" ? (
                  <Dispatched>Dispatched</Dispatched>
                ) : order.status === "delivered" ? (
                  <Delivered>Delivered</Delivered>
                ) : (
                  "error"
                )}
              </p>
              <h3>Ordered Products</h3>
              <Items>
                {order.products?.map((product, index) => (
                  <Item key={index}>
                    <span>{product.name}</span>
                    <span>{product.cartQuantity}</span>
                    <span>{"$" + product.price?.toLocaleString()}</span>
                  </Item>
                ))}
              </Items>
              <div>
                <h3>Total Price</h3>
                <p>{"$" + order.total?.toLocaleString()}</p>
              </div>
              <div>
                <h3>Shipping Details</h3>
                <p>Customer: {order.customerId?.name}</p>
                <p>Email: {order.customerId?.email}</p>
              </div>
            </div>
            <Button onClick={downloadPdf}>Download Invoice</Button>
          </OrdersContainer>
        </>
      )}
    </StyledOrder>
  );
}

export default Order;

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
`;
const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;
const Button = styled.button`
  margin-top: 1.5rem;
  background-color: #269ce7;
  padding: 6px;
  border: 0;
  font-size: 1rem;
  color: white;
  border-radius: 1rem;
`;
const Items = styled.div`
  span {
    margin-left: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;
const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;
const Pending = styled.span`
  color: rgb(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ordersEdit, ordersFetch } from "../../../features/ordersSlice";
import moment from "moment";

export default function OrdersList() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.orders);
  console.log("listv=", list);
  const nav = useNavigate();
  const rows =
    list &&
    list.map((lis) => {
      return {
        id: lis._id,
        cName: lis.shipping?.name,
        amount: (lis.total / 100)?.toLocaleString(),
        dStatus: lis.status,
        date: moment(lis.createdAt).fromNow(),
      };
    });

  useEffect(() => {
    dispatch(ordersFetch());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "cName", headerName: "Name", width: 120 },
    {
      field: "dStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dStatus === "pending" ? (
              <Pending>Pending</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched>Dispatched</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>Delivered</Delivered>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Actions>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
              Dispatch
            </DispatchBtn>
            <DeliveryBtn onClick={() => handleOrderDeliver(params.row.id)}>
              Deliver
            </DeliveryBtn>
            <View onClick={() => nav(`/order/${params.row.id}`)}>View</View>
          </Actions>
        );
      },
    },
  ];
  const handleOrderDispatch = (id) => {
    dispatch(
      ordersEdit({
        id,
        status: "dispatched",
      })
    );
  };
  const handleOrderDeliver = (id) => {
    dispatch(
      ordersEdit({
        id,
        status: "delivered",
      })
    );
  };

  if(list?.length===0) return <Loader>Loading...</Loader>
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[0, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;
const Loader=styled.div`
font-size: 2rem;
font-weight: bolder;
margin: auto;
width: fit-content;
`
const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 249);
`;
const DeliveryBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

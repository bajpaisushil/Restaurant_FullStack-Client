import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsDelete } from '../../../features/productsSlice';
import EditProduct from '../EditProduct';
import { userDelete, usersFetch } from '../../../features/usersSlice';


function UsersList() {
  const dispatch=useDispatch();
  const {list}=useSelector((state)=> state.users);
  const nav=useNavigate();

  useEffect(()=>{
    dispatch(usersFetch());
  }, [dispatch]);

  const rows=list && list.map(user=> {
    return {
      id: user._id,
      uName: user.name,
      uEmail: user.email,
      role: user.role,
    }
  })
  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'uName', headerName: 'Name', width: 150},
    {field: 'uEmail', headerName: 'Email', width: 200},
    {
        field: 'isAdmin',
        headerName: 'role',
        width: 120,
        renderCell: (params)=>{
            return(
              <div>
                {params.row.role=="staff"? (
                    <Admin>Staff</Admin>
                ): (
                    <Customer>Customer</Customer>
                )}
              </div>
            )
          }
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params)=>{
        return(
          <Actions>
            <View onClick={()=> nav(`/user/${params.row.id}`)}>View</View>
          </Actions>
        )
      }
    }
  ];
  const handleDelete=(id)=>{
    dispatch(userDelete(id));
  }

  if(list?.length===0) return <Loader>Loading...</Loader>
  return (
    <div style={{ height: 600, width: '100%' }}>
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

export default UsersList;


const Actions=styled.div`
width: 100%;
display: flex;
justify-content: space-between;
button{
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
`
const Loader=styled.div`
font-size: 2rem;
font-weight: bolder;
margin: auto;
width: fit-content;
`
const Delete=styled.button`
background-color: rgb(255, 77, 73);
`
const View=styled.button`
background-color: rgb(114, 225, 40);
`
const Admin=styled.div`
color: rgb(253, 181, 40);
background: url(253, 181, 40, 0.12);
padding: 3px 5px;
border-radius: 3px;
font-size: 14px;
`
const Customer=styled.div`
color: rgb(38, 198, 249);
background-color: rgb(28, 198, 249, 0.12);
padding: 3px 5px;
border-radius: 3px;
font-size: 14px;
`


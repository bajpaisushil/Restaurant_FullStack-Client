import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from './CommonStyled';
import { productsEdit } from '../../features/productsSlice';

export default function EditProduct({prodId}) {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);
  const [currentProd, setCurrentProd]=useState({});
  const [previewingImg, setPreviewingImg]=useState("");
  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const {items, editStatus}=useSelector((state)=> state.products);

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('uploaded image');
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviewingImg(reader.result);
      };
      console.log(reader.result);
    } else {
      setProductImg("");
    }
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd=items.filter((item)=> item._id===prodId);
    selectedProd=selectedProd[0];
    setCurrentProd(selectedProd);
    setPreviewingImg(selectedProd.image.url);
    setProductImg("");
    setBrand(selectedProd.brand);
    setDesc(selectedProd.desc);
    setName(selectedProd.name);
    setPrice(selectedProd.price);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsEdit({
        productImg,
        product: {...currentProd,
        name: name,
        brand: brand,
        price: price,
        desc: desc,
      }})
    );
  };

  return (
    <div>
      <Edit variant="outlined" onClick={handleClickOpen}>
        Edit
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <StyledEditProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Update Product</h3>
        <input
          id="imgUpload"
          accept="image/*"
          type="file"
          onChange={handleProductImageUpload}
        />
        <select onChange={(e) => setBrand(e.target.value)} value={brand} required>
          <option value="">Select Brand</option>
          <option value="maincourse">Main Course</option>
          <option value="dessert">Desserts</option>
          <option value="drink">Drinks</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        <PrimaryButton type="submit">
          {editStatus === "pending" ? "Updating..." : "Update"}
        </PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {previewingImg ? (
          <>
            <img src={previewingImg} alt="error!" />
          </>
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}
      </ImagePreview>
    </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Edit=styled.button`
border: none;
outline: none;
padding: 3px 5px;
color: white;
border-radius: 3px;
cursor: pointer;
background-color: #4b70e2;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;

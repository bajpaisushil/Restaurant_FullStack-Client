
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useGetAllProductsQuery } from '../features/productsApi';
// import { addToCart } from '../features/cartSlice';
// import styled from 'styled-components';

// const Home = () => {
//   const { items: data, status } = useSelector((state) => state.products);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [currentTab, setCurrentTab] = useState('maincourse'); // State to manage current tab

//   // Filter products based on current tab
//   const filteredData = data.filter(product => product.brand === currentTab);

//   const handleTabChange = (tab) => {
//     setCurrentTab(tab);
//   };

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     navigate("/cart");
//   };

//   return (
//     <div className="home-container">
//       <h2>Restaurant + Delicious = Resticious</h2>
//       <Tabs>
//       <TabButton onClick={() => handleTabChange('other')} active={currentTab === 'all'}>All</TabButton>
//         <TabButton onClick={() => handleTabChange('maincourse')} active={currentTab === 'maincourse'}>Main Course</TabButton>
//         <TabButton onClick={() => handleTabChange('dessert')} active={currentTab === 'dessert'}>Desserts</TabButton>
//         <TabButton onClick={() => handleTabChange('drink')} active={currentTab === 'drink'}>Drinks</TabButton>
//       </Tabs>

//       <div className="products">
//         {status === "pending" && <p>Loading...</p>}
//         {status === "error" && <p>Unexpected error occurred...</p>}
//         {status === "success" && (
//           <>
//             {filteredData.length === 0 && <p>No products found.</p>}
//             {filteredData.map((product) => (
//               <Product key={product._id}>
//                 <h3>{product.name}</h3>
//                 <Link to={`product/${product._id}`}>
//                   <img src={product.image?.url} alt={product.name} />
//                 </Link>
//                 <div className="details">
//                   <span className="price">${product.price}</span>
//                   <span className='description'>{product.desc}</span>
//                 </div>
//                 <button className='addtocart' onClick={() => handleAddToCart(product)}>
//                   Add To Cart
//                 </button>
//               </Product>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// const Tabs = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 1rem;
// `;

// const TabButton = styled.button`
//   padding: 10px;
//   margin: 0 5px;
//   background-color: ${props => props.active ? 'lightblue' : 'white'};
//   border: 1px solid lightblue;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const Product = styled.div`
//   border: 1px solid #ccc;
//   padding: 1rem;
//   margin-bottom: 1rem;

//   h3 {
//     margin-bottom: 0.5rem;
//   }

//   img {
//     height: 200px;
//     width: 100%;
//     object-fit: cover;
//     margin-bottom: 0.5rem;
//   }

//   .details {
//     display: flex;
//     justify-content: space-betwee;
//     align-items: center;
//     margin-bottom: 0.5rem;
//   }

//   .price {
//     font-weight: bold;
//   }

//   .description {
//     display: -webkit-box;
//     -webkit-line-clamp: 3;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }

//   .addtocart {
//     background-color: lightblue;
//     border: none;
//     padding: 0.5rem 1rem;
//     cursor: pointer;
//   }
// `;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../features/productsApi';
import { addToCart } from '../features/cartSlice';
import styled from 'styled-components';

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  console.log('prod items=', data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all'); // Default to 'all' category
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on current tab and search term
  const filteredData = data?.filter(product => {
    if (currentTab !== 'all' && product.brand !== currentTab) {
      return false;
    }
    if (searchTerm.trim() === '') {
      return true;
    }
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.price.toString().includes(search)
    );
  });

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className=''>
      <img src={require("../assets/restau.jpg")} height={560} width={"100%"} />
    <div className="home-container">
      <h2>Restaurant + Delicious = Resticious</h2>
      <Tabs>
        <TabButton onClick={() => handleTabChange('all')} active={currentTab === 'all'}>All</TabButton>
        <TabButton onClick={() => handleTabChange('maincourse')} active={currentTab === 'maincourse'}>Main Course</TabButton>
        <TabButton onClick={() => handleTabChange('dessert')} active={currentTab === 'dessert'}>Desserts</TabButton>
        <TabButton onClick={() => handleTabChange('drink')} active={currentTab === 'drink'}>Drinks</TabButton>
      </Tabs>

      <SearchBar
        type="text"
        placeholder="Search by title or price..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="products">
        {status === "pending" && <p>Loading...</p>}
        {status === "error" && <p>Unexpected error occurred...</p>}
        {status === "success" && (
          <>
            {filteredData?.length === 0 && <p>No products found.</p>}
            {filteredData?.map((product) => (
              <Product key={product._id}>
                <h3>{product.name}</h3>
                <Link to={`product/${product._id}`}>
                  <img src={product.image?.url} alt={product.name} />
                </Link>
                <div className="details">
                  <span className="price">${product.price}</span>
                  <span className='description'>{product.desc}</span>
                </div>
                <button className='addtocart' onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </Product>
            ))}
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  background-color: ${props => props.active ? 'lightblue' : 'white'};
  border: 1px solid lightblue;
  border-radius: 5px;
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Product = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 0.5rem;
  }

  img {
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 0.5rem;
  }

  .details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .price {
    font-weight: bold;
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .addtocart {
    background-color: lightblue;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

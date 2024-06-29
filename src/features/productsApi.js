import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

console.log(`process env => ${process.env.REACT_APP_API_URL}`);
export const productsApi=createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/`}),
    endpoints: (builder)=>({
        getAllProducts: builder.query({
            query: ()=> "products"
        })
    })
})

export const {useGetAllProductsQuery}=productsApi;

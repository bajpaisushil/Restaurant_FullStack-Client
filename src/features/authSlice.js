import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from 'jwt-decode';
import {toast} from 'react-toastify';

const initialState={
    token: localStorage.getItem("token"),
    name: '',
    email: '',
    _id: "",
    role: '',
    registerStatus: "",
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false
}
export const registerUser=createAsyncThunk(
    "auth/registerUser",
    async (user, {rejectWithValue})=>{
        try {
            const token=await axios.post(`${url}/register`, {
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
            })
            localStorage.setItem('token', token.data);
            return token.data;
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)
export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async (user, {rejectWithValue})=>{
        try {
            const token=await axios.post(`${url}/login`, {
                email: user.email,
                password: user.password
            })
            localStorage.setItem('token', token.data);
            return token.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state, action){
            const token=state.token;
            if(token){
                const user=jwtDecode(token);
                console.log('user=', user);
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id,
                    userLoaded: true
                }
            }
        },
        logoutUser(state, action){
            localStorage.removeItem('token');
            return {
                ...state,
                token: '',
                name: '',
                email: '',
                _id: '',
                role: '',
                registerStatus: '',
                registerError: '',
                loginStatus: '',
                loginError: '',
                userLoaded: false
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending, (state, action)=>{
            return {...state, registerStatus: "pending"}
        })
        builder.addCase(registerUser.fulfilled, (state, action)=>{
            if(action.payload){
                const user=jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id,
                    registerStatus: 'success'
                }
            } else return state;
        })
        builder.addCase(registerUser.rejected, (state, action)=>{
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            }
        })
        builder.addCase(loginUser.pending, (state, action)=>{
            return {...state, registerStatus: "pending"}
        })
        builder.addCase(loginUser.fulfilled, (state, action)=>{
            if(action.payload){
                const user=jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginStatus: 'success'
                }
            } else return state;
        })
        builder.addCase(loginUser.rejected, (state, action)=>{
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload
            }
        })
    }
})

export const {loadUser, logoutUser}=authSlice.actions;
export default authSlice.reducer;


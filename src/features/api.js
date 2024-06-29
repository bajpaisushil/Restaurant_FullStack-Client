export const url=`${process.env.REACT_APP_API_URL}/api`;

export const setHeaders=()=>{
    const headers={
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        }
    }
    return headers;
}

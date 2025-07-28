import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { decodeToken } from '../utils/JwtUtils';

const OAuthSuccessPage=()=>{
    const [params] =useSearchParams();
    const navigate=useNavigate();
    const {setUser}=useAuth();

    useEffect(()=>{
        // get the token
        const accessToken=params.get('accessToken');
        const refreshToken=params.get('refreshToken');

        //set the token
        if(accessToken && refreshToken){
            localStorage.setItem('accessToken',accessToken);
            localStorage.setItem('refreshToken',refreshToken);

            const decoded=decodeToken(accessToken);
            // update authContext
            setUser(decoded);
            navigate('/products');
        }
        else{
            navigate('/login');
        }
    },[params,navigate,setUser]);

    return (<p className="text-center mt-5">Signing you in...</p>);
};

export default OAuthSuccessPage;
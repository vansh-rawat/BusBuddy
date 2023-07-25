import React, { children, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { ShowLoading } from '../redux/alertsSlice';
import { HideLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';


function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const navigate = useNavigate();
    const validateToken = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post('/api/users/get-user-by-id', {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(HideLoading());

            if (response.data.success) {

                dispatch(SetUser(response.data.data));
            }
            else {

                localStorage.removeItem('token');
                message.error(response.data.message);
                navigate('/login');
            }
        }
        catch (error) {
            dispatch(HideLoading());

            localStorage.removeItem('token');
            //message.error('from protected route');
            message.error(error.message);

            navigate('/login');
        }


    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        }
        else {
            navigate('/login');
        }
    }, []);

    return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;

}

export default ProtectedRoute;
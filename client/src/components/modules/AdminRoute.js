import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute({ children, ...rest }) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <Route 
            {...rest} 
            render={ (props) => 
                userInfo && userInfo.isAdmin ? (
                    children
                ) : (
                    <Redirect to="/signin" />
                )
            }
        >
        </Route>
    )
}

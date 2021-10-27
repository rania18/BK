import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute({ children, ...rest }) {

    const user = JSON.parse(localStorage.getItem('profile'))
    
    return (
        <Route 
            {...rest} 
            render={ (props) => 
                user?.result?.isAdmin ? (
                    children
                ) : (
                    <Redirect to="/signin" />
                )
            }
        >
        </Route>
    )
}

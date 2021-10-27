import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/auth';
import LoadingBox from './modules/LoadingBox.js';

export default function Signin(props) {
    const dispatch = useDispatch();
   //  const user = JSON.parse(localStorage.getItem('profile'));
    const { AuthIsLoading } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const redirect = props.location.search ? props.location.search.split('=')[1] : '/admin';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({email, password}))
    }

   /*  useEffect(() => {
        if (user) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, user]);
 */
    return (
        <div className="signin-page">
            <div className="signin-box">
                <form onSubmit={submitHandler}>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    { AuthIsLoading && <LoadingBox /> }
                    <div className="form-group">
                        <label htmlFor="email">Email adress</label>
                        <input type="email" id="email" placeholder="Enter email..." required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password..." required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className="view-all comfirn-command">Login</button>
                </form>
            </div>
        </div>
    )
}

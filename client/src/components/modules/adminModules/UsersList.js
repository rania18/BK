import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { ListUsers, DeleteUser } from '../../../actions/userActions';
import LoadingModule from '../LoadingModule';
import ErrorPage from '../ErrorPage';
import ConfirmModal from './ConfirmModal'


export default function UsersList() {

    const dispatch = useDispatch();
    const userList = useSelector( state => state.userList);
    const {UsersIsLoading, error, users} = userList;
    const [show, setShow] = useState(false);
    const [userId, setId] = useState('');

    const deleteAction = () => {
       dispatch(DeleteUser(userId));
       setShow(false);
       window.location.reload();
    }

    useEffect(() => {
        dispatch(ListUsers());
    }, [dispatch]);
    
    if (UsersIsLoading) {
        return ( <LoadingModule></LoadingModule> );
    
    } else if (error) {

        return ( <ErrorPage msg={error}></ErrorPage> );

    } else {
        return (
            <React.Fragment>
              <div className='table-header-container'>
                <Title>Users</Title>
                <button><Link to='/admin/users/new'>
                    <AddCircleIcon color='primary' style={{ fontSize: 50 }} /></Link>
                </button>
              </div>
             
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user) => (
                      <TableRow key={user?._id}>
                          <TableCell>{user?.name}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                          <TableCell>{user?.isAdmin}</TableCell>
                          <TableCell align="right" className='admin-actions'>
                              <Link to={`/admin/users/${user._id}`}><EditIcon /></Link>
                              <button 
                              onClick={ () => {
                                setShow(true)
                                setId(user._id)
                              }} 
                              className='delete-btn' 
                              ><DeleteForeverIcon /></button>
                          </TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
              <ConfirmModal 
                show={show} 
                qst="Delete user"
                title="Are you sure to delete this user ?" 
                onConfirm={deleteAction} 
                onClose={() => {setShow(false)}}>
              </ConfirmModal>
            </React.Fragment>
        ); 
    }
}
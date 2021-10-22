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
import { getProducts, deleteProduct } from '../../../actions/productActions';
import LoadingModule from '../LoadingModule';
import ErrorPage from '../ErrorPage';
import ConfirmModal from './ConfirmModal'


export default function ProductsList() {

    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const {loading, error, products} = productList;
    const [show, setShow] = useState(false);
    const [productId, setId] = useState('');

    const deleteAction = () => {
       dispatch(deleteProduct(productId));
       setShow(false);
       window.location.reload();
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    
    if (loading) {

        return ( <LoadingModule></LoadingModule> );
    
    } else if (error) {

        return ( <ErrorPage msg={error}></ErrorPage> );

    } else {
        return (
            <React.Fragment>
              <div className='table-header-container'>
                <Title>Products</Title>
                <button><Link to='/admin/products/new'>
                    <AddCircleIcon color='primary' style={{ fontSize: 50 }} /></Link>
                </button>
              </div>
             
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((row) => (
                      <TableRow key={row._id}>
                          <TableCell><img src={row.image} alt='Product' className="product-img-table" /></TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.categorySlug}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          <TableCell align="right" className='admin-actions'>
                              <Link to={`/admin/products/${row._id}`}><EditIcon /></Link>
                              <button 
                              onClick={ () => {
                                setShow(true)
                                setId(row._id)
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
                qst="Delete Product"
                title="Are you sure to delete this product ?" 
                onConfirm={deleteAction} 
                onClose={() => {setShow(false)}}>
              </ConfirmModal>
            </React.Fragment>
        ); 
    }
}
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
import ConfirmModal from './ConfirmModal'
import ProductModal from './ProductModal'
import { getCategories } from '../../../actions/categoryActions';
import { Container } from '@material-ui/core';

export default function ProductsList() {

    const dispatch = useDispatch();
    const {ProductsIsLoading, products} = useSelector( state => state.products);
    const {CategoriesIsLoading, categories} = useSelector( state => state.categories);

    const [show, setShow] = useState(false);
    const [productId, setId] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const deleteAction = () => {
       dispatch(deleteProduct(productId));
       setShow(false);
    }

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, []);

    if (ProductsIsLoading || CategoriesIsLoading) { return ( <LoadingModule></LoadingModule> ); } 

        return (
            <React.Fragment>
              <div className='table-header-container'>
                <Title>Products</Title>
                <button>
                    <AddCircleIcon color='primary' style={{ fontSize: 50 }} onClick={() => {setSelectedProduct(null); setShowModal(true)}} />
                </button>
              </div>
              <div className='table'>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Availability</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products?.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell><img src={row.image} alt='Product' className="product-img-table" /></TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.category.title}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.availability}</TableCell>
                            <TableCell align="right" className='admin-actions'>
                                <EditIcon onClick={() => {setSelectedProduct(row); setShowModal(true)}} style={{color:'#5bb56e'}} />
                                <button 
                                onClick={ () => {
                                  setShow(true)
                                  setId(row._id)
                                }} 
                                className='delete-btn' 
                                ><DeleteForeverIcon style={{color:'red'}} /></button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
              </div>
                <ProductModal categories={categories} products={products} product={selectedProduct} showModal={showModal} closeModal={() => setShowModal(false)} />
          
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
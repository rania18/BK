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
import { ListCategories, RemoveCategory } from '../../../actions/categoryActions';
import LoadingModule from '../LoadingModule';
import ErrorPage from '../ErrorPage';
import ConfirmModal from './ConfirmModal'


export default function CategoriesList() {

    const dispatch = useDispatch();
    const categoryList = useSelector( state => state.categoryList);
    const {loading, error, categories} = categoryList;
    const [show, setShow] = useState(false);
    const [categoryId, setId] = useState('');

    const deleteAction = () => {
       dispatch(RemoveCategory(categoryId));
       setShow(false);
       window.location.reload();
    }

    useEffect(() => {
        dispatch(ListCategories());
    }, [dispatch]);
    
    if (loading) {

        return ( <LoadingModule></LoadingModule> );
    
    } else if (error) {

        return ( <ErrorPage msg={error}></ErrorPage> );

    } else {
        const subCategories = categories;
        const mainCategories = categories.filter(cat => cat.parentId === '0');
        return (
            <React.Fragment>
              <div className='table-header-container'>
                <Title>Categories</Title>
                <button><Link to='/admin/categories/new'>
                    <AddCircleIcon color='primary' style={{ fontSize: 50 }} /></Link>
                </button>
              </div>
             
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Parent</TableCell>
                    <TableCell>Icon</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                  {mainCategories.map((row) => (
                    <TableBody key={row._id}>
                      <TableRow>
                          <TableCell><img src={row.headerImage} alt='Category' className="product-img-table" /></TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{
                              row.parentId === '0' ? (
                                  'None'
                              ) : (
                                  categories.find(c => c._id === row.parentId).title
                              )
                          }</TableCell>
                          <TableCell><img src={row.image} alt='Category' className="icon-table" /></TableCell>
                          <TableCell align="right" className='admin-actions'>
                              <Link to={`/admin/categories/${row._id}`}><EditIcon /></Link>
                              <button 
                              onClick={ () => {
                                setShow(true)
                                setId(row._id)
                              }} 
                              className='delete-btn' 
                              ><DeleteForeverIcon /></button>
                          </TableCell>
                      </TableRow>
                      {subCategories.map((subCategory) => {
                        if (subCategory.parentId === row._id) {
                          return (
                            <TableRow className='subcategory' key={subCategory._id}>
                              <TableCell><img src={subCategory.headerImage} alt='Category' className="product-img-table" /></TableCell>
                              <TableCell>{subCategory.title}</TableCell>
                              <TableCell>{
                                  subCategory.parentId === '0' ? (
                                      'None'
                                  ) : (
                                      categories.find(c => c._id === subCategory.parentId).title
                                  )
                              }</TableCell>
                              <TableCell><img src={subCategory.image} alt='Category' className="icon-table" /></TableCell>
                              <TableCell align="right" className='admin-actions'>
                                  <Link to={`/admin/categories/${subCategory._id}`}><EditIcon /></Link>
                                  <button 
                                  onClick={ () => {
                                    setShow(true)
                                    setId(subCategory._id)
                                  }} 
                                  className='delete-btn' 
                                  ><DeleteForeverIcon /></button>
                              </TableCell>
                          </TableRow>
                          )
                        } else {
                          return null
                        }
                      })}
                    </TableBody>
                  ))}
              </Table>
              <ConfirmModal 
                show={show} 
                qst="Delete Category"
                title="Are you sure to delete this category ?" 
                onConfirm={deleteAction} 
                onClose={() => {setShow(false)}}>
              </ConfirmModal>
            </React.Fragment>
        ); 
    }
}
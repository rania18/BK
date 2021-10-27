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
import { getCategories, deleteCategory } from '../../../actions/categoryActions';
import LoadingModule from '../LoadingModule';
import ConfirmModal from './ConfirmModal'
import CategoryModal from './CategoryModal';

export default function CategoriesList() {

    const dispatch = useDispatch();
    const {CategoriesIsLoading, categories} = useSelector( state => state.categories);
    const [show, setShow] = useState(false);
    const [categoryId, setId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const deleteAction = () => {
       dispatch(deleteCategory(categoryId));
       setShow(false);
    }

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    
    if (CategoriesIsLoading) { return ( <LoadingModule></LoadingModule> ); }

    return (
        <React.Fragment>
          <div className='table-header-container'>
            <Title>Categories</Title>
            <button>
                <AddCircleIcon color='primary' style={{ fontSize: 50 }} onClick={() => {setSelectedCategory(null); setShowModal(true)}} />
            </button>
          </div>
          <div className='table'>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
              { 
                categories?.filter(cat => cat.parentId === '0')?.map(row =>
                  <React.Fragment key={row._id} >
                    <TableRow>
                        <TableCell><img src={row.image} alt='Category' className="icon-table" /></TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.parentId === '0' ? 'None' : categories.find(c => c._id === row.parentId)?.title}</TableCell>
                        <TableCell align="right" className='admin-actions'>
                            <EditIcon onClick={() => {setSelectedCategory(row); setShowModal(true)}} style={{color:'#5bb56e'}} />
                            <button 
                            onClick={ () => {
                              setShow(true)
                              setId(row._id)
                            }} 
                            className='delete-btn' 
                            ><DeleteForeverIcon style={{color:'red'}}/></button>
                        </TableCell>
                    </TableRow>
                    { categories.map(subCategory =>
                      <React.Fragment key={subCategory._id} >
                        { subCategory.parentId === row._id ? (
                          <TableRow className='subcategory' >
                            <TableCell><img src={subCategory.image} alt='Category' className="icon-table" /></TableCell>
                            <TableCell>{subCategory.title}</TableCell>
                            <TableCell>{categories.find(c => c._id === subCategory.parentId).title}</TableCell>
                            <TableCell align="right" className='admin-actions'>
                              <EditIcon onClick={() => {setSelectedCategory(subCategory); setShowModal(true)}} style={{color:'#5bb56e'}} />
                                <button 
                                onClick={ () => {
                                  setShow(true)
                                  setId(subCategory._id)
                                }} 
                                className='delete-btn' 
                                ><DeleteForeverIcon style={{color:'red'}} /></button>
                            </TableCell>
                        </TableRow>
                        ) : null }
                      </React.Fragment>
                    )}
                </React.Fragment>
                )}
              </TableBody>
            </Table>
          </div>
          <CategoryModal categories={categories} category={selectedCategory} showModal={showModal} closeModal={() => setShowModal(false)} />
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
import React, { useEffect, useState } from 'react';
import {  TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '../../../actions/categoryActions';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';
import SaveIcon from '@material-ui/icons/Save';
import Compress from 'compress.js';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
    inputUpload: {
        display: 'none',
    },
    button: {
        padding: '10px 30px'
    }
  },
}));

export default function CategoryAdd(props) {
    const { category, showModal, categories } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const compress = new Compress();
    const { CategoriesIsLoading } = useSelector( state => state.categories);
    const [formData, setFormData] = useState({ title: '', parentId: '0', image: '' });
    const [feedback, setFeedback] = useState(false)

   const clear = () => {
       setFormData({ title: '', parentId: '0', image: '' })
   }

    const submitAdd = (e) =>  {
        e.preventDefault();
        if(category) {
            dispatch(updateCategory(category._id, formData))
            setFeedback('Category Edited');
        } else {
            dispatch(createCategory(formData))
            setFeedback('Category Added');
            clear();
        }
    }

    const resizePhotos = async (file) => {
        const resizedImages = await compress.compress([file], {
            size: 2, // the max size in MB, defaults to 2MB
            quality: 1, // the quality of the image, max is 1,
            maxWidth: 600, // the max width of the output image, defaults to 1920px
            maxHeight: 500, // the max height of the output image, defaults to 1920px
            resize: true // defaults to true, set false if you do not want to resize the image width and height
        })
        const resizedPhoto = resizedImages[0]
        return resizedPhoto;
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        let photo = '';
        if (file) {
            resizePhotos(file).then((res) => {
                photo = `data:image/${res.ext};base64,${res.data}`;
            }).then(() => setFormData({ ...formData, image: photo }))
        }
    }

    useEffect(() => {
        if(category) {
            setFormData({
                title: category.title,
                parentId: category.parentId,
                image: category.image
            })
        }
    }, [category])
    
    if (!showModal) return null;

    return (
            <div className="mymodal-container">
                <div className="mymodal-box">
                    <CloseIcon className="close-mymodal" onClick={props.closeModal} />
                    {/* <span className="close-mymodal" onClick={props.closeModal}>X</span> */}
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className='table-header-container'>
                            <Title>{category ? 'Edit ' : 'Add '} </Title>
                        </div>
                        <TextField required id="outlined-basic" label="Category Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        <FormControl className={classes.formControl}>
                            <label>Category Parent</label>
                            <select value={formData.parentId} onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}>
                                <option aria-label="None" value="0" >Select Parent</option>
                                {
                                    categories?.map((category) => (
                                        category.parentId === '0' && <option key={category._id} value={category._id}>{category.title}</option>
                                    ))
                                }
                            </select>
                        </FormControl>
                        <div className="icon-upload">
                            <div>
                                <input style={{ display: 'none' }}
                                    required
                                    accept="image/*"
                                    className='input-upload'
                                    id="input-file"
                                    type="file"
                                    onChange={e => handleImage(e)}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained"
                                            color="default"
                                            className={classes.button}
                                            startIcon={<CloudUploadIcon />}
                                            onClick={() => {document.getElementById('input-file').click()}}
                                    >
                                    Upload Icon
                                    </Button>
                                </label>
                            </div>
                            <div className='admin-icon-container'>
                            {
                                !formData.image ? (
                                    <img src='/images/add-image.png' alt='Add' className='add-image' />
                                
                                ) : (
                                    <img src={formData.image} alt='Icon' className='image-display' />
                                )
                            }
                            </div>
                        </div>
                    </form>
                    <Button variant="contained"
                            color="primary"
                            size="large"
                            className="mybtn"
                            startIcon={<SaveIcon />}
                            onClick={submitAdd}>
                            {category ? 'Edit ' : 'Add '} &nbsp;&nbsp;
                            {
                            CategoriesIsLoading && (
                                    <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                            )
                            }
                    </Button>
                    {
                        feedback ? (
                            <MessageBox>{feedback}</MessageBox>
                        ) : ( '' )
                    }
                </div>
            </div>
        )
}

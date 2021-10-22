import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ErrorPage from '../ErrorPage';
import LoadingModule from '../LoadingModule';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsCategory, EditCategory } from '../../../actions/categoryActions';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';
import { useParams } from 'react-router-dom';
import MessageBox from '../MessageBox';
import SaveIcon from '@material-ui/icons/Save';

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
  },
}));

export default function CategoryEdit() {
    let { id } = useParams();
    const categoryId = id;
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryDetails = useSelector( state => state.categoryDetails);
    const {loading, error, details} = categoryDetails;
    const categoryEdit = useSelector( state => state.categoryEdit);
    const {loadingEdit, errorEdit, feedback} = categoryEdit;
    const [title, setTitle] = useState(null);
    const [parent, setParent] = useState(null);
    const [image, setImage] = useState(null);
    const [headerImage, setHeaderImage] = useState(null);
   
    const category = {};
    
    const handelChangeTitle = (event) => {
        setTitle(event.target.value)
    };

    const handleChangeParent = (event) => {
        setParent(event.target.value)
    };

    const handelChangeImage = (event) => {
        setImage(event.target.files[0])
    }

    const handelChangeHeaderImage = (event) => {
        setHeaderImage(event.target.files[0])
    }

    const submitEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('id', categoryId)
        title ? formData.append('title', title) : formData.append('title', category.title);
        parent ? formData.append('parentId', parent) : formData.append('parentId', category.parent);
        image ? formData.append('image', image) : formData.append('image', category.image);
        headerImage ? formData.append('headerImage', headerImage) : formData.append('headerImage', category.headerImage);
    
        console.log(formData)

        dispatch(EditCategory(formData)).then(() => {
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        dispatch(DetailsCategory(categoryId));
    }, [dispatch, categoryId])
    
    if (loading) {

        return ( <LoadingModule></LoadingModule>);
    
    } else if (error) {

        return ( <ErrorPage msg={error}></ErrorPage> );

    } else {

        category.title = details[0].title
        category.parent = details[0].parentId
        category.image = details[0].image
        category.headerImage = details[0].headerImage
     
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <form className={classes.root} noValidate autoComplete="off">

                            <div className='table-header-container'>
                                <Title>Edit Category</Title>
                            </div>
                            
                            <TextField id="outlined-basic" label="Category Title" variant="outlined" onChange={handelChangeTitle} value={title ? title : category.title} />
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Category Parent</InputLabel>
                                <Select native value={parent ? parent : category.parent} onChange={handleChangeParent}>
                                    <option aria-label="None" value="0" />
                                    {
                                        details[2].map((category) => (
                                            category.parentId === '0' && <option key={category._id} value={category._id}>{category.title}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            
                            <div className="icon-upload">
                                <div>
                                    <input
                                        accept="image/*"
                                        className='input-upload'
                                        id="contained-button-file"
                                        type="file"
                                        onChange={handelChangeImage}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudUploadIcon />}
                                                onClick={() => {document.getElementById('contained-button-file').click()}}
                                        >
                                        Upload Icon
                                        </Button>
                                    </label>
                                </div>
                                <div className='admin-icon-container'>
                                {
                                    image === null || image === category.image ? (
                                        <img src={category.image} alt='Icon' className='image-display' />
                                    ) : (
                                        <img src={URL.createObjectURL(image)} alt='Add' className='image-display' />
                                    )
                                }
                                </div>
                            </div>

                        
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div className='admin-image-container'>
                        {
                            headerImage === null || headerImage === category.headerImage ? (   
                                <img src={category.headerImage} alt='Icon' className='image-display' />  
                            ) : (
                                <img src={URL.createObjectURL(headerImage)} alt='Add' className='image-display' />
                            ) 
                        }
                        </div>
                        <div className='select-image'>
                            <input
                                accept="image/*"
                                className='input-upload'
                                id="select-image-input"
                                type="file"
                                onChange={handelChangeHeaderImage}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<CloudUploadIcon />}
                                        onClick={() => {document.getElementById('select-image-input').click()}}
                                >
                                Upload Header Image
                                </Button>
                            </label>
                        </div>
                    </Grid>            
            </Grid>
            <Grid container spacing={3} >
                <Grid item xs={12} md={6} lg={6}>
                    <Button variant="contained"
                                color="primary"
                                size="large"
                                className="mybtn"
                                startIcon={<SaveIcon />}
                                onClick={submitEdit}>
                                Edit&nbsp;&nbsp;
                                {
                                    loadingEdit && (
                                        <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                                    )
                                }
                        </Button>
                        {
                            feedback ? (
                                <MessageBox>{feedback}</MessageBox>
                            ) : errorEdit ? (
                                <MessageBox variant='danger'>{errorEdit}</MessageBox>
                            ) : ( '' )
                        }
                </Grid>
            </Grid>
            </div>
        )
    }
}

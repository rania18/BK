import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ErrorPage from '../ErrorPage';
import LoadingModule from '../LoadingModule';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { AddCategory, ListCategories } from '../../../actions/categoryActions';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';
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
    button: {
        padding: '10px 30px'
    }
  },
}));

export default function CategoryAdd(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryList = useSelector( state => state.categoryList);
    const {loading, error, categories} = categoryList;
    const categoryAdd = useSelector( state => state.categoryAdd);
    const {loadingAdd, errorAdd, feedback} = categoryAdd
    const [title, setTitle] = useState('');
    const [parent, setParent] = useState('0');
    const [image, setImage] = useState(null);
    const [headerImage, setHeaderImage] = useState(null);
    const imageUpload = React.createRef();
    const headerImageUpload = React.createRef();

    const handleChangeParent = (event) => {
        setParent(event.target.value);
    };

    const handelChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handelChangeImage = (event) => {
        setImage(event.target.files[0]);
    }

    const handelChangeHeaderImage = (event) => {
        setHeaderImage(event.target.files[0]);
    }

    const submitAdd = (e) =>  {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('parentId', parent);
        formData.append('image', image);
        formData.append('headerImage', headerImage);
        dispatch(AddCategory(formData)).then(() => {
            setTitle('');
            setParent('0');
            setImage(null);
            setHeaderImage(null);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    useEffect(() => {
        dispatch(ListCategories());
    }, [dispatch]);
    
    if (loading) {

        return ( <LoadingModule></LoadingModule> );
    
    } else if (error) {

        return ( <ErrorPage msg={error}></ErrorPage> );

    } else {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <form className={classes.root} noValidate autoComplete="off">

                            <div className='table-header-container'>
                                <Title>Add Category</Title>
                            </div>
                            
                            <TextField required id="outlined-basic" label="Category Title" onChange={handelChangeTitle} value={title} />
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Category Parent</InputLabel>
                                <Select native value={parent} onChange={handleChangeParent}>
                                    <option aria-label="None" value="0" />
                                    {
                                        categories.map((category) => (
                                            category.parentId === '0' && <option key={category._id} value={category._id}>{category.title}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            
                            <div className="icon-upload">
                                <div>
                                    <input
                                        required
                                        accept="image/*"
                                        className='input-upload'
                                        id="contained-button-file"
                                        type="file"
                                        onChange={handelChangeImage}
                                        ref={imageUpload}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudUploadIcon />}
                                                onClick={() => {imageUpload.current.click()}}
                                        >
                                        Upload Icon
                                        </Button>
                                    </label>
                                </div>
                                <div className='admin-icon-container'>
                                {
                                    image === null ? (
                                        <img src='/images/add-image.png' alt='Add' className='add-image' />
                                    
                                    ) : (
                                        <img src={URL.createObjectURL(image)} alt='Icon' className='image-display' />
                                    )
                                }
                                </div>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div className='admin-image-container'>
                        {
                            headerImage === null ? (     
                                <img src='/images/add-image.png' alt='Add' className='add-image' />
                            ) : (
                                <img src={URL.createObjectURL(headerImage)} alt='Icon' className='image-display' />
                            ) 
                        }
                        </div>
                        <div className='select-image'>
                            <input
                                required
                                accept="image/*"
                                className='input-upload'
                                id="select-image-input"
                                type="file"
                                onChange={handelChangeHeaderImage}
                                ref={headerImageUpload}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<CloudUploadIcon />}
                                        onClick={() => {headerImageUpload.current.click()}}
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
                                onClick={submitAdd}>
                                Add&nbsp;&nbsp;
                                {
                                loadingAdd && (
                                        <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                                )
                                }
                        </Button>
                        {
                            feedback ? (
                                <MessageBox>{feedback}</MessageBox>
                            ) : errorAdd ? (
                                <MessageBox variant='danger'>{errorAdd}</MessageBox>
                            ) : ( '' )
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

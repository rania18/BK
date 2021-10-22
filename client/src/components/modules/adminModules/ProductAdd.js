import React, { useEffect, useState, createRef } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ErrorPage from '../ErrorPage';
import LoadingModule from '../LoadingModule';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { ListCategories } from '../../../actions/categoryActions';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';
import SaveIcon from '@material-ui/icons/Save';
import { createProduct } from '../../../actions/productActions';
import { TextareaAutosize } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
    inputUpload: {
        display: 'none',
    },
  },
}));

export default function ProductAdd(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryList = useSelector( state => state.categoryList);
    const {loading, error, categories} = categoryList;
    const productAdd = useSelector( state => state.productAdd);
    const {loadingAdd, errorAdd, feedback} = productAdd
    
    const [name, setName] = useState('');
    const [category, setCategory] = useState('0');
    const [price, setPrice] = useState(0);
    const [availability, setAvailability] = useState('In Stock');
    const [popular, setPopular] = useState(false);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [sliderImage1, setSliderImage1] = useState(null);
    const [sliderImage2, setSliderImage2] = useState(null);
    const [sliderImage3, setSliderImage3] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [matter, setMatter] = useState('');
    const [delay, setDelay] = useState('');
    const selectedCategory = createRef();
    const imageUpload = createRef();
    const slider1 = createRef();
    const slider2 = createRef();
    const slider3 = createRef();

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleChangeAvailability = (event) => {
        setAvailability(event.target.value);
    }

    const handleChangePopular = (event) => {
        setPopular(!popular);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeWidth = (event) => {
        setWidth(event.target.value);
    }

    const handleChangeHeight = (event) => {
        setHeight(event.target.value);
    }

    const handleChangeMatter = (event) => {
        setMatter(event.target.value);
    }

    const handleChangeDelay = (event) => {
        setDelay(event.target.value);
    }

    const handleChangeImage = (event) => {
        setImage(event.target.files[0]);
    }

    const handleChangeSliderImage1 = (event) => {
        setSliderImage1(event.target.files[0]);
    }

    const handleChangeSliderImage2 = (event) => {
        setSliderImage2(event.target.files[0]);
    }

    const handleChangeSliderImage3 = (event) => {
        setSliderImage3(event.target.files[0]);
    }


    const submitAdd = (e) =>  {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('availability', availability);
        formData.append('popular', popular);
        formData.append('description', description);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('matter', matter);
        formData.append('delay', delay);
        formData.append('image', image);
        formData.append('sliderImage1', sliderImage1);
        formData.append('sliderImage2', sliderImage2);
        formData.append('sliderImage3', sliderImage3);
        dispatch(createProduct(formData)).then(() => {
            /* setName('');
            setCategory('0');
            setPrice(0);
            setAvailability('In Stock');
            setPopular(false);
            setDescription('');
            setWidth('');
            setHeight('');
            setMatter('');
            setDelay('');
            setImage(null);
            setSliderImage1(null);
            setSliderImage2(null);
            setSliderImage3(null); */
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
                                <Title>Add Product</Title>
                            </div>
                            
                            <TextField required label="Name" onChange={handleChangeName} value={name} />
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                                <Select native value={category} ref={selectedCategory} onChange={handleChangeCategory}>
                                    <option value="0">None</option>
                                    {
                                        categories.map((category) => (
                                            category.parentId === '0' && <option key={category._id} value={category._id}>{category.title}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            <TextField required label="Price" onChange={handleChangePrice} value={price} />

                            <div className='flex-block'>
                                <FormControl className='myform-control'>
                                    <InputLabel htmlFor="age-native-simple">Availability</InputLabel>
                                    <Select native value={availability} onChange={handleChangeAvailability}>
                                        <option aria-label="In Stock" value="In Stock">In Stock</option>
                                        <option aria-label="By Command" value="By Command">By Command</option>
                                        <option aria-label="Expired" value="Expired">Expired</option>
                                    </Select>
                                </FormControl>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={popular}
                                        onChange={handleChangePopular}
                                        name="popular"
                                        color="primary"
                                    />
                                    }
                                    label="Popular Product"
                                />
                            </div>

                            <TextareaAutosize aria-label="minimum height" className="description-textarea" rowsMin={5} placeholder="Description" 
                                            onChange={handleChangeDescription} value={description} />

                            <Grid container spacing={2} >
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Width" onChange={handleChangeWidth} value={width} />
                                </Grid>
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Height" onChange={handleChangeHeight} value={height} />
                                </Grid>
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Matter" onChange={handleChangeMatter} value={matter} />
                                </Grid>
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Delay" onChange={handleChangeDelay} value={delay} />
                                </Grid>
                            </Grid>
                            
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div className='admin-image-container'>
                        {
                            image === null ? (     
                                <img src='/images/add-image.png' alt='Add' className='add-image' />
                            ) : (
                                <img src={URL.createObjectURL(image)} alt='Icon' className='image-display' />
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
                                onChange={handleChangeImage}
                                ref={imageUpload}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<CloudUploadIcon />}
                                        onClick={() => {imageUpload.current.click()}}
                                >
                                Upload Main Image
                                </Button>
                            </label>
                        </div>
                    </Grid>            
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
                <div className='admin-image-container slider'>
                {
                    sliderImage1 === null ? (     
                        <img src='/images/add-image.png' alt='Add' className='add-image' />
                    ) : (
                        <img src={URL.createObjectURL(sliderImage1)} alt='Icon' className='image-display' />
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
                        onChange={handleChangeSliderImage1}
                        ref={slider1}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                onClick={() => {slider1.current.click()}}
                        >
                        Upload Slider Image 1
                        </Button>
                    </label>
                </div>
            </Grid>  
            <Grid item xs={12} md={4} lg={4}>
                <div className='admin-image-container slider'>
                {
                    sliderImage2 === null ? (     
                        <img src='/images/add-image.png' alt='Add' className='add-image' />
                    ) : (
                        <img src={URL.createObjectURL(sliderImage2)} alt='Icon' className='image-display' />
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
                        onChange={handleChangeSliderImage2}
                        ref={slider2}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                onClick={() => {slider2.current.click()}}
                        >
                        Upload Slider Image 2
                        </Button>
                    </label>
                </div>
            </Grid> 
            <Grid item xs={12} md={4} lg={4}>
                <div className='admin-image-container slider'>
                {
                    sliderImage3 === null ? (     
                        <img src='/images/add-image.png' alt='Add' className='add-image' />
                    ) : (
                        <img src={URL.createObjectURL(sliderImage3)} alt='Icon' className='image-display' />
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
                        onChange={handleChangeSliderImage3}
                        ref={slider3}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                onClick={() => {slider3.current.click()}}
                        >
                        Upload Slider Image 3
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

import React, { useEffect, useState, createRef } from 'react';
import { CardMedia, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LoadingModule from '../LoadingModule';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategories } from '../../../actions/categoryActions';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';
import SaveIcon from '@material-ui/icons/Save';
import { createProduct, updateProduct } from '../../../actions/productActions';
import { TextareaAutosize } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import Compress from 'compress.js';
import ReplayIcon from '@material-ui/icons/Replay';
import BackupIcon from '@material-ui/icons/Backup';
import CloseIcon from '@material-ui/icons/Close';

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
    const { product, showModal, categories } = props;
    const {ProductsIsLoading} = useSelector( state => state.products )
    const classes = useStyles();
    const dispatch = useDispatch();
    const compress = new Compress();
    const [feedback, setFeedback] = useState(false);
    const [formData, setFormData] = useState({ name: '', image: '', price: 0,popular: false , description: '', category: '', availability: '', images: [], related: '', minQtn: 0, width: '', height: '', matter: '', delay: '' , countInStock: 0, minStock: 0 });
    

    const clear = () => {
        setFormData({ name: '', image: '', price: 0,popular: false , description: '', category: '', availability: '', images: [], related: '', minQtn: 0, width: '', height: '', matter: '', delay: '' , countInStock: 0, minStock: 0 })
    }

    const submitAdd = (e) =>  {
        e.preventDefault();
        if(product) {
            dispatch(updateProduct(product._id, formData))
            setFeedback('Product Edited');
        } else {
            dispatch(createProduct(formData))
            setFeedback('product Added');
            clear();
        }
    }

    const resizeImage = async (file) => {
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
            resizeImage(file).then((res) => {
                photo = `data:image/${res.ext};base64,${res.data}`;
            }).then(() => setFormData({ ...formData, image: photo }))
        }
    }

    const handleSelectFiles = (e, type) => {
        e.preventDefault();
        switch (type) {
            case 'photos':
                document.querySelector('.files-select.photos input').click();
                break;
            case 'plans':
                document.querySelector('.files-select.plans input').click();
                break;
            case 'docs':
                document.querySelector('.files-select.docs input').click();
                break;
            default:
                break;
        }
    };

    const resizePhotos = async (files) => {
        const resizedImage = await compress.compress(files, {
            size: 2, // the max size in MB, defaults to 2MB
            quality: 1, // the quality of the image, max is 1,
            maxWidth: 800, // the max width of the output image, defaults to 1920px
            maxHeight: 600, // the max height of the output image, defaults to 1920px
            resize: true // defaults to true, set false if you do not want to resize the image width and height
        })
        let resizedArray = [];
        resizedImage.map(img =>
            resizedArray.push({base64: img.data, ext: img.ext})
        )
        return resizedArray;
    };

    const uploadImages = (e) => {
        const files = [...e.target.files];
        let photosArray = [];
        if(files) {
            resizePhotos(files).then((res) => {
                res.map((r, index) => index < 10 && photosArray.push(`data:image/${r.ext};base64,${r.base64}`) )
            }).then(() => setFormData({ ...formData, images: photosArray }) )
        }
    }

    useEffect(() => {
        if(product) {
            setFormData({
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description ,
                category: product.category,
                availability: product.availability,
                images: product.images,
                popular: product.popular,
                related: product.related,
                minQtn: product.minQtn,
                width: product.width,
                height: product.height,
                matter: product.matter,
                delay: product.delay,
                countInStock: product.countInStock,
                minStock: product.minStock,
            })
        }
    }, [product])

    const selectedCategory = createRef();
   
    if (!showModal) return null;
    
    if (ProductsIsLoading) { return ( <LoadingModule></LoadingModule> );} 
        return (
            <div className="mymodal-container">
                <div className="mymodal-box">
                <CloseIcon className='close-mymodal' onClick={props.closeModal} />
                    {/* <span className="close-mymodal" onClick={props.closeModal}>X</span> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <form className={classes.root} noValidate autoComplete="off">

                            <div className='table-header-container'>
                                <Title>{product ? 'Edit ' : 'Add '} Product</Title>
                                
                            </div>
                            
                            <TextField required label="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value})} value={formData.name}/>
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                                <Select native value={formData.category} ref={selectedCategory} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="0">None</option>
                                    {
                                        categories?.map((category) => (
                                             <option key={category._id} value={category._id}>{category.title}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            <TextField required label="Price" onChange={(e) => setFormData({ ...formData, price: e.target.value})} value={formData.price} />

                            <div className='flex-block'>
                                <FormControl className='myform-control'>
                                    <InputLabel htmlFor="age-native-simple">Availability</InputLabel>
                                    <Select native value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value})}>
                                        <option aria-label="In Stock" value="In Stock">In Stock</option>
                                        <option aria-label="By Command" value="By Command">By Command</option>
                                        <option aria-label="Expired" value="Expired">Expired</option>
                                    </Select>
                                </FormControl>
                                <TextField required label="Min Qtn" onChange={(e) => setFormData({ ...formData, minStock: e.target.value})} value={formData.minStock} />
                            </div>
                            <div className='flex-block'>
                                <TextField required label="Stock" onChange={(e) => setFormData({ ...formData, countInStock  : e.target.value})} value={formData.countInStock} />
                                <TextField required label="Min Stock" onChange={(e) => setFormData({ ...formData, minQtn: e.target.value})} value={formData.minQtn} />
                            </div>
                            <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={formData.popular}
                                        onChange={(e) => setFormData({ ...formData, popular: !formData.popular})}
                                        name="popular"
                                        color="primary"
                                    />
                                    }
                                    label="Popular Product"
                                />

                            <TextareaAutosize aria-label="minimum height" className="description-textarea" rowsMin={5} placeholder="Description" 
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value})} value={formData.description} />

                            <Grid container spacing={2} >
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Width" onChange={(e) => setFormData({ ...formData, width: e.target.value})} value={formData.width} />
                                </Grid>
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Height" onChange={(e) => setFormData({ ...formData, height: e.target.value})} value={formData.height} />
                                </Grid>
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Matter" onChange={(e) => setFormData({ ...formData, matter: e.target.value})} value={formData.matter} />
                                </Grid>
                                <Grid item xs={12} md={3} lg={3}>
                                    <TextField label="Delay" onChange={(e) => setFormData({ ...formData, delay: e.target.value})} value={formData.delay} />
                                </Grid>
                            </Grid>
                            
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div className='admin-image-container'>
                  
                        {
                            !formData.image ? (
                                <img src='/images/add-image.png' alt='Add' className='add-image' />
                            
                            ) : (
                                <img src={formData.image} alt='Icon' className='image-display' />
                            )
                        }
                        </div>
                        <div className='select-image'>
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
                                Upload Main Image
                                </Button>
                            </label>
                        </div>
                    </Grid>            
            </Grid>
            
                <div className="files-actions flex start">
                    <button className="images-select" onClick={e => handleSelectFiles(e, 'photos')}><BackupIcon /></button>
                    <ReplayIcon className="clear" onClick={() => setFormData({ ...formData, images: null})} />
                    <div className="files-select photos"><input type="file" multiple={true} onChange={(e) => uploadImages(e)} accept=".jpg,.jpeg,.png,.doc,.docx, .pdf" /></div>
                </div>
                <div className="post-images photos flex start wrap">
                    {
                        formData.images?.map((file, index) => 
                            <div key={index} className="selected-file-container" >
                                { index < 10 ? <CardMedia className="selected-file" image={file} title={`photo${index}`} /> : null }
                            </div>
                        )
                    }
                </div>
 
            <Grid container spacing={3} >
                    <Grid item xs={12} md={6} lg={6}>
                        <Button variant="contained"
                            color="primary"
                            size="large"
                            className="mybtn"
                            startIcon={<SaveIcon />}
                            onClick={submitAdd}>
                            {product ? 'Edit ' : 'Add '} &nbsp;&nbsp;
                            {
                            ProductsIsLoading && (
                                    <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                            )
                            }
                        </Button>
                        {
                            feedback ? (<MessageBox>{feedback}</MessageBox>) : ( '' )
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    )
    
}

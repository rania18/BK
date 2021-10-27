import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Title from './Title';
import SaveIcon from '@material-ui/icons/Save';
import { AddUser, EditUser } from '../../../actions/userActions';
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

export default function UserModal(props) {
    const { user, showModal, users } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { UsersIsLoading } = useSelector( state => state.users);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', isAdmin: false });
    const [feedback, setFeedback] = useState(false)

   const clear = () => {
       setFormData({  name: '', email: '', password: '', isAdmin: false })
   }

    const submitAdd = (e) =>  {
        e.preventDefault();
        if(user) {console.log(formData.isAdmin)
            dispatch(EditUser(user._id, formData))
            setFeedback('User Edited');

        } else {
            dispatch(AddUser(formData))
            setFeedback('User Added');
            clear();
        }
    }

    useEffect(() => {
        if(user) {
            setFormData({
                name: user.name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin
            })
        }
    }, [user])
    
    if (!showModal) return null;

    return (
            <div className="mymodal-container">
                <div className="mymodal-box">
                <CloseIcon className="close-mymodal" onClick={props.closeModal} />
                    {/* <span className="close-mymodal" onClick={props.closeModal}>X</span> */}
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className='table-header-container'>
                            <Title>{user ? 'Edit ' : 'Add '} </Title>
                        </div>
                        <TextField required id="outlined-basic" label="User Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <TextField required id="outlined-basic" label="User Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <TextField required id="outlined-basic" label="User Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={formData.isAdmin}
                                onChange={(e) => setFormData({ ...formData, isAdmin: !formData.isAdmin})}
                                name="isAdmin"
                                color="primary"
                            />
                            }
                            label="Is Admin"
                        />
                    </form>
                    <Button variant="contained"
                            color="primary"
                            size="large"
                            className="mybtn"
                            startIcon={<SaveIcon />}
                            onClick={submitAdd}>
                            {user ? 'Edit ' : 'Add '} &nbsp;&nbsp;
                            {
                            UsersIsLoading && (
                                    <img src="/images/loading-buffering.gif" width='10' alt="Loading" />
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

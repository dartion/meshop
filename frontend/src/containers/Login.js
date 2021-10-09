import React, {useEffect, useState}  from "react";
import {connect} from 'react-redux';
import { login } from "../actions/auth";
import { Link, Redirect } from "react-router-dom";
import Loader from 'react-loader-spinner';
const Login = ({login, isAuthenticated, loading }) => {
    const [formData, setFormData] = useState({        
        email: '',
        password: ''    
    });
    
    useEffect(()=>{
        window.scrollTo(0,0);        
    });

    const {        
        email,
        password        
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {        
        e.preventDefault();
        login(email, password);        
    }
    
    if (isAuthenticated){
        return <Redirect to='/dashboard' />;
    }
    return (
        <div className='container mt-5'>
            <h1>Sign in</h1>
            <p> Login to your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>       
                    </div>
                    <div className='form-group'>
                    <input 
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />              
                    </div>
                    <div className='form-group'>
                    <input 
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />               
                    </div>
                    <div className='form-group'>
    
                    </div>
                    {
                        loading ? (
                            <div className='mt-3 d-flex justify-content-center align-items-center'>
                                <Loader
                                    type='Oval'
                                    color='#424242'
                                    height={50}
                                    width={50}                            
                                />
                            </div>
                        ) : (
                            <div className='form-group'>        
                        <button className='btn btn-primary' type='submit'>     
                            Login
                        </button>
                        </div>
                        )
                    
                }               
     
                
            </form>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'> Sign up </Link>
            </p>
            <p className='mt-3'>
                Forgot password? <Link to='/reset_password'> Reset Password </Link>
            </p>
            </div>
            
    )
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, {login})(Login);
import React, {useEffect, useState}  from "react";
import {connect} from 'react-redux';
import { signup } from "../actions/auth";
import { Link, Redirect } from "react-router-dom";
import Loader from 'react-loader-spinner';

const Signup = ({signup, isAuthenticated, loading }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',

    });
    
    useEffect(()=>{
        window.scrollTo(0,0);        
    });

    const {
        first_name,
        last_name,
        email,
        password,
        re_password
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {        
        e.preventDefault();
        signup(first_name, last_name, email, password, re_password);
        setAccountCreated(true);
    }
    if (isAuthenticated){
        return <Redirect to='/' />;
    }
    else if (accountCreated){
        <Redirect to='/login' />;
    }
    return (
        <div className='container mt-5'>
            <h1>Sign up</h1>
            <p> Create you Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='First Name'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                    </div>
                    <div className='form-group'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Last Name'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />          
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
                    <input 
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        required
                    />      
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
                            Sign up
                        </button>
                        </div>
                        )
                    
                }               
                    {/* <button className='btn btn-primary' type='submit'>     
                        Sign up
                    </button> */}
                
            </form>
            <p className='mt-3'>
                Already have an account? <Link to='/login'> Login </Link>
            </p>
            </div>
            
    
    );
};
    
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { signup })(Signup);
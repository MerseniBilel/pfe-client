import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
//redux
import {connect} from 'react-redux';
import {setAlert} from '../actions/alert';
import {LoginUser} from '../actions/auth';
import PropTypes from 'prop-types'

import AlertComponent from '../components/AlertComponent';

import redirectHandler from './redirectHandler';

import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import { Label, Input, Button,HelperText } from '@windmill/react-ui';

function Login({ setAlert,LoginUser,isAuth,userInfo,isloading }) {

  const [formData, setformData] = useState({
    email:'',
    password:''
  });

  const {email, password} = formData;

  const onChange = e => setformData({...formData, [e.target.name]:e.target.value})

  const onSubmit = e => {

    e.preventDefault();
    LoginUser({email,password})
  }

  //redirect if logged in 

if(isAuth){
    return <Redirect to="/app/redirecthandler" /> 
}



  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex justify-center">
                
              </div>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={e => onSubmit(e)}>
              <Label>
                <span>Email</span>
                <Input className="mt-1" value={email} type="email" onChange={(e) => onChange(e)} name="email" placeholder="example@example.com" />
                <AlertComponent/>
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" value={password} onChange={(e) => onChange(e)} type="password" name="password" onChange={(e)=> onChange(e)} placeholder="***************" />
                <AlertComponent/>
              </Label>

              <Button type="submit" className="mt-4" block>
                Log in
              </Button>
              </form>
              <hr className="my-8" />


              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  LoginUser: PropTypes.func.isRequired,
  isAuth : PropTypes.bool,
  userInfo : PropTypes.object,
  isloading : PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  userInfo : state.auth.user,
  isloading : state.auth.loading
});


export default connect(mapStateToProps,{ setAlert,LoginUser })(Login)

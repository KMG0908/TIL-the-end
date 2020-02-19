import React, { Component } from 'react';
import { connect } from "react-redux";
import { register, registerReset } from "../../actions";
import { InputWithLabel, AuthButton } from '../Auth';
import PasswordWithLabel from './PasswordWithLabel';
import { isEmail, matches } from "validator";
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import history from '../../history'
import Register from './Register'

  class RegisterPage extends Component{
      render(){
          return(
              <Register regist = {true}/>
          )
      }
  }

  export default RegisterPage
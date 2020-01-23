import React, { Component } from 'react';
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton } from '../Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';

class Register extends Component {
    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register')
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const {name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form : 'register'
        });
    }
    render() {
        const { loginId, loginPw, email, nick } = this.props.form.toJS();
        const { handleChange } = this;


        return (
            <AuthWrapper>
                <AuthContent title="회원가입">
                    <InputWithLabel label = "아이디" name="loginId" placeholder="아이디" value={loginId} onChange={handleChange}/>
                    <InputWithLabel label = "비밀번호" name = "loginPw" placeholder="비밀번호" type="password" value={loginPw} onChange={handleChange}/>
                    <InputWithLabel label = "이메일" name="email" placeholder="이메일" type="email" value={email} onChange={handleChange}/>
                    <InputWithLabel label = "닉네임" name="nick" placeholder="닉네임" value={nick} onChange={handleChange}/>
                    <AuthButton> 회원가입 </AuthButton>
                </AuthContent>
            </AuthWrapper>
        );
    }
}

export default connect((state) => ({
    form : state.auth.getIn(['register', 'form'])
}),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(Register);
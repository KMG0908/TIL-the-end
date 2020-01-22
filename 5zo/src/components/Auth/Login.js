import React, { Component } from 'react';
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../Auth';

class Login extends Component {
    render() {
        return (
            <AuthWrapper>
                <AuthContent title="로그인">
                    <InputWithLabel label = "아이디" name="loginId" placeholder="아이디"/>
                    <InputWithLabel label = "비밀번호" name = "loginPw" placeholder="비밀번호" type="password"/>
                    <AuthButton> 로그인 </AuthButton>
                    <RightAlignedLink to="/register"> 회원가입 </RightAlignedLink>
                </AuthContent>
            </AuthWrapper>
        );
    }
}

export default Login;
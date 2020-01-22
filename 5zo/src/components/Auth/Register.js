import React, { Component } from 'react';
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton } from '../Auth';

class Register extends Component {
    render() {
        return (
            <AuthWrapper>
                <AuthContent title="회원가입">
                    <InputWithLabel label = "아이디" name="loginId" placeholder="아이디"/>
                    <InputWithLabel label = "비밀번호" name = "loginPw" placeholder="비밀번호" type="password"/>
                    <InputWithLabel label = "이메일" name="email" placeholder="이메일" type="email"/>
                    <InputWithLabel label = "닉네임" name="nick" placeholder="닉네임"/>
                    <AuthButton> 회원가입 </AuthButton>
                </AuthContent>
            </AuthWrapper>
        );
    }
}

export default Register;
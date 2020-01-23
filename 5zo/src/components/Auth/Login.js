import React, { Component } from 'react';
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
class Login extends Component {
    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('login')
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const {name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form : 'login'
        });
    }
    render() {
        const { loginId, loginPw } = this.props.form.toJS();
        const { handleChange } = this;

        return (
            <AuthWrapper>
                <AuthContent title="로그인">
                    <InputWithLabel label = "아이디" name="loginId" placeholder="아이디" value={loginId} onChange={handleChange}/>
                    <InputWithLabel label = "비밀번호" name = "loginPw" placeholder="비밀번호" type="password" value={loginPw} onChange={handleChange}/>
                    <AuthButton> 로그인 </AuthButton>
                    <RightAlignedLink to="/register"> 회원가입 </RightAlignedLink>
                </AuthContent>
            </AuthWrapper>
        );
    }
}

export default connect((state) => ({
    form : state.auth.getIn(['login', 'form'])
}),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(Login);
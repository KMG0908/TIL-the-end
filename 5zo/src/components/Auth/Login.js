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

    handleLocalLogin = async() => {
        const { form, AuthActions, history } = this.props;
        const { mem_id , mem_pw } = form.toJS();

        try {
            const result = await AuthActions.localLogin({ mem_id, mem_pw});
            const loggedInfo = this.props.result.toJS();
            console.log('loggedInfo');
            console.log(loggedInfo);
            console.log('result');
            console.log(result);

            history.push('/');
        }catch(e){
            // 에러 처리
            console.log('error는...');
            console.log(e);
        }

    }

    render() {
        const { mem_id, mem_pw } = this.props.form.toJS();
        const { handleChange } = this;

        return (
            <AuthWrapper>
                <AuthContent title="로그인">
                    <InputWithLabel label = "아이디" name="mem_id" placeholder="아이디" value={mem_id} onChange={handleChange}/>
                    <InputWithLabel label = "비밀번호" name = "mem_pw" placeholder="비밀번호" type="password" value={mem_pw} onChange={handleChange}/>
                    <AuthButton onClick={this.handleLocalLogin}> 로그인 </AuthButton>
                    <RightAlignedLink to="/register"> 회원가입 </RightAlignedLink>
                </AuthContent>
            </AuthWrapper>
        );
    }
}

export default connect((state) => ({
    form : state.auth.getIn(['login', 'form']),
    result : state.auth.get('result')
}),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(Login);
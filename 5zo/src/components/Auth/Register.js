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

    handleLocalRegister = async() => {
        const { form, AuthActions, history } = this.props;
        const { mem_id, mem_pw, mem_email, mem_nick } = form.toJS();

        try{
            const result = await AuthActions.localRegister({
                mem_id, mem_pw, mem_email, mem_nick
            });
            const loggedInfo = this.props.result.toJS();
            console.log(`loggedInfo : ${loggedInfo}`); // 로그인 정보 저장.
            console.log(result);

            history.push('/'); // 회원가입 성공시 홈페이지로 이동
        }catch(e) {
            // 에러 처리
            console.log('error 는...');
            console.log(e);
        }
    }

    render() {
        const { mem_id, mem_pw, mem_email, mem_nick } = this.props.form.toJS();
        const { handleChange } = this;


        return (
            <AuthWrapper>
                <AuthContent title="회원가입">
                    <InputWithLabel label = "아이디" name="mem_id" placeholder="아이디" value={mem_id} onChange={handleChange}/>
                    <InputWithLabel label = "비밀번호" name = "mem_pw" placeholder="비밀번호" type="password" value={mem_pw} onChange={handleChange}/>
                    <InputWithLabel label = "이메일" name="mem_email" placeholder="이메일" type="email" value={mem_email} onChange={handleChange}/>
                    <InputWithLabel label = "닉네임" name="mem_nick" placeholder="닉네임" value={mem_nick} onChange={handleChange}/>
                    <AuthButton onClick={this.handleLocalRegister}> 회원가입 </AuthButton>
                </AuthContent>
            </AuthWrapper>
        );
    }
}

export default connect((state) => ({
    form : state.auth.getIn(['register', 'form']),
    result : state.auth.get('result')
}),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions, dispatch)
    })
)(Register);
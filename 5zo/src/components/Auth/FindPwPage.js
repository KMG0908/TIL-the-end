import React, { Component } from 'react';
import { connect } from "react-redux";
import { findPwFailReset, findPwSuccessReset, findPw } from "actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '.';
import history from '../../history'
class FindPwPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.findPw = this.findPw.bind(this)
    }
    handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'mem_id':
                this.setState({
                    mem_id: value
                })
                break;
            case 'email':
                this.setState({
                    email: value
                })
                break;
        }
    }
    findPw() {
        if (!document.getElementById("mem_id").value) {
            document.getElementById("mem_id").focus();
            return;
        }
        if (!document.getElementById("email").value) {
            document.getElementById("email").focus();
            return;
        }

        this.props.findPw(this.state.mem_id, this.state.email)

    }
    cancel = () => {
        history.push("/login")
    }
    render() {
        if (this.props.find_pw_success) {
            this.props.findPwSuccessReset()
            this.props.findPwFailReset()
            alert(`입력하신 ${this.state.email} 로 임시 비밀번호를 전송하였습니다.`)
            history.push("/login")
        }
        return (

            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', width: 500 }}>
                    <AuthWrapper>
                        <AuthContent title="비밀번호 찾기">
                            <InputWithLabel label="아이디" id="mem_id" name="mem_id" placeholder={"아이디를 입력하세요"} value={this.state.mem_id} onChange={this.handleChange} />
                            <InputWithLabel label="이메일" id="email" name="email" type="email" placeholder={"이메일을 입력하세요"} value={this.state.email} onChange={this.handleChange} />
                            {this.props.find_pw_fail}
                            <AuthButton onClick={this.findPw}> 비밀번호 찾기 </AuthButton>
                            <AuthButton onClick={this.cancel}> 취소 </AuthButton>
                        </AuthContent>
                    </AuthWrapper>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        find_pw_fail: state.members.find_pw_fail,
        find_pw_success: state.members.find_pw_success,
    };
};

export default connect(mapStatetoProps, { findPw, findPwFailReset, findPwSuccessReset })(FindPwPage);
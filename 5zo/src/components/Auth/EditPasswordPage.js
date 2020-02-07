import React, { Component } from 'react';
import { connect } from "react-redux";
import { editPassword, editPasswordFailReset, editPasswordSuccessReset } from "actions";
import { AuthWrapper, AuthContent, AuthButton, RightAlignedLink, TextWithLabel } from '.';
import PasswordWithLabel from './PasswordWithLabel';

class EditPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            old_pw: '',
            new_pw: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.editPassword = this.editPassword.bind(this)
    }
    handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'old_pw':
                this.setState({
                    old_pw: value
                })
                break;
            case 'new_pw':
                this.setState({
                    new_pw: value
                })
                break;
        }
    }
    editPassword() {
        if (!document.getElementById("old_pw").value) {
            document.getElementById("old_pw").focus();
            return;
        }
        if (!document.getElementById("new_pw").value) {
            document.getElementById("new_pw").focus();
            return;
        }

        this.props.editPassword(this.props.mem_info.mem_id, this.state.old_pw, this.state.new_pw)

    }
    cancel = () => {
        window.location.href = "/mypage"
    }
    render() {
        if (this.props.edit_password_success) {
            this.props.editPasswordFailReset()
            this.props.editPasswordSuccessReset()
            alert(`비밀번호 수정 완료`)
            window.location.href = '/mypage'
        }
        return (

            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', minWidth: 500 }}>
                    <AuthWrapper>
                        <AuthContent title="비밀번호 수정">
                            <PasswordWithLabel label="현재 비밀번호" id="old_pw" name="old_pw" placeholder={"현재 비밀번호를 입력하세요"} value={this.state.old_pw} onChange={this.handleChange} />
                            <PasswordWithLabel label="수정 비밀번호" id="new_pw" name="new_pw" placeholder={"수정할 비밀번호를 입력하세요"} value={this.state.new_pw} onChange={this.handleChange} />
                            {this.props.edit_password_fail}
                            <AuthButton onClick={this.editPassword}> 비밀번호 수정 </AuthButton>
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
        mem_info: state.members.mem_info,
        edit_password_fail: state.members.edit_password_fail,
        edit_password_success: state.members.edit_password_success,
    };
};

export default connect(mapStatetoProps, { editPassword, editPasswordSuccessReset, editPasswordFailReset })(EditPasswordPage);
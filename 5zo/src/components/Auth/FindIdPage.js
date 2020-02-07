import React, { Component } from 'react';
import { connect } from "react-redux";
import { findIdFailReset, findIdSuccessReset, findId } from "actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '.';

class FindIdPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.findId = this.findId.bind(this)
    }
    handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                this.setState({
                    email: value
                })
                break;
        }
    }
    findId() {
        if (!document.getElementById("email").value) {
            document.getElementById("email").focus();
            return;
        }

        this.props.findId( this.state.email)

    }
    cancel = () => {
        window.location.href = "/"
    }
    render() {
        if(this.props.find_id_success){
            this.props.findIdSuccessReset()
            this.props.findIdFailReset()
            alert(`입력하신 ${this.state.email} 로 아이디를 전송하였습니다.`)
            window.location.href = '/login'
        }
        return (

            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', minWidth: 500 }}>
                    <AuthWrapper>
                        <AuthContent title="아이디 찾기">
                            <InputWithLabel label="이메일" id="email" name="email" type="email" placeholder={"이메일의 입력하세요"} value={this.state.email} onChange={this.handleChange} />
                            {this.props.find_id_fail}
                            <AuthButton onClick={this.findId}> 아이디 찾기 </AuthButton>
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
        find_id_fail : state.members.find_id_fail,
        find_id_success : state.members.find_id_success,
    };
};

export default connect(mapStatetoProps, { findId, findIdFailReset, findIdSuccessReset  })(FindIdPage);
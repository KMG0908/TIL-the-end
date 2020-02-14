import React, { Component } from 'react';
import { connect } from "react-redux";
import { findPwFailReset, findPwSuccessReset, findPw } from "actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '.';
import history from '../../history'
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import { isEmail } from "validator";

const styles = theme => ({
  paper: {
    padding: '20px'
  }
});


class FindPwPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          mem_id: '',
            email: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.findPw = this.findPw.bind(this)
    }
    componentDidMount(){
      document.getElementById("mem_id").focus();
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
        if (!this.state.mem_id.value) {
          document.getElementById("mem_id_msg").value = '아이디를 입력해주세요.';
          document.getElementById("mem_id_msg").classList.add("error");
            document.getElementById("mem_id").focus();
            return;
        }
        
        if (!this.state.email) {
          document.getElementById("email_msg").value = '이메일을 입력해주세요.';
          document.getElementById("mem_id_msg").classList.remove("error");
          document.getElementById("email_msg").classList.add("error");
          document.getElementById("email").focus();
          return;
        }
    
        if (!isEmail(this.state.email)) {
          document.getElementById("email_msg").value = '잘못된 이메일 형식입니다.';
          document.getElementById("mem_id_msg").classList.remove("error");
          document.getElementById("email_msg").classList.add("error");
          document.getElementById("email").focus();
          return;
        }
    
        document.getElementById("email_msg").classList.remove("error");

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

        const {classes} = this.props;

        return (

            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', width: 500 }}>
                    <Paper className={classes.paper}>
                            <InputWithLabel label="아이디" id="mem_id" name="mem_id" value={this.state.mem_id} onChange={this.handleChange} />
                            <InputWithLabel label="이메일" id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
                            <input type="text" className={this.props.find_pw_fail ? "error_" : "none"} readOnly disabled value={this.props.find_pw_fail} />
                            <AuthButton onClick={this.findPw}> 비밀번호 찾기 </AuthButton>
                            <AuthButton onClick={this.cancel}> 취소 </AuthButton>
                    </Paper>
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

export default withStyles(styles, { withTheme: true })(connect(mapStatetoProps, { findPw, findPwFailReset, findPwSuccessReset })(FindPwPage));
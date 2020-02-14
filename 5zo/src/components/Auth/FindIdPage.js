import React, { Component } from 'react';
import { connect } from "react-redux";
import { findIdFailReset, findIdSuccessReset, findId } from "actions";
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

class FindIdPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.findId = this.findId.bind(this)
  }
  componentDidMount(){
    document.getElementById("email").focus();
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
    if (!this.state.email) {
      document.getElementById("email_msg").value = '이메일을 입력해주세요.';
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }

    if (!isEmail(this.state.email)) {
      document.getElementById("email_msg").value = '잘못된 이메일 형식입니다.';
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }

    document.getElementById("email_msg").classList.remove("error");

    this.props.findId(this.state.email)

  }
  cancel = () => {
    history.push("/login")
  }
  render() {
    if (this.props.find_id_success) {
      this.props.findIdSuccessReset()
      this.props.findIdFailReset()
      alert(`입력하신 ${this.state.email} 로 아이디를 전송하였습니다.`)

      history.push("/login")
    }

    const {classes} = this.props;

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: 500 }}>
          <Paper className={classes.paper}>
              <InputWithLabel label="이메일" id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
              <input type="text" className={this.props.find_id_fail ? "error_" : "none"} readOnly disabled value={this.props.find_id_fail} />
              <AuthButton onClick={this.findId}> 아이디 찾기 </AuthButton>
              <AuthButton onClick={this.cancel}> 취소 </AuthButton>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    find_id_fail: state.members.find_id_fail,
    find_id_success: state.members.find_id_success,
  };
};

export default withStyles(styles, { withTheme: true })(connect(mapStatetoProps, { findId, findIdFailReset, findIdSuccessReset })(FindIdPage));
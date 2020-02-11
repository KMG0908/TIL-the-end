import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import InputWithLabel from './InputWithLabel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/styles';


// 두개가 함께 있을 땐 상단 (그 사이) 에 여백을 준다.
const Wrapper = styled.div`
    & + & {
        margin-tip : 1rem;
    }
    margin-bottom: 15px;
`;

const Label = styled.div`
    font-size : 1rem;
    color : #24292e;
    margin-bottom : 0.25rem;
    text-align : left
`;

const Input = styled.input`
    width : 90%;
    outline : none;
    font-size : 1rem;
    ::placeholder {
        color : ${oc.gray[3]};
    }
    padding: 10px;
    border-radius: 5px;
    border: 0;
    background-color: #fafbfc;
    &:focus{
      background-color: white;
    }
`;

const InputBox = styled.div`
    width : 100%;
    border : 1px solid ${oc.gray[3]};
    outline : none;
    border-radius: 5px;
    display : flex;
`;

const useStyles = makeStyles(() => ({
  input_back:  {
    backgroundColor: 'white',
  },
  Focus: {
    backgroundColor: 'white',
    border: '1px solid #94C9A9'
  }
}))

function PasswordWithLabel({ id, label, ...rest }) {
  const typeChange = () => {
    const input = document.getElementById(id)
    if (input.type === 'text') {
      input.type = 'password'
    } else {
      input.type = 'text'
    }
  }

  const classes = useStyles();
  const box_id = `${id}_box`

  return (
    <Wrapper>
      <Label> {label} </Label>
      <InputBox id={box_id} onFocus={function(){
        document.getElementById(id).classList.add(classes.input_back);
        document.getElementById(box_id).classList.add(classes.Focus);
      }} onBlur={function(){
        document.getElementById(id).classList.remove(classes.input_back);
        document.getElementById(box_id).classList.remove(classes.Focus);
      }}>
        <Input id={id} type='password' {...rest}/>
        <IconButton color="primary" aria-label="upload picture" component="span" style={{ width: "10%", padding: 0 }} onClick={typeChange}>
          <VisibilityIcon />
        </IconButton>
      </InputBox>
      <input type="text" id={`${rest.name}_msg`} className="none" readOnly disabled/>
    </Wrapper>
  )
}
export default PasswordWithLabel;
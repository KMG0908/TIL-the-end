import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import InputWithLabel from './InputWithLabel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


// 두개가 함께 있을 땐 상단 (그 사이) 에 여백을 준다.
const Wrapper = styled.div`
    & + & {
        margin-tip : 1rem;
    }
`;

const Label = styled.div`
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
    text-align : left
`;

const Input = styled.input`
    width : 90%;
    border : 1px solid ${oc.gray[3]};
    outline : none;
    border-radius : 0px;
    line-height : 2.5rem;
    font-size : 1.2rem;
    ::placeholder {
        color : ${oc.gray[3]};
    }
`;

function PasswordWithLabel({ id, label, ...rest }) {
    const myRef = React.createRef()
    const typeChange = () => {
        const input = document.getElementById(id)
        if (input.type === 'text') {
            input.type = 'password'
        } else {
            input.type = 'text'
        }

    }

    return (

        <Wrapper>
            <Label> {label} </Label>
            <Input id={id} type='password' {...rest} />
            <IconButton color="primary" aria-label="upload picture" component="span" style={{width:'10%'}} onClick={typeChange}>
                <VisibilityIcon style={{width:'100%'}}/>
            </IconButton>
            <input type="text" id={`${rest.name}_msg`} className="none" readOnly />
        </Wrapper>
    )
}
export default PasswordWithLabel;
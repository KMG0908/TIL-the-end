import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

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
    width : 100%;
    border : 1px solid ${oc.gray[3]};
    outline : none;
    border-radius : 0px;
    line-height : 2.5rem;
    font-size : 1.2rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    display: block
    ::placeholder {
        color : ${oc.gray[3]};
    }
`;

const InputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label> {label} </Label>
    <Input {...rest}/>
    <input type="text" id={`${rest.name}_msg`} className="none" readOnly/>
  </Wrapper>
)

export default InputWithLabel;
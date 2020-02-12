import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtil';

const Wrapper = styled.div`
    margin-top : 1rem;
    padding-top : 0.6rem;
    padding-bottom : 0.5rem;
    border-radius: 10px;
    background : #94C9A9;  // <<<<<<<<<<<<<<<<<<<<<<<<<<<
    color : white;

    text-align : center;
    font-size : 1.25rem;
    font-weight : 500;

    cursor : pointer;
    user-select : none;
    transition : .2s all;

    border-radius: 5px;

    $:hover {
        background : ${oc.teal[5]};
        ${shadow(0)}
    }

    $:active {
        background : ${oc.teal[7]};
    }
`;
const AuthButton = ({ children, onClick, onSubmit, type, backgroundColor }) => (
    <Wrapper onClick={onClick} style={{background : backgroundColor}}>
        {children}
    </Wrapper>
)

export default AuthButton;
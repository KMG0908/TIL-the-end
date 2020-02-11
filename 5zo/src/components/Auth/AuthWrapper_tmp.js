import React from "react";
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtil';
import { Link } from 'react-router-dom';

// 화면의 중앙에 위치시킨다.
const Positioner = styled.div`
    // position : relative;
    // top : 50%;
    // left : 50%;
    // transform : translate(-50%, -50%);
`;

const Contents = styled.div`
    background : #fafbfc;
    padding : 2rem;
    height : auto;
    border-radius : 3px;
`

const AuthWrapper = ({ children }) => (
  <Positioner>
    <Contents>
      {children}
    </Contents>
  </Positioner>
)

export default AuthWrapper;
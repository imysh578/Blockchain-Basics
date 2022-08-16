import React from 'react'
import CalBlock from '../components/CalBlock'
import styled from 'styled-components';

const BlockPage = () => {
  return (
    <Row>
      <CalBlock/>
      
    </Row>
  )
}

const Row = styled.div`
  ${({ theme }) => theme.mixins.flexBox("row", "center", "center")}
  gap: 0.5rem;
  width: 100%;
  height: 100%;
`;

export default BlockPage
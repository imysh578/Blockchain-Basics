import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.components.container("column", "center", "center")}
`;
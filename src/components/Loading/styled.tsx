import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.components.container("column", "center", "center")}
  min-width: 100vw;
  min-height: calc(100vh - ${({theme}) => theme.height.navbar});
`;
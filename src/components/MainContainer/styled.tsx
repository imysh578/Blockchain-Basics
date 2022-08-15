import styled from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => theme.components.container("column", "flex-start", "flex-start")}
  min-width: 100vw;
  min-height: calc(100vh - ${({theme}) => theme.height.navbar});
  padding: 3rem 2rem;
`;